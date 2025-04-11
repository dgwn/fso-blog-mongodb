import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BlogTable = ({ blogs }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: "#3f51b5" }}>
          <TableRow>
            <TableCell align="left" style={{ color: "white" }}>
              Title
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Author
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              URL
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.title}>
              <TableCell component="th" scope="row">
                {blog.title}
              </TableCell>
              <TableCell align="right">{blog.author}</TableCell>
              <TableCell align="right">{blog.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogTable;
