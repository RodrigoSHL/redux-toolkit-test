import { Box, Container, CssBaseline } from "@mui/material";
import React from "react";
import Table from "./Table";

const Factors = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box component="main" mt={6} sx={{ flexGrow: 1, p: 3 }}>
            <Table/>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Factors;
