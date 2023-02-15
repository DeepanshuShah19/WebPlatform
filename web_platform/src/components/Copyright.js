import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "@material-ui/core";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {". "}
      <Link color="inherit" href="http://semper8.com/">
        Semper8 International
      </Link>{" "}
    </Typography>
  );
};

export default Copyright;
