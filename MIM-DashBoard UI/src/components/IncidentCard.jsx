import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Collapse,
  Grid,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'p1': return 'error';
    case 'p2': return 'warning';
    case 'p3': return 'success';
    case 'p4': return 'info';
    default: return 'default';
  }
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'open': return 'default';
    case 'in_progress': return 'info';
    case 'resolved': return 'success';
    case 'closed': return 'default';
    default: return 'default';
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const IncidentCard = ({ incident }) => {
  const [showDetails, setShowDetails] = useState(false);
  const theme = useTheme();

  // Memoize border color for performance
  const borderLeftColor = useMemo(() => {
    const priority = incident.priority?.toLowerCase();
    switch (priority) {
      case 'p1': return theme.palette.error.main;
      case 'p2': return theme.palette.warning.main;
      case 'p3': return theme.palette.success.main;
      case 'p4': return theme.palette.info.main;
      default: return theme.palette.grey[400];
    }
  }, [incident.priority, theme]);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: 4,
        borderLeftColor,
        '&:hover': {
          boxShadow: theme.shadows[8],
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="h6" component="h3" fontWeight="bold">
            {incident.incident_no}
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            <Chip 
              label={incident.priority || 'P3'} 
              color={getPriorityColor(incident.priority)}
              size="small"
              variant="outlined"
            />
            <Chip 
              label={incident.status || 'OPEN'} 
              color={getStatusColor(incident.status)}
              size="small"
            />
          </Box>
        </Box>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Reporter:</strong> {incident.created_by}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Created:</strong> {formatDate(incident.created_on)}
            </Typography>
          </Grid>
          {incident.assigned_to && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Assigned:</strong> {incident.assigned_to}
              </Typography>
            </Grid>
          )}
          {incident.category && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Category:</strong> {incident.category}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Typography 
          variant="body1" 
          color="text.primary"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {incident.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={toggleDetails}
          endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          aria-expanded={showDetails}
          aria-controls={`details-${incident.incident_no}`}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
      </CardActions>
      <Collapse 
        in={showDetails} 
        timeout="auto" 
        unmountOnExit
        id={`details-${incident.incident_no}`}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Incident Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Incident Number:</strong> {incident.incident_no}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Priority:</strong> {incident.priority || 'Not Set'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Status:</strong> {incident.status || 'OPEN'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Created By:</strong> {incident.created_by}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Created On:</strong> {formatDate(incident.created_on)}
              </Typography>
            </Grid>
            {incident.assigned_to && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body2">
                  <strong>Assigned To:</strong> {incident.assigned_to}
                </Typography>
              </Grid>
            )}
          </Grid>
          {incident.additional_details && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Additional Details
              </Typography>
              <Typography variant="body2">
                {incident.additional_details}
              </Typography>
            </>
          )}
          {incident.steps_to_reproduce && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Steps to Reproduce
              </Typography>
              <List dense>
                {incident.steps_to_reproduce.map((step, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText primary={step} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
          <Divider sx={{ my: 2 }} />
          <Box display="flex" gap={1} flexWrap="wrap">
            <Button
              size="small"
              variant="outlined"
              startIcon={<VisibilityIcon />}
            >
              View Full Details
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditIcon />}
            >
              Update Status
            </Button>
            {incident.status !== 'CLOSED' && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<AssignmentIcon />}
              >
                Assign
              </Button>
            )}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default IncidentCard;
