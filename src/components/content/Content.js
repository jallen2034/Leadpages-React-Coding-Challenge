import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import {fetchUpToDatePosts} from "./helpers";

export default function Content(props) {
  const {postUpdated, setPostUpdated} = props;
  const [mostRecentSubmission, setMostRecentSubmission] = useState('');
  const [open, setOpen] = React.useState(false);

  /*
   * This hook adds an event listener to the content component/page, listening for changes to the 'formSubmissions'
   * value in the browser's localStorage when a new submission is sent to the API. It then updates the most recent
   * submission, resets the postUpdated state, and opens up the submission dialog/snackbar.
   */
  useEffect(() => {
    if (postUpdated) {
      fetchUpToDatePosts(setMostRecentSubmission, setPostUpdated, setOpen);
    }
  }, [postUpdated]);

  // Handle when a user 'likes' a form submission
  const handleLike = () => {
    const likedToasts = JSON.parse(localStorage.getItem('likedToasts')) || [];
    const updatedLikedToasts = [...likedToasts, mostRecentSubmission]; // Add form submission  to the users liked toasts
    localStorage.setItem('likedToasts', JSON.stringify(updatedLikedToasts));
    setOpen(false);
  };

  // Get the most recent liked toasts saved in localStorage vs a useState hook to remember between page renders
  const likedToasts = JSON.parse(localStorage.getItem('likedToasts')) || [];

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{marginTop: 3}}>
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
            A new form was just generated for this user:
            <br/>
            First Name: {mostRecentSubmission.data ? mostRecentSubmission.data.firstName : ''}
            <br/>
            Last Name: {mostRecentSubmission.data ? mostRecentSubmission.data.lastName : ''}
            <br/>
            Email: {mostRecentSubmission.data ? mostRecentSubmission.data.email : ''}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '16px'}}>
              <Button variant="outlined" onClick={handleLike}>Like</Button>
            </div>
          </Alert>
        </Snackbar>
      </div>
      <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
        <Typography variant="h4">Liked Form Submissions</Typography>
        {likedToasts.length === 0 ? (
          <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
            You have no liked submissions yet
          </Typography>
        ) : (
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
        )}
      </Typography>
    </Box>
  );
}
