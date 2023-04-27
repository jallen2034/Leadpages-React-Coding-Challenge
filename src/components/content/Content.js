import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {fetchLikedFormSubmissions} from "../../service/mockServer";

export default function Content() {

  // useEffect(() => {
  //   const fetchLikes = async () => {
  //     const likes = await fetchLikedFormSubmissions();
  //     console.log("likes", likes);
  //   }
  //   fetchLikes();
  // }, [])

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
        TODO: List of liked submissions here (delete this line)
      </Typography>
    </Box>
  );
}
