import React from "react";
import { Box } from "grommet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { max } from "lodash";

const loginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <div align="center" style={{ maxWidth: "20rem", marginTop: "2rem" }}>
      <form onSubmit={handleLogin}>
        <div>
          <Input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username"
            id="username"
          />
        </div>

        <div>
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
            type="password"
            id="password"
          />
        </div>

        <Button type="submit" style={{ marginTop: 10 }} id="login-button">
          Login
        </Button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default loginForm;
