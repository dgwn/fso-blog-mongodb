import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("http://");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("http://");
  };

  return (
    <form onSubmit={addBlog} id="blogForm">
      <div>
        <Input
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          placeholder="Title"
          id="titleInput"
        />
      </div>

      <div>
        <Input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          placeholder="Author"
          id="authorInput"
        />
      </div>

      <div>
        <Input
          value={newUrl}
          type="url"
          onChange={({ target }) => setNewUrl(target.value)}
          placeholder="URL"
          id="urlInput"
        />
      </div>

      <Button
        type="submit"
        margin={{ top: "small" }}
        style={{ marginLeft: "6rem" }}
      >
        Submit
      </Button>
    </form>
  );
};
export default BlogForm;
