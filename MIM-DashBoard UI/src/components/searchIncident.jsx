import React, { useState, useMemo, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
  '& .MuiInputBase-input': {
    padding: '8px 12px',
    fontSize: '0.875rem',
  },
}));

const SearchIncident = ({ 
  incidents = [], 
  onSearchResults, 
  placeholder = "Search by incident number...",
  label = "Search Incidents"
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Optimized filter logic
  const filteredIncidents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return incidents;

    // Exact match (incident_no)
    const exact = incidents.find(incident =>
      incident.incident_no?.toString().toLowerCase() === term
    );
    if (exact) return [exact];

    // Prefix match (incident_no)
    const prefix = incidents.filter(incident =>
      incident.incident_no?.toString().toLowerCase().startsWith(term)
    );
    if (prefix.length > 0) return prefix;

    // Partial match (incident_no, title, description)
    return incidents.filter(incident =>
      incident.incident_no?.toString().toLowerCase().includes(term) ||
      incident.title?.toLowerCase().includes(term) ||
      incident.description?.toLowerCase().includes(term)
    );
  }, [incidents, searchTerm]);

  // Always call onSearchResults with latest filtered results
  useEffect(() => {
    if (onSearchResults) {
      onSearchResults(filteredIncidents, searchTerm);
    }
  }, [filteredIncidents, searchTerm, onSearchResults]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const totalIncidents = incidents.length;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
        {label}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Fade in={searchTerm.length > 0}>
          <Chip 
            label={`${searchTerm ? filteredIncidents.length : totalIncidents}`} 
            color="primary" 
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Fade>
        
        <StyledTextField
          size="small"
          variant="outlined"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon 
                  fontSize="small" 
                  color={isFocused ? "primary" : "action"}
                />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <Tooltip title="Clear search">
                  <IconButton
                    size="small"
                    onClick={handleClearSearch}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          sx={{ 
            minWidth: 200,
            maxWidth: 300,
            transition: 'all 0.3s ease',
            ...(isFocused && {
              minWidth: 250,
              maxWidth: 350,
            })
          }}
        />
      </Box>
    </Box>
  );
};

// Export a version specifically for P1 incidents
export const SearchP1Incident = ({ incidents, onSearchResults }) => (
  <SearchIncident
    incidents={incidents}
    onSearchResults={onSearchResults}
    label="P1 Incidents"
    placeholder="Search P1 incidents..."
  />
);

// Export a version specifically for P2 incidents
export const SearchP2Incident = ({ incidents, onSearchResults }) => (
  <SearchIncident
    incidents={incidents}
    onSearchResults={onSearchResults}
    label="P2 Incidents"
    placeholder="Search P2 incidents..."
  />
);

// Export a version specifically for All incidents
export const SearchAllIncident = ({ incidents, onSearchResults }) => (
  <SearchIncident
    incidents={incidents}
    onSearchResults={onSearchResults}
    label="All MIM Incidents"
    placeholder="Search MIM incidents..."
  />
);

export default SearchIncident;
