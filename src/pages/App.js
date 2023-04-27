import React, {useState} from 'react';
import Container from '@mui/material/Container';

import Header from '../components/header/Header';
import Content from '../components/content/Content';

function App() {
  const [postUpdated, setPostUpdated] = useState(false);
  return (
    <>
      <Header setPostUpdated={setPostUpdated} />
      <Container>
        <Content
          postUpdated={postUpdated}
          setPostUpdated={setPostUpdated}
        />
      </Container>
    </>
  );
}

export default App;
