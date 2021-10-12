import { Box, Button, Container, TextField } from '@material-ui/core';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiosApiInstance from '../../util/AxiosInstance';

import { AuthContext } from '../../App';


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  // using Context from App.js
  const { handleLogin } = useContext(AuthContext)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axiosApiInstance.post("/user/login", {
        username,
        password
      })

      if (res.status === 200) {
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("avatar", res.data.user.avatar);

        handleLogin(true, res.data.token, res.data.user._id);

        // move to a protected content Messages
        history.push("/")
      }
    } catch (error) {

      handleLogin(false, null, null)
      setErrorMessage(error.response.data)

      setTimeout(() => {
        setErrorMessage("")

        if (error.response.status === 404) {
          // move to /register Page
          history.push("/register")
        }

        if (error.response.status === 401) {
          setUsername("")
          setPassword("")
        }
      }, 2000);

    }
  };

  return (
    <Container component="main" maxWidth="xs"
      style={{ maxWidth: "100vw", height: "calc(100vh - 65px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "65px", textAlign: "center" }}
    >
      <form onSubmit={handleSubmit}
        style={{ maxWidth: "444px", height: "fit-content", background: "white", opacity: "0.85", borderRadius: "5px", padding: "40px 20px 0 20px" }}
      >

        <h1>Login</h1>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Login</Button>

        <Box marginTop="20px" height="40px" color="#ff4081">
          <h3>{errorMessage}</h3>
        </Box>
      </form>

    </Container>
  );
}