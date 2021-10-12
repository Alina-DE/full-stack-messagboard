import { Box, Button, Container, TextField } from '@material-ui/core';
import { useState } from "react"
import axiosApiInstance from '../../util/AxiosInstance';
import { useHistory } from 'react-router-dom';


export default function Register() {

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axiosApiInstance.post('/user/register', {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password
      })

      if (res.status === 200) {
        setMessage("The user successfully added, please login")

        setTimeout(() => {
          history.push("/login")
        }, 1500);
      }

    } catch (error) {
      setMessage(error.response.data)
    }
  };

  return (
    <Container component="main" maxWidth="xs"
      style={{ maxWidth: "100vw", height: "calc(100vh - 65px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "65px", textAlign:"center" }}
    >

      <form onSubmit={handleSubmit}
        style={{ maxWidth: "444px", height: "fit-content", background: "white", opacity: "0.85", borderRadius: "5px", padding: "40px 20px 0 20px" }}
      >
        <h1>Register</h1>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="First Name"
          name="firstname"
          autoComplete="firstname"
          autoFocus
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastname"
          label="Last Name"
          name="lastname"
          autoComplete="lastname"
          autoFocus
          value={lastname}
          onChange={e => setLastname(e.target.value)}
        />

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
          onChange={e => setUsername(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">Register</Button>

        <Box marginTop="20px" height="40px" color="#ff4081">
          <h3>{message}</h3>
        </Box>
      </form>
    </Container>
  );
}