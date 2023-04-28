import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Header from '../components/header/Header';
import Content from '../components/content/Content';
import {fetchUpToDatePosts} from "../components/content/helpers";

function App() {
  const [postUpdated, setPostUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [open, setOpen] = useState(false);
  const [mostRecentSubmission, setMostRecentSubmission] = useState('');

  /*
   * This hook adds an event listener to the content component/page, listening for changes to the 'formSubmissions'
   * value in the browser's localStorage when a new submission is sent to the API. It then updates the most recent
   * submission, resets the postUpdated state, and opens up the submission dialog/snackbar.
   */
  useEffect(() => {
    if (postUpdated) {
      fetchUpToDatePosts(
        setMostRecentSubmission,
        setPostUpdated,
        setOpen,
        setOpenError,
        setLoading
      );
    }
  }, [postUpdated]);

  return (
    <>
      <Header
        setPostUpdated={setPostUpdated}
        setLoading={setLoading}
        loading={loading}
        openError={openError}
        setOpenError={setOpenError}
        open={open}
        setOpen={setOpen}
        mostRecentSubmission={mostRecentSubmission}
        setMostRecentSubmission={setMostRecentSubmission}
      />
      <Container>
        <Content
          setOpenError={setOpenError}
          open={open}
          setOpen={setOpen}
          mostRecentSubmission={mostRecentSubmission}
        />
      </Container>
    </>
  );
}

export default App;
