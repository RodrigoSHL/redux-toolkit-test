import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    username: "",
  });

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel label="Administrador" control={<Checkbox />} />
      <FormControlLabel label="Lector" control={<Checkbox />} />
    </Box>
  );

  return (
    <>
      <Container maxWidth="sm">
        <Box className={styles.container}>
          <Box className={styles.containetTable}>
            <Box className={styles.paper}>
              <Avatar className={styles.avatar}>
                <AccountCircleIcon sx={{fontSize:100}} />
              </Avatar>
              <Typography className={styles.title} component="h1" variant="h5">
                Perfil de usuario
              </Typography>
              <form className={styles.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      disabled={true}
                      name="fullName"
                      variant="outlined"
                      fullWidth
                      label={"Nombre de usuario completo"}
                      value={user.fullName}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <TextField
                      disabled={true}
                      name="username"
                      value={user.username}
                      variant="outlined"
                      fullWidth
                      label={"Nombre de usuario corto"}
                    />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <TextField
                      disabled={true}
                      name="email"
                      value={user.email}
                      variant="outlined"
                      fullWidth
                      label={"Correo electrónico"}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      disabled={true}
                      name="fullName"
                      variant="outlined"
                      fullWidth
                      label={"Perfil asignado"}
                      value={user.fullName}
                    />
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserProfile;
