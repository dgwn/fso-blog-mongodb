import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";

import ModeToggle from "@/components/mode-toggle";

const Nav = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "3rem",
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "0",
        padding: "10px"
      }}
    >
      <NavigationMenu className="w-full max-w-screen">
        <NavigationMenuList>
          {/* Blogs Navigation Item */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="/">
                <h2>Blogs</h2>
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Users Navigation Item */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="/users">
                <h2>Users</h2>
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Mode Toggle */}
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Nav;
