import React from "react";
import { Button } from "@/components/ui/button";
import { Box } from "grommet";
import { Input } from "@/components/ui/input";

const NewUser = ({
  newUserVisible,
  setNewUserVisible,
  handleCreateUser,
  signupUsername,
  setSignupUsername,
  signupPassword,
  setSignupPassword,
  signupName,
  setSignupName
}) => {
  const cancelCreate = (event) => {
    setNewUserVisible(false);
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 4
        }}
      />
      <Box
        align="center"
        style={{
          zIndex: 5,
          position: "absolute",
          top: "20vh",
          margin: "auto",
          left: 0,
          right: 0,
          marginInline: "auto",
          width: "fit-content",
          padding: "80px",
          border: "1px solid var(--foreground)",
          boxShadow: "8px 8px 0px var(--foreground)",
          backgroundColor: "var(--background)"
        }}
      >
        <h4>Create an Account</h4>
        <form onSubmit={handleCreateUser}>
          <div>
            <Input
              value={signupUsername}
              onChange={({ target }) => setSignupUsername(target.value)}
              placeholder="Username"
              id="username"
            />
          </div>

          <div>
            <Input
              value={signupName}
              onChange={({ target }) => setSignupName(target.value)}
              placeholder="Name"
              type="name"
              id="name"
            />
          </div>

          <div>
            <Input
              value={signupPassword}
              onChange={({ target }) => setSignupPassword(target.value)}
              placeholder="Password"
              type="password"
              id="password"
            />
          </div>

          <div
            style={{
              marginLeft: "2rem"
            }}
          >
            <Button type="submit" style={{ margin: 10 }} id="signup-button">
              Sign Me Up!
            </Button>
            <Button
              type="button"
              style={{ margin: 10 }}
              id="cancel"
              onClick={cancelCreate}
            >
              Cancel
            </Button>
          </div>

          <br />
          <br />
        </form>
      </Box>
    </>
  );
};

export default NewUser;
