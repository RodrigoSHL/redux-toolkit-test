import { Box, Container, CssBaseline } from "@mui/material";
import React from "react";
import styles from "./Resume.module.css";
import Table from "./Table";

const Resume = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
            <Table />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Resume;
