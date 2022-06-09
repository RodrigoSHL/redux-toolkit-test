import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  openSnackbar,
  selectSnackbar,
} from "../../features/snackbar/snackbarSlice";
import { Alert } from "@mui/material";

export default function SimpleSnackbar() {
  const objSnackbar = useAppSelector(selectSnackbar);
  const dispatch = useAppDispatch();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    const objSetting = {
      isOpen: false,
      message: objSnackbar.message,
      severity: objSnackbar.severity,
      timeOut : objSnackbar.timeOut
    }
    dispatch(openSnackbar(objSetting));
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={objSnackbar.isOpen}
        autoHideDuration={objSnackbar.timeOut}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity={objSnackbar.severity} sx={{ width: "100%" }}>
        {objSnackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
