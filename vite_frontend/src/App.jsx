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
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

// Reducers
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
  // Existing login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // New signup state
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");

  const [newUserVisible, setNewUserVisible] = useState(false);

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
      toast("Logged in");

      setUsername("");
      setPassword("");
    } catch (exception) {
      toast("Wrong credentials");
    }
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    try {
      await loginService.newUser({
        username: signupUsername,
        name: signupName,
        password: signupPassword
      });

      toast("New user created");

      // Clear signup form
      setSignupUsername("");
      setSignupPassword("");
      setSignupName("");
      setNewUserVisible(false);
    } catch (exception) {
      toast("Error");
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
    toast("Logged out");

    setUsername("");
    setPassword("");
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();

      dispatch(createBlog(blogObject));

      toast(`"${blogObject.title}" has been added`);
    } catch (exception) {
      toast("Error posting blog");
    }
  };

  const updateLikes = async (blog) => {
    try {
      // note that by putting notifications first, clicks to update likes may not register when rapidly clicking,
      // yet if patch is done first, notifcation timeout will take longer than 5 seconds
      // this most likely would not be an issue if using a faster, production connection to mongodb?

      dispatch(voteBlog(blog.id, blog.likes));
      toast(`"${blog.title}" has been updated to ${blog.likes + 1} likes`);
    } catch (exception) {
      toast("Error updating blog");
    }
  };

  const welcomeUser = () => (
    <div align="center" style={{ maxWidth: "20rem", margin: "auto" }}>
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
    </div>
  );

  const blogList = () => (
    <div className="w-full max-w-full">
      <h2 className="mb-2 p-4">Blogs:</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Card className="mb-2 p-4 w-full">
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
    <Router>
      <div>
        <Nav />
      </div>
      {notification !== null && <Notification notification={notification} />}
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
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
                  signupUsername={signupUsername}
                  setSignupUsername={setSignupUsername}
                  signupPassword={signupPassword}
                  setSignupPassword={setSignupPassword}
                  signupName={signupName}
                  setSignupName={setSignupName}
                />
              )}
              <Button onClick={userHandler}>Sign Me Up!</Button>
            </>
          )}
          {user !== null && welcomeUser()}
          {user !== null && (
            <div style={{ marginTop: "1rem" }}>
              <Togglable buttonLabel="Post Blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
            </div>
          )}
        </div>
        <div className="w-full max-w-screen-lg mx-auto px-4 text-center">
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
        </div>
      </div>
    </Router>
  );
};

export default App;
