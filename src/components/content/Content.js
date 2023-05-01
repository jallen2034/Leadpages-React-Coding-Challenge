import React, {useEffect, useRef, useState} from 'react';
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
  const [expanded, setExpanded] = useState('panel1'); // For the Accordion
  const [likedToasts, setLikedToasts] = useState([]); // Initializing state to store liked toasts in this component

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Handle when a user 'likes' a form submission and update it in our components state
  const handleLike = () => {
    setLikedToasts([...likedToasts, mostRecentSubmission]); // Add form submission  to the users liked toasts
    setOpen(false);
  };

  /* When this component mounts, retrieve the previously liked toasts from localStorage, and set them as initial state
   * in our app. only read this from localStorage ONCE when the component initially mounts to improve performance */
  useEffect(() => {
    const likedToastsLocalStorage = JSON.parse(localStorage.getItem('likedToasts'));
    if (likedToastsLocalStorage?.length > 8) {
      setExpanded(false);
    }
    if (likedToastsLocalStorage?.length) {
      setLikedToasts(likedToastsLocalStorage);
    }
  }, []);

  /* Save our liked toasts into localStorage before the component unmounts. We do this to
   * ensure persistence between page refreshes and optimize our apps render performance */
  useEffect(() => {
    if (likedToasts?.length > 0) { // Only save the liked toasts to localstorage if there is one to save
      localStorage.setItem('likedToasts', JSON.stringify(likedToasts));
    }
  }, [likedToasts])

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
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{width: '100%'}}
          >
            <strong>A new form has been generated for you:</strong>
            <br/>
            <br/>
            • <strong>First Name:</strong> {mostRecentSubmission.data ? mostRecentSubmission.data.firstName : ''}
            <br/>
            • <strong>Last Name:</strong> {mostRecentSubmission.data ? mostRecentSubmission.data.lastName : ''}
            <br/>
            • <strong>Email:</strong> {mostRecentSubmission.data ? mostRecentSubmission.data.email : ''}
            <br/>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '16px'}}>
              <Button style={{marginTop: '8px'}} variant="outlined" onClick={handleLike}>Like</Button>
            </div>
          </Alert>
        </Snackbar>
      </div>
      <div>
        <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
          <Typography variant="h4" sx={{fontWeight: 'bold', marginBottom: '12px'}}>Liked Form Submissions</Typography>
          {likedToasts && likedToasts.length === 0 ? (
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
                    {likedToasts && likedToasts.map((submission, index) => (
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
