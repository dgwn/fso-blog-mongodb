import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { voteBlog, removeBlog, commentBlog } from "../reducers/blogReducer";
import { Input } from "@/components/ui/input";

import { Box } from "grommet";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Heart, Trash } from "lucide-react";
import { Toast } from "grommet-icons";

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

      dispatch(voteBlog(blog.id, blog.likes));
      toast(`"${blog.title}" has been updated to ${blog.likes + 1} likes`);
    } catch (exception) {
      toast("Error updating blog");
    }
  };

  const postComment = async (event) => {
    try {
      toast("comment has been added");
      setNewComment("");
      dispatch(commentBlog(blog.id, blog.comments, newComment));
    } catch (exception) {
      toast("Error adding comment");
    }
  };

  const deleteBlog = async (blog) => {
    try {
      // await blogService.remove(blog.id);
      await dispatch(removeBlog(blog.id));
      history.push("/");
      toast(`The blog has been deleted`);
    } catch (exception) {
      toast("Error deleting blog. You must be logged in as the blog's creator");
    }
  };

  return (
    <div className="blog">
      {blog && (
        <Card>
          <CardHeader>
            <h2>
              &quot;{blog.title}&quot; - {blog.author}
            </h2>
          </CardHeader>
          <CardContent>
            <p>{blog.url}</p>
            <p>added by {blog.user.name}</p>
            <h3>Comments:</h3>
            <ul>
              {blog.comments.map((comment) => (
                <li key={getId()}>{comment}</li>
              ))}
            </ul>
            <form onSubmit={postComment} id="blogForm">
              <div>
                <div>
                  <Input
                    value={newComment}
                    onChange={({ target }) => setNewComment(target.value)}
                    placeholder="Comment"
                    id="commentInput"
                  />
                </div>
                <Button type="submit" margin={{ top: "small" }}>
                  Submit
                </Button>

                <br />
                <br />
              </div>
            </form>
          </CardContent>
          <CardFooter className="blogFooter">
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
