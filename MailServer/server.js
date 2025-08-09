const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create transporter for Outlook SMTP
const transporter = nodemailer.createTransport({
  host: process.env.OUTLOOK_HOST || 'smtp-mail.outlook.com',
  port: parseInt(process.env.OUTLOOK_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take messages');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Mail server is running',
    timestamp: new Date().toISOString()
  });
});

// Send email endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text, html, fromName, fromEmail } = req.body;

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: to, subject, text or html'
      });
    }

    const mailOptions = {
      from: `"${fromName || process.env.DEFAULT_FROM_NAME}" <${fromEmail || process.env.DEFAULT_FROM_EMAIL}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject: subject,
      text: text,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);
    
    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Mail server is running on http://${HOST}:${PORT}`);
  console.log(`Health check: http://${HOST}:${PORT}/health`);
});
