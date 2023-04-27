import React, {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  createMockFormSubmission,
} from '../../service/mockServer';
import {submitForm} from "./helpers";

export default function Header() {

  /* This function is triggered when the user clicks on the 'New Submission' button.
   * It calls the submitForm() function, passing in the createMockFormSubmission callback
   * function, which generates random data (first name, last name, email, and likes)
   * for the new submission. The submission is then sent to the server via this callback. */
  const handleSubmitNewMessage = async (event) => {
    event.preventDefault();
    await submitForm(createMockFormSubmission);
  }

  return (
    <Box sx={{flexGrow: 1}}>
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
            onClick={(event) => handleSubmitNewMessage(event)}
          >
            New Submission
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
