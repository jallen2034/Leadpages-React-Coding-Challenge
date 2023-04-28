import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import {Alert} from "@mui/material";
import './Content.css';

export default function Content(props) {
  const {open, setOpen, mostRecentSubmission} = props;
  const [expanded, setExpanded] = useState('panel1'); // for the Accordion

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Handle when a user 'likes' a form submission
  const handleLike = () => {
    const likedToasts = JSON.parse(localStorage.getItem('likedToasts')) || [];
    const updatedLikedToasts = [...likedToasts, mostRecentSubmission]; // Add form submission  to the users liked toasts
    localStorage.setItem('likedToasts', JSON.stringify(updatedLikedToasts));
    setOpen(false);
  };

  // When (and only when) the component mounts, collapse the Accordion when the liked posts length gets longer than 8 posts
  useEffect(() => {
    if (likedToasts.length > 8) {
      setExpanded(false);
    }
  }, [])

  // Get the most recent liked toasts saved in localStorage vs a useState hook to remember between page renders
  const likedToasts = JSON.parse(localStorage.getItem('likedToasts')) || [];

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{marginTop: 3, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            <strong>A new form has been generated for you:</strong>
            <br />
            <br />
            • <strong>First Name:</strong> {mostRecentSubmission.data ? mostRecentSubmission.data.firstName : ''}
            <br />
            • <strong>Last Name:</strong> {mostRecentSubmission.data ? mostRecentSubmission.data.lastName : ''}
            <br />
            • <strong>Email:</strong> {mostRecentSubmission.data ? mostRecentSubmission.data.email : ''}
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Button style={{marginTop: '8px'}} variant="outlined" onClick={handleLike}>Like</Button>
            </div>
          </Alert>
        </Snackbar>
      </div>
      <div>
        <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
          <Typography variant="h4" sx={{fontWeight: 'bold', marginBottom: '12px'}}>Liked Form Submissions</Typography>
          {likedToasts.length === 0 ? (
            <Typography sx={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: '-6px',
              marginTop: '20px',
            }}>
              You haven't liked any submissions yet.
              <br/>
              Create a new submission and like it!
            </Typography>
          ) : (
            <div style={{marginTop: '20px'}}>
              <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChangeAccordion('panel1')}
              >
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  {expanded
                    ?
                    <Typography variant="body1">Click here to hide your likes</Typography>
                    :
                    <Typography variant="body1">Click here to view your likes</Typography>
                  }
                </AccordionSummary>
                <AccordionDetails>
                  <ul style={{listStyle: 'none', paddingLeft: 0}}>
                    {likedToasts.map((submission, index) => (
                      <li key={index} style={{marginBottom: '16px'}}>
                        <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                          {submission.data.firstName} {submission.data.lastName}
                        </Typography>
                        <Typography variant="body2" sx={{fontStyle: 'italic'}}>
                          {submission.data.email}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </div>
          )}
        </Typography>
      </div>
    </Box>
  );
}
