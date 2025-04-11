// Core
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

// Components
import Login from "./components/Login";
import NewUser from "./components/NewUser";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import BlogDetails from "./components/BlogDetails";
import Nav from "./components/Nav";

// Services
import blogService from "./services/blogs";
import loginService from "./services/login";

// Grommet
import { Grommet, Box, Grid, ResponsiveContext } from "grommet";
import { deepMerge } from "grommet/utils";

//shad
import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

// Reducers
import {
  setNotification,
  resetNotification
} from "./reducers/notificationReducer";
import { createBlog, initBlogs, voteBlog } from "./reducers/blogReducer";
import { setUser, resetUser } from "./reducers/loginReducer";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { initUsers } from "./reducers/usersReducer";

const ResponsiveGrid = ({ children, areas, ...props }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Grid areas={areas[size]} {...props}>
      {children}
    </Grid>
  );
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [newUserVisible, setNewUserVisible] = useState(false);
  // const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  // rerender blog list whenever the URL field changes, i.e. when the field is reset on submit
  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
  }, [notification, dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));

      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const theme = deepMerge({
    global: {
      font: {
        family: "Roboto",
        size: "18px",
        height: "20px"
      },
      breakpoints: {
        small: {
          value: 900
        },
        desktop: { value: 1500 }
      }
    }
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification("Logged in"));

      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials"));
    }
  };

  const handleCreateUser = async () => {
    try {
      console.log(name);

      await loginService.newUser({
        username,
        name,
        password
      });

      dispatch(setNotification("New user created"));

      setUsername("");
      setPassword("");
      setName("");
    } catch (exception) {
      dispatch(setNotification("Error"));
    }
  };

  const userHandler = (event) => {
    event.preventDefault();
    setNewUserVisible(true);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(resetUser());
    dispatch(setNotification("Logged out"));

    setUsername("");
    setPassword("");
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();

      dispatch(createBlog(blogObject));

      dispatch(setNotification(`"${blogObject.title}" has been added`));
    } catch (exception) {
      dispatch(setNotification("Error posting blog"));
    }
  };

  const updateLikes = async (blog) => {
    try {
      // note that by putting notifications first, clicks to update likes may not register when rapidly clicking,
      // yet if patch is done first, notifcation timeout will take longer than 5 seconds
      // this most likely would not be an issue if using a faster, production connection to mongodb?

      dispatch(resetNotification());
      dispatch(voteBlog(blog.id, blog.likes));
      dispatch(
        setNotification(
          `"${blog.title}" has been updated to ${blog.likes + 1} likes`
        )
      );
    } catch (exception) {
      dispatch(setNotification("Error updating blog"));
    }
  };

  const welcomeUser = () => (
    <Box align="center">
      <div
        style={{
          marginBottom: "1rem"
        }}
      >
        <h2>Welcome {user.name}</h2>
      </div>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </Box>
  );

  const blogList = () => (
    <div>
      <h2
        style={{
          marginBottom: ".5rem",
          padding: "1rem",
          width: "20rem"
        }}
      >
        Blogs:
      </h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Card
            style={{
              marginBottom: ".5rem",
              padding: "1rem",
              width: "20rem"
            }}
          >
            <CardContent>
              <div key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  const blogFormRef = useRef();

  return (
    <Grommet theme={theme}>
      <ResponsiveContext.Consumer>
        {(size) => (
          <ResponsiveGrid
            responsive={true}
            rows={["xsmall", "auto", "auto"]}
            columns={["auto", "auto"]}
            gap="small"
            areas={{
              small: [
                { name: "nav", start: [0, 0], end: [1, 0] },
                { name: "login", start: [0, 1], end: [1, 1] },
                { name: "blogs", start: [0, 2], end: [1, 2] }
              ],
              desktop: [
                { name: "nav", start: [0, 0], end: [1, 0] },
                { name: "login", start: [0, 1], end: [0, 1] },
                { name: "blogs", start: [1, 1], end: [1, 1] }
              ]
            }}
          >
            <Router>
              <Box gridArea="nav">
                <Nav />
                {notification !== null && (
                  <Notification notification={notification} />
                )}
              </Box>
              <Box gridArea="login" align="center">
                {user === null && (
                  <>
                    <Login
                      handleLogin={handleLogin}
                      username={username}
                      setUsername={setUsername}
                      password={password}
                      setPassword={setPassword}
                    />
                    {newUserVisible === true && (
                      <NewUser
                        newUserVisible={newUserVisible}
                        setNewUserVisible={setNewUserVisible}
                        handleCreateUser={handleCreateUser}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        setName={setName}
                        name={name}
                      />
                    )}
                    <Button onClick={userHandler}>Sign Me Up!</Button>
                  </>
                )}
                {user !== null && welcomeUser()}
                {user !== null && (
                  <Togglable buttonLabel="Post Blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                  </Togglable>
                )}
              </Box>
              <Box gridArea="blogs" align="center" alignContent="center">
                {/* <Router> */}
                <Switch>
                  <Route path="/users/:id">
                    <User users={users} />
                  </Route>
                  <Route path="/users">
                    <Users users={users} />
                  </Route>
                  <Route path="/blogs/:id">
                    <BlogDetails blogs={blogs} updateLikes={updateLikes} />
                  </Route>
                  <Route path="/">{blogList()}</Route>
                </Switch>
                {/* </Router> */}

                {/* {user !== null && <BlogTable blogs={blogs} />} */}
              </Box>
            </Router>
          </ResponsiveGrid>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default App;
