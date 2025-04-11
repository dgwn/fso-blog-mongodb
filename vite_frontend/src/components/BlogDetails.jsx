import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setNotification,
  resetNotification
} from "../reducers/notificationReducer";
import { voteBlog, removeBlog, commentBlog } from "../reducers/blogReducer";
import TextField from "@mui/material/TextField";

import { Box, Card, CardHeader, CardBody, CardFooter } from "grommet";
import { Button } from "@/components/ui/button";
import { Heart, Trash } from "lucide-react";

const BlogDetails = (blogs) => {
  const id = useParams().id;
  const blog = blogs.blogs.find((n) => n.id === id);
  const getId = () => (100000 * Math.random()).toFixed(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const [newComment, setNewComment] = useState("");

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

  const postComment = async (event) => {
    try {
      event.preventDefault();
      dispatch(resetNotification());
      dispatch(setNotification("comment has been added"));
      dispatch(commentBlog(blog.id, blog.comments, newComment));

      setNewComment("");
    } catch (exception) {
      dispatch(setNotification("Error adding comment"));
    }
  };

  const deleteBlog = async (blog) => {
    try {
      // await blogService.remove(blog.id);
      await dispatch(removeBlog(blog.id));
      history.push("/");
      dispatch(setNotification(`The blog has been deleted`));
    } catch (exception) {
      dispatch(
        setNotification(
          "Error deleting blog. You must be logged in as the blog's creator"
        )
      );
    }
  };

  return (
    <div className="blog">
      {blog && (
        <Card height="auto" width="medium" background="light-3" margin="10px">
          <CardHeader pad="medium">
            <h2>
              &quot;{blog.title}&quot; - {blog.author}
            </h2>
          </CardHeader>
          <CardBody pad="medium" gap="none" background="light-1">
            <p>{blog.url}</p>
            <p>added by {blog.user.name}</p>
            <h3>Comments:</h3>
            <ul>
              {blog.comments.map((comment) => (
                <li key={getId()}>{comment}</li>
              ))}
            </ul>
            <form onSubmit={postComment} id="blogForm">
              <Box direction="row" justify="around">
                <div>
                  <TextField
                    value={newComment}
                    onChange={({ target }) => setNewComment(target.value)}
                    label="Comment"
                    id="commentInput"
                  />
                </div>
                <Button type="submit" margin={{ top: "small" }}>
                  Submit
                </Button>

                <br />
                <br />
              </Box>
            </form>
          </CardBody>
          <CardFooter pad={{ horizontal: "medium" }} background="light-2">
            <Button onClick={() => updateLikes(blog)}>
              <Heart />
            </Button>
            <p>{blog.likes} Likes</p>
            <Button
              onClick={() => {
                if (window.confirm("Do you really want to remove this blog?")) {
                  deleteBlog(blog);
                }
              }}
            >
              <Trash />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default BlogDetails;
