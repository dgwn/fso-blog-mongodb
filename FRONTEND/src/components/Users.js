import React from "react";
import { Link } from "react-router-dom";

import { DataTable, Text, Box, Meter } from "grommet";

const Users = (users) => {
  const data = users.users.map((user) => ({
    name: user.name,
    id: user.id,
    blogs: user.blogs.length
  }));

  return (
    <div>
      <DataTable
        columns={[
          {
            property: "name",
            header: <Text>User</Text>,
            primary: true,
            render: (user) => <Link to={`/users/${user.id}`}>{user.name}</Link>
          },
          {
            property: "blogs",
            header: "Number of Blogs"
          }
        ]}
        data={data}
      />
    </div>
  );
};

export default Users;
