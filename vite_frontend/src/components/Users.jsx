import React from "react";
import { Link } from "react-router-dom";

// import { DataTable, Text, Box, Meter } from "grommet";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const Users = (users) => {
  const data = users.users.map((user) => ({
    name: user.name,
    id: user.id,
    blogs: user.blogs.length
  }));

  return (
    <div>
      <Table aria-label="simple table" className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">User</TableHead>
            <TableHead className="text-center">Number of Blogs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.name}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
