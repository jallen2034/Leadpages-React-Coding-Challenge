import React, {useState} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from '@mui/material/Snackbar';
import {
  createMockFormSubmission,
} from '../../service/mockServer';
import {submitForm} from "./Helpers";
import {Alert} from "@mui/material";

export default function Header(props) {
  const {
    setPostUpdated,
    setLoading,
    loading,
    openError,
    setOpenError,
    open,
  } = props; // Prop drilling

  /* This function is triggered when the user clicks on the 'New Submission' button.
   * It calls the submitForm() function, passing in the createMockFormSubmission callback
   * function, which generates random data (first name, last name, email, and likes)
   * for the new submission. The submission is then sent to the server via this callback. */
  const handleSubmitNewMessage = async () => {
    try {
      setLoading(true);
      await submitForm(createMockFormSubmission, setOpenError, setPostUpdated, setLoading);
    } catch (e) {
      setLoading(false);
      setOpenError(true);
      console.error(e);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{ width: '100%', fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
      >
        <strong>Oops! Something went wrong while creating a new submission. Please try again later.</strong>
      </Alert>
    </Snackbar>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{marginRight: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" sx={{flexGrow: 1}}>
            Toast Exercise
          </Typography>
          {loading ?
            <LoadingButton
              disabled
              loading
              className="cancelButtonDefault"
              loadingPosition="start"
              startIcon={<SaveIcon/>}
              variant="outlined"
            >
              Submitting...
            </LoadingButton>
            :
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => handleSubmitNewMessage()}
              disabled={!!openError || open || loading}
            >
              New Submission
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
