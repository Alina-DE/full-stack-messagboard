import { useContext } from 'react';

import { Box, Container } from '@material-ui/core';
import Messages from '../../components/Messages';

import { AuthContext } from '../../App';


export default function Homepage() {
  // using Context from App.js
  const { loggedIn } = useContext(AuthContext)

  return (
    <>
      {!loggedIn ?
        <Container
          style={{ maxWidth: "100vw", height: "calc(100vh - 65px)", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "65px", textAlign:"center" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            padding="20px"
            bgcolor="rgba(255, 255, 255, 0.85)"
            minWidth="40%"
            height="50%"
            borderRadius="5px"
          >
            <h1>This is your MessageBoard</h1>

            <h3>Please, login to read, add and delete messages</h3>
          </Box>
        </Container>
        :
        <Messages />
      }
    </>
  );
}