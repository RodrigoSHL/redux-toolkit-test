import { Box, Container, CssBaseline } from "@mui/material";
import React from "react";
import Table from "./Table";
import styles from "./Factors.module.css";

const Factors = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
            <Table/>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Factors;
