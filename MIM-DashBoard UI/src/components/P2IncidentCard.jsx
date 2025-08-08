import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Box,
  Collapse,
  LinearProgress,
  IconButton,
  Divider,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Email as EmailIcon,
  PersonAdd as PersonAddIcon,
  Warning as WarningIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';

const P2IncidentCard = ({ incident, onStatusUpdate, onAssign }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState('');
  const [progress, setProgress] = useState(0);
  const [priorityLevel, setPriorityLevel] = useState('HIGH');

  useEffect(() => {
    const calculateMetrics = () => {
      const createdTime = new Date(incident.created_on);
      const now = new Date();
      const diffMs = now - createdTime;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeElapsed(`${diffHrs}h ${diffMins}m ago`);
      
      // Calculate SLA progress (8-hour SLA for P2)
      const slaHours = 8;
      const progressPercent = Math.min((diffHrs / slaHours) * 100, 100);
      setProgress(progressPercent);
      
      // Auto-escalate priority based on time
      if (progressPercent >= 75) {
        setPriorityLevel('URGENT');
      } else if (progressPercent >= 50) {
        setPriorityLevel('HIGH');
      } else {
        setPriorityLevel('MEDIUM');
      }
    };

    calculateMetrics();
    const interval = setInterval(calculateMetrics, 60000);
    return () => clearInterval(interval);
  }, [incident.created_on]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleHighPriorityAlert = () => {
    const subject = `📈 P2 High Priority: ${incident.incident_no}`;
    const body = `P2 High Priority Incident Notification
    
📊 P2 INCIDENT DETAILS

Incident: ${incident.incident_no}
Priority: ${priorityLevel}
Status: ${incident.status || 'OPEN'}
Age: ${timeElapsed}
SLA Progress: ${Math.round(progress)}% complete
Description: ${incident.description}
Reporter: ${incident.created_by}
Created: ${incident.created_on}

PRIORITY ACTIONS:
1. Review and assess impact
2. Assign to appropriate team
3. Provide initial response within 2 hours
4. Update stakeholders on progress`;

    const mailtoLink = `mailto:high-priority@oup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

  const getPriorityColor = () => {
    switch (priorityLevel) {
      case 'URGENT':
        return 'error';
      case 'HIGH':
        return 'warning';
      case 'MEDIUM':
        return 'info';
      default:
        return 'info';
    }
  };

  const getBorderColor = () => {
    if (priorityLevel === 'URGENT') return 'error.main';
    if (priorityLevel === 'HIGH') return 'warning.main';
    return 'info.main';
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: 4, 
        borderLeftColor: (theme) => theme.palette[getBorderColor().split('.')[0]]?.main || theme.palette.info.main,
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
            color={getPriorityColor()} 
            sx={{ mr: 1, fontSize: 20 }} 
          />
          <Chip 
            label={`${priorityLevel} PRIORITY P2`}
            color={getPriorityColor()}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" sx={{ color: (theme) => theme.palette.text.secondary }}>
            {timeElapsed}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            SLA Progress (8h)
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            color={progress >= 75 ? 'error' : progress >= 50 ? 'warning' : 'info'}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary">
            {Math.round(progress)}% complete
          </Typography>
        </Box>

          <Typography variant="body2" sx={{ mb: 2, color: (theme) => theme.palette.text.primary }}>
          {incident.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
          <Chip label={`Reporter: ${incident.created_by}`} size="small" variant="outlined" sx={{ borderColor: (theme) => theme.palette.divider, color: (theme) => theme.palette.text.secondary }} />
          <Chip label={`Created: ${incident.created_on}`} size="small" variant="outlined" sx={{ borderColor: (theme) => theme.palette.divider, color: (theme) => theme.palette.text.secondary }} />
          <Chip label={`Category: ${incident.category || 'General'}`} size="small" variant="outlined" sx={{ borderColor: (theme) => theme.palette.divider, color: (theme) => theme.palette.text.secondary }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={toggleDetails}
            endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ textTransform: 'none' }}
          >
            {showDetails ? 'Hide Details' : 'Details'}
          </Button>
          
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleHighPriorityAlert}
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
              👤 Assign
            </Button>
          )}
        </Box>

        {onStatusUpdate && (
          <FormControl size="small" sx={{ minWidth: 120, mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={incident.status || 'OPEN'}
              onChange={(e) => onStatusUpdate(incident.incident_no, e.target.value)}
              label="Status"
            >
              <MenuItem value="OPEN">OPEN</MenuItem>
              <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
              <MenuItem value="RESOLVED">RESOLVED</MenuItem>
              <MenuItem value="CLOSED">CLOSED</MenuItem>
            </Select>
          </FormControl>
        )}

        <Collapse in={showDetails} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 1, fontSize: '0.9rem', fontWeight: 'bold' }}>
              Impact Assessment
            </Typography>
            <Grid container spacing={1}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2">
                <strong>Business Impact:</strong> {incident.impact || 'Moderate system disruption'}
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
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2">
                <strong>Business Priority:</strong> {priorityLevel}
              </Typography>
            </Grid>
            </Grid>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Next Steps:</strong>
              </Typography>
              <Typography variant="body2" component="ul" sx={{ pl: 2, mt: 0.5 }}>
                <li>Assign to appropriate team member</li>
                <li>Provide initial response within 30 minutes</li>
                <li>Send immediate open comms to stakeholders</li>
                <li>Update stakeholders regularly</li>
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default P2IncidentCard;
