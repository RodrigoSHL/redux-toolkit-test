import { Box, Container, CssBaseline, Paper, Typography } from "@mui/material";
import React from "react";
import TabOptions from "./TabOptions";
import styles from "./Maintainers.module.css";

const index = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
            <Paper>
              <TabOptions />
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default index;
