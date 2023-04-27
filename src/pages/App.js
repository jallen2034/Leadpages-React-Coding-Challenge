import React from 'react';
import Container from '@mui/material/Container';

import Header from '../components/header/Header';
import Content from '../components/content/Content';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
    </>
  );
}

export default App;
