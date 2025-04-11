import React from "react";
import { Button } from "@/components/ui/button";
import { Box } from "grommet";
import TextField from "@mui/material/TextField";

const NewUser = ({
  newUserVisible,
  setNewUserVisible,
  handleCreateUser,
  username,
  setUsername,
  password,
  setPassword,
  setName,
  name
}) => {
  const cancelCreate = (event) => {
    setNewUserVisible(false);
  };
  return (
    <Box
      align="center"
      style={{
        zIndex: 5,
        position: "absolute",
        top: "20vh",
        margin: "auto",
        backgroundColor: "white",
        padding: "80px",
        border: "1px solid black",
        boxShadow: "8px 8px 0px black"
      }}
    >
      <h4>Create an Account</h4>
      <form onSubmit={handleCreateUser}>
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
            value={name}
            onChange={({ target }) => setName(target.value)}
            label="Name"
            type="name"
            id="name"
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

        <Button type="submit" style={{ margin: 10 }} id="login-button">
          Sign Me Up!
        </Button>
        <Button style={{ margin: 10 }} id="cancel" onClick={cancelCreate}>
          Cancel
        </Button>
        <br />
        <br />
      </form>
    </Box>
  );
};

export default NewUser;
