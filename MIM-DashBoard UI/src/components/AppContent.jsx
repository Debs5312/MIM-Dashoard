import React, { useEffect, useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import IncidentCard from './IncidentCard';
import P1IncidentCard from './P1IncidentCard';
import P2IncidentCard from './P2IncidentCard';
import { SearchP1Incident, SearchP2Incident, SearchAllIncident } from './searchIncident';
import { incidentStore } from '../stores/incidentStore';
import { observer } from 'mobx-react-lite';

const AppContent = observer(() => {
  // DRY: Use a single state object for search terms and filtered results
  const [search, setSearch] = useState({
    p1: { term: '', filtered: [] },
    p2: { term: '', filtered: [] },
    all: { term: '', filtered: [] },
  });

  useEffect(() => {
    incidentStore.fetchData();
  }, []);

  const {
    p1Incidents,
    p2Incidents,
    allIncidents,
    loading,
    p1Loading,
    p2Loading,
    error,
    p1Error,
    p2Error
  } = incidentStore;

  const handleRefresh = async () => {
    await incidentStore.refreshData();
  };

  // DRY: Generic handler for search results
  const handleSearchResults = useCallback((type) => (filteredResults, searchTerm) => {
    setSearch(prev => ({
      ...prev,
      [type]: { term: searchTerm, filtered: filteredResults }
    }));
  }, []);

  if (loading && p1Incidents.length === 0 && p2Incidents.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading MIM Dashboard...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        <AppBar position="static" elevation={2} sx={{ width: '100%' }}>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              MIM Dashboard
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleRefresh}
              disabled={p1Loading || p2Loading}
              aria-label="refresh data"
            >
              <RefreshIcon />
            </IconButton>
            <Button
              color="inherit"
              onClick={handleRefresh}
              disabled={p1Loading || p2Loading}
              sx={{ ml: 1 }}
            >
              {p1Loading || p2Loading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="h6">Error</Typography>
              {error}
            </Alert>
          )}

          {/* P1 and P2 Incidents Section - Side by Side */}
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            {/* P1 Incidents Section */}
            <Paper elevation={3} sx={{ flex: 1, p: 2, height: '400px', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <SearchP1Incident 
                    incidents={p1Incidents} 
                    onSearchResults={handleSearchResults('p1')}
                  />
                </Box>
                <Chip 
                  label={`${p1Incidents.length}`} 
                  color="error" 
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
              
              {p1Loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, flex: 1 }}>
                  <CircularProgress size={30} />
                </Box>
              ) : p1Error ? (
                <Alert severity="error">{p1Error}</Alert>
              ) : (search.p1.term ? search.p1.filtered : p1Incidents).length > 0 ? (
                <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {(search.p1.term ? search.p1.filtered : p1Incidents).map(incident => (
                      <Box key={incident.incident_no}>
                        <P1IncidentCard incident={incident} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : (
                <Alert severity="info">No P1 incidents found</Alert>
              )}
            </Paper>

            {/* P2 Incidents Section */}
            <Paper elevation={3} sx={{ flex: 1, p: 2, height: '400px', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <SearchP2Incident incidents={p2Incidents} onSearchResults={handleSearchResults('p2')} />
                </Box>
                <Chip 
                  label={`${p2Incidents.length}`} 
                  color="warning" 
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
              
              {p2Loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, flex: 1 }}>
                  <CircularProgress size={30} />
                </Box>
              ) : p2Error ? (
                <Alert severity="error">{p2Error}</Alert>
              ) : (search.p2.term ? search.p2.filtered : p2Incidents).length > 0 ? (
                <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {(search.p2.term ? search.p2.filtered : p2Incidents).map(incident => (
                      <Box key={incident.incident_no}>
                        <P2IncidentCard incident={incident} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : (
                <Alert severity="info">No P2 incidents found</Alert>
              )}
            </Paper>
          </Box>

          {/* All Incidents Section - Stacked Below */}
          <Paper elevation={3} sx={{ p: 2, height: '400px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <SearchAllIncident incidents={allIncidents} onSearchResults={handleSearchResults('all')} />
              </Box>
              <Chip 
                label={`${search.all.term ? search.all.filtered.length : allIncidents.length}`} 
                color="primary" 
                size="small"
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
            {(search.all.term ? search.all.filtered : allIncidents).length > 0 ? (
              <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                  {(search.all.term ? search.all.filtered : allIncidents).map(incident => (
                    <Box key={incident.incident_no}>
                      <IncidentCard incident={incident} />
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Alert severity="info">No incidents found</Alert>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
});

export default AppContent;
