import { Alert, AlertTitle, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const ErrorAlert = (props) => {
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={8000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity="error"
        onClose={handleClose}
        sx={{ width: "100%", bgcolor: "background.paper" }}
      >
        <AlertTitle>{props.title || "Error"}</AlertTitle>
        {props.msg}
      </Alert>
    </Snackbar>
  );
};

ErrorAlert.propTypes = {
  msg: PropTypes.string,
  title: PropTypes.string,
};

export default ErrorAlert;
