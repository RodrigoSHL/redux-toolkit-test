import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Filters from "./Filters";
import styles from "./Factor.module.css";

const Table = () => {
  const [clacomsList, setClacomsList] = useState<any>([]);
  const [clacomsFilterList, setClacomsFilterList] = useState<any>([]);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  
  return (
    <Paper className={styles.content}>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Factores
        </Typography>
      </Box>
      <Box className={styles.toolbar}>
        <Filters
          clacomsList={clacomsList}
          setClacomsList={setClacomsList}
          setClacomsFilterList={setClacomsFilterList}
          setFilterApplied={setFilterApplied}
        />
      </Box>
    </Paper>
  );
};

export default Table;
