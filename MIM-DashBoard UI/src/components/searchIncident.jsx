import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
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
  label = "Search Incidents",
  scrollContainerRef = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  // Filter incidents based on search term
  const filteredIncidents = useMemo(() => {
    if (!searchTerm.trim()) {
      return incidents;
    }
    
    const term = searchTerm.toLowerCase().trim();
    return incidents.filter(incident => 
      incident.incident_no?.toString().toLowerCase().includes(term) ||
      incident.title?.toLowerCase().includes(term) ||
      incident.description?.toLowerCase().includes(term)
    );
  }, [incidents, searchTerm]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    if (onSearchResults) {
      onSearchResults(filteredIncidents, value);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    if (onSearchResults) {
      onSearchResults(incidents, '');
    }
  };

  // Scroll to the first matching incident
  const scrollToIncident = (incidentIndex) => {
    if (!scrollContainerRef?.current || incidentIndex < 0 || incidentIndex >= filteredIncidents.length) {
      return;
    }

    const container = scrollContainerRef.current;
    const incidentElements = container.querySelectorAll('[data-incident-id]');
    
    if (incidentElements[incidentIndex]) {
      const element = incidentElements[incidentIndex];
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate the relative position
      const elementTop = element.offsetTop;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const elementHeight = element.clientHeight;
      
      // Calculate the exact center position
      // We want the element's center to be at the container's center
      const targetScrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);
      
      // Ensure we don't scroll to negative values
      const finalScrollTop = Math.max(0, targetScrollTop);
      
      // Smooth scroll to the incident
      container.scrollTo({
        top: finalScrollTop,
        behavior: 'smooth'
      });
      
      // Highlight the incident briefly
      element.style.transition = 'background-color 0.3s ease';
      element.style.backgroundColor = 'rgba(25, 118, 210, 0.1)';
      setTimeout(() => {
        element.style.backgroundColor = '';
      }, 2000);
    }
  };

  // Handle key press for Enter to scroll to incident
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (searchTerm.trim() && filteredIncidents.length > 0) {
        // Find the first matching incident
        const firstMatchIndex = 0;
        scrollToIncident(firstMatchIndex);
      }
    }
  };

  const searchResultsCount = filteredIncidents.length;
  const totalIncidents = incidents.length;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
        {label}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Fade in={searchTerm.length > 0}>
          <Chip 
            label={`${searchResultsCount} of ${totalIncidents}`}
            size="small"
            color={searchResultsCount === 0 ? "default" : "primary"}
            sx={{ fontWeight: 'bold' }}
          />
        </Fade>
        
        <StyledTextField
          size="small"
          variant="outlined"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
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
export const SearchP1Incident = ({ incidents, onSearchResults, scrollContainerRef }) => (
  <SearchIncident
    incidents={incidents}
    onSearchResults={onSearchResults}
    scrollContainerRef={scrollContainerRef}
    label="P1 Incidents"
    placeholder="Search P1 incidents..."
  />
);

// Export a version specifically for P2 incidents
export const SearchP2Incident = ({ incidents, onSearchResults, scrollContainerRef }) => (
  <SearchIncident
    incidents={incidents}
    onSearchResults={onSearchResults}
    scrollContainerRef={scrollContainerRef}
    label="P2 Incidents"
    placeholder="Search P2 incidents..."
  />
);

// Export a version specifically for All incidents
export const SearchAllIncident = ({ incidents, onSearchResults, scrollContainerRef }) => (
  <SearchIncident
    incidents={incidents}
    onSearchResults={onSearchResults}
    scrollContainerRef={scrollContainerRef}
    label="All MIM Incidents"
    placeholder="Search MIM incidents..."
  />
);

export default SearchIncident;
