# Mail Server - SMTP Outlook Integration

A Node.js Express server for sending emails through Outlook SMTP using Nodemailer.

## Features

- Send single emails via POST `/send-email`
- Send bulk emails via POST `/send-bulk-email`
- CORS enabled for cross-origin requests
- Environment-based configuration
- Comprehensive error handling
- Health check endpoint

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values with your Outlook credentials

3. Get Outlook App Password:
   - Go to https://account.microsoft.com/security
   - Enable 2FA if not already enabled
   - Create an app password for SMTP access

4. Start the server:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## API Endpoints

### Health Check
```
GET /health
```

### Send Single Email
```
POST /send-email
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "text": "Plain text content",
  "html": "<h1>HTML content</h1>",
  "fromName": "Your Name",
  "fromEmail": "your-email@outlook.com"
}
```

### Send Bulk Email
```
POST /send-bulk-email
Content-Type: application/json

{
  "recipients": [
    { "email": "user1@example.com", "name": "User 1" },
    { "email": "user2@example.com", "name": "User 2" }
  ],
  "subject": "Bulk Email",
  "text": "Hello {{name}}, this is a bulk email",
  "html": "<h1>Hello {{name}}, this is a bulk email</h1>"
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| OUTLOOK_USER | Outlook email address | - |
| OUTLOOK_PASSWORD | Outlook app password | - |
| OUTLOOK_HOST | SMTP host | smtp-mail.outlook.com |
| OUTLOOK_PORT | SMTP port | 587 |
| PORT | Server port | 3001 |
| DEFAULT_FROM_NAME | Default sender name | - |
| DEFAULT_FROM_EMAIL | Default sender email | - |

## Error Handling

The server includes comprehensive error handling for:
- Missing required fields
- Invalid email formats
- SMTP connection issues
- Authentication failures

## Security Notes

- Never commit `.env` file with real credentials
- Use app passwords instead of regular passwords
- Enable 2FA on your Outlook account
- Consider rate limiting for production use
