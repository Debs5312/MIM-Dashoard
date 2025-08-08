import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Box,
  Collapse,
  Alert,
  IconButton,
  Divider,
  Grid,
  Paper,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Email as EmailIcon,
  PersonAdd as PersonAddIcon,
  Warning as WarningIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';

const P1IncidentCard = ({ incident, onStatusUpdate, onAssign }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState('');
  const [isCritical, setIsCritical] = useState(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const createdTime = new Date(incident.created_on);
      const now = new Date();
      const diffMs = now - createdTime;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeElapsed(`${diffHrs}h ${diffMins}m ago`);
      setIsCritical(diffHrs >= 1);
      
      // Calculate countdown for 4-hour SLA
      const slaEnd = new Date(createdTime.getTime() + (4 * 60 * 60 * 1000));
      const timeLeft = slaEnd - now;
      
      if (timeLeft > 0) {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown(`${hours}h ${minutes}m remaining`);
      } else {
        setCountdown('SLA EXCEEDED');
      }
    };

    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 30000);
    return () => clearInterval(interval);
  }, [incident.created_on]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleCriticalAlert = () => {
    const subject = `🚨 CRITICAL P1 ALERT: ${incident.incident_no}`;
    const body = `IMMEDIATE ESCALATION REQUIRED
    
⚠️ CRITICAL P1 INCIDENT DETECTED ⚠️

Incident: ${incident.incident_no}
Status: ${incident.status || 'OPEN'}
Age: ${timeElapsed}
SLA: ${countdown}
Description: ${incident.description}
Reporter: ${incident.created_by}
Created: ${incident.created_on}

ACTION REQUIRED:
1. Acknowledge immediately
2. Assign to senior engineer
3. Begin incident response protocol
4. Update stakeholders every 30 minutes`;

    const mailtoLink = `mailto:incident-response@oup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  const getStatusColor = () => {
    const status = incident.status?.toLowerCase() || 'open';
    switch (status) {
      case 'open':
        return 'error';
      case 'in progress':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'closed':
        return 'default';
      default:
        return 'info';
    }
  };

  const getSeverityColor = () => {
    if (countdown === 'SLA EXCEEDED') return 'error';
    if (isCritical) return 'warning';
    return 'info';
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: 4, 
        borderLeftColor: (theme) => theme.palette[getSeverityColor()]?.main || theme.palette.info.main,
        backgroundColor: (theme) => theme.palette.background.card,
        color: (theme) => theme.palette.text.primary,
        '&:hover': { 
          boxShadow: 4,
          backgroundColor: (theme) => theme.palette.background.cardLight,
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
            {incident.incident_no}
          </Typography>
          <Chip 
            label={incident.status || 'OPEN'} 
            color={getStatusColor()}
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <WarningIcon 
            color={getSeverityColor()} 
            sx={{ mr: 1, fontSize: 20 }} 
          />
          <Typography variant="body2" color="text.secondary">
            {countdown}
          </Typography>
        </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, color: (theme) => theme.palette.text.secondary }}>

          <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
          {timeElapsed}
        </Typography>

          <Typography variant="body2" sx={{ mb: 2, color: (theme) => theme.palette.text.primary }}>
          {incident.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
          <Chip label={`Reporter: ${incident.created_by}`} size="small" variant="outlined" sx={{ borderColor: (theme) => theme.palette.divider, color: (theme) => theme.palette.text.secondary }} />
          <Chip label={`Created: ${incident.created_on}`} size="small" variant="outlined" sx={{ borderColor: (theme) => theme.palette.divider, color: (theme) => theme.palette.text.secondary }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={toggleDetails}
            endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ textTransform: 'none' }}
          >
            {showDetails ? 'Hide' : 'Details'}
          </Button>
          
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleCriticalAlert}
            startIcon={<EmailIcon />}
            sx={{ textTransform: 'none' }}
          >
            Alert
          </Button>

          {onAssign && (
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => onAssign(incident)}
              startIcon={<PersonAddIcon />}
              sx={{ textTransform: 'none' }}
            >
              Assign
            </Button>
          )}
        </Box>

        <Collapse in={showDetails} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 1, fontSize: '0.9rem', fontWeight: 'bold' }}>
              Impact Assessment
            </Typography>
            <Grid container spacing={1}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2">
                <strong>Business Impact:</strong> {incident.impact || 'Critical system disruption'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2">
                <strong>Affected Users:</strong> {incident.affected_users || 'All users'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2">
                <strong>Affected Systems:</strong> {incident.affected_system || 'To be determined'}
              </Typography>
            </Grid>
            </Grid>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Next Actions:</strong>
              </Typography>
              <Typography variant="body2" component="ul" sx={{ pl: 2, mt: 0.5 }}>
                <li>Immediate triage required</li>
                <li>Escalate to on-call engineer</li>
                <li>Begin incident response protocol</li>
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default P1IncidentCard;
