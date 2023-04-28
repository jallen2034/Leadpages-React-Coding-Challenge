import React, {useState} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import {
  createMockFormSubmission,
} from '../../service/mockServer';
import {submitForm} from "./helpers";

export default function Header(props) {
  const { setPostUpdated } = props;
  const [openError, setOpenError] = useState(false);

  /* This function is triggered when the user clicks on the 'New Submission' button.
   * It calls the submitForm() function, passing in the createMockFormSubmission callback
   * function, which generates random data (first name, last name, email, and likes)
   * for the new submission. The submission is then sent to the server via this callback. */
  const handleSubmitNewMessage = async () => {
    try {
      await submitForm(createMockFormSubmission);
      setPostUpdated(true);
    } catch (error) {
      console.error(error);
      setOpenError(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
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
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box sx={{flexGrow: 1}}>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Something went wrong when submitting a post, please try again"
        action={action}
      />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{marginRight: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow: 1}}>
            Toast Exercise
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={(event) => handleSubmitNewMessage()}
          >
            New Submission
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
