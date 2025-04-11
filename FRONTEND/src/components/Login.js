import React from "react";
import Button from "@material-ui/core/Button";
import { Box } from "grommet";
import TextField from "@material-ui/core/TextField";

const loginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <Box align="center">
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            label="Username"
            id="username"
          />
        </div>

        <div>
          <TextField
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            type="password"
            id="password"
          />
        </div>

        <Button
          variant="outlined"
          color="primary"
          type="submit"
          style={{ marginTop: 10 }}
          id="login-button"
        >
          Login
        </Button>
        <br />
        <br />
      </form>
    </Box>
  );
};

export default loginForm;
