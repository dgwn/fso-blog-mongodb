import React, { useState, useImperativeHandle } from "react";
import { Box } from "grommet";
import { Button } from "@/components/ui/button";

import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <Box align="center" justify="center">
      <div style={hideWhenVisible}>
        <Button
          variant="secondary"
          onClick={toggleVisibility}
          margin={{ top: "small" }}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button variant="secondary" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </Box>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

Togglable.displayName = "Togglable";

export default Togglable;
