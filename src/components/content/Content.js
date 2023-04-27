import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";

export default function Content(props) {
  const {postUpdated, setPostUpdated} = props;
  const [likedToasts, setLikedToasts] = useState([]);
  const [mostRecentSubmission, setMostRecentSubmission] = useState('');
  const [open, setOpen] = React.useState(false);
  console.log("likedToasts: ", likedToasts);
  console.log("mostRecentSubmission: ", mostRecentSubmission);

  /* Run this hook when this component initially mounts
   * Add an event listener to the content component/page that listens for then the value of 'formSubmissions'
   * in the browsers localStorage changes when a new submission is  sent to the API */
  useEffect(() => {
    if (postUpdated) {
      const updatedFormSubmissions = JSON.parse(localStorage.getItem('formSubmissions'));
      setMostRecentSubmission(updatedFormSubmissions[updatedFormSubmissions.length - 1]);
      setPostUpdated(false);
      setOpen(true);
    }
  }, [postUpdated]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small"/>
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box sx={{marginTop: 3}}>
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
            sx={{width: '100%'}}
          >
            A new form was just generated for this user:
            <br />
            First Name: {mostRecentSubmission.data ? mostRecentSubmission.data.firstName : ''}
            <br />
            Last Name: {mostRecentSubmission.data ? mostRecentSubmission.data.lastName : ''}
            <br />
            Email: {mostRecentSubmission.data ? mostRecentSubmission.data.email : ''}
          </Alert>
        </Snackbar>
      </div>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
        TODO: List of liked submissions here (delete this line)
      </Typography>
    </Box>
  );
}
