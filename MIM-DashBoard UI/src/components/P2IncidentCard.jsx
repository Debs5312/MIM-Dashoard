import React, { useState, useEffect, useMemo } from 'react';
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

const SLA_HOURS = 8;

const getStatusColor = (status) => {
  switch ((status || 'open').toLowerCase()) {
    case 'open': return 'error';
    case 'in progress': return 'warning';
    case 'resolved': return 'success';
    case 'closed': return 'default';
    default: return 'info';
  }
};

const getPriorityColor = (priorityLevel) => {
  switch (priorityLevel) {
    case 'URGENT': return 'error';
    case 'HIGH': return 'warning';
    case 'MEDIUM': return 'info';
    default: return 'info';
  }
};

const getBorderColor = (priorityLevel) => {
  if (priorityLevel === 'URGENT') return 'error.main';
  if (priorityLevel === 'HIGH') return 'warning.main';
  return 'info.main';
};

const getPriorityLevel = (progressPercent) => {
  if (progressPercent >= 75) return 'URGENT';
  if (progressPercent >= 50) return 'HIGH';
  return 'MEDIUM';
};

const P2IncidentCard = ({ incident, onStatusUpdate, onAssign }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Memoize time/progress/priority calculations
  const { timeElapsed, progress, priorityLevel } = useMemo(() => {
    const createdTime = new Date(incident.created_on);
    const now = new Date();
    const diffMs = now - createdTime;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const timeElapsed = `${diffHrs}h ${diffMins}m ago`;
    const progress = Math.min((diffMs / (SLA_HOURS * 60 * 60 * 1000)) * 100, 100);
    const priorityLevel = getPriorityLevel(progress);
    return { timeElapsed, progress, priorityLevel };
  }, [incident.created_on, Date.now()]);

  // Update every minute
  useEffect(() => {
    const interval = setInterval(() => {
      // Triggers re-render for useMemo
      setShowDetails((prev) => prev);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  const handleHighPriorityAlert = () => {
    const subject = `📈 P2 High Priority: ${incident.incident_no}`;
    const body = `P2 High Priority Incident Notification\n\n📊 P2 INCIDENT DETAILS\n\nIncident: ${incident.incident_no}\nPriority: ${priorityLevel}\nStatus: ${incident.status || 'OPEN'}\nAge: ${timeElapsed}\nSLA Progress: ${Math.round(progress)}% complete\nDescription: ${incident.description}\nReporter: ${incident.created_by}\nCreated: ${incident.created_on}\n\nPRIORITY ACTIONS:\n1. Review and assess impact\n2. Assign to appropriate team\n3. Provide initial response within 2 hours\n4. Update stakeholders on progress`;
    const mailtoLink = `mailto:high-priority@oup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: 4, 
        borderLeftColor: (theme) => theme.palette[getBorderColor(priorityLevel).split('.')[0]]?.main || theme.palette.info.main,
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
            color={getStatusColor(incident.status)}
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <WarningIcon 
            color={getPriorityColor(priorityLevel)} 
            sx={{ mr: 1, fontSize: 20 }} 
          />
          <Chip 
            label={`${priorityLevel} PRIORITY P2`}
            color={getPriorityColor(priorityLevel)}
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
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Business Impact:</strong> {incident.impact || 'Moderate system disruption'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Affected Users:</strong> {incident.affected_users || 'All users'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Affected Systems:</strong> {incident.affected_system || 'To be determined'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
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
