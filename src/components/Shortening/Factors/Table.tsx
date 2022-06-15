import { Alert, AlertProps, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import Filters from "./Filters";
import styles from "./Factors.module.css";
import {DataGrid,  esES,  GridCellEditCommitParams} from '@mui/x-data-grid';
import axios from "axios";
import DownloadButton from "./DownloadButton";
import { useAppDispatch } from "../../../app/hooks";
import { setOpenSnackbar } from "../../../features/snackbar/snackbarSlice";
import { errorColor, successColor } from "../../Middleware/Snackbar";

const api_rest = 'http://localhost:3001'

const Table = () => {
  const dispatch = useAppDispatch();
  const [clacomsList, setClacomsList] = useState<any>([]);
  const [clacomsFilterList, setClacomsFilterList] = useState<any>([]);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const columns = [
    {
      field: 'nameClacom',
      headerName: 'Descripción',
      width: 300
    },
    {
      field: 'codeClacom',
      headerName: 'Clacom',
      width: 230
    },
    {
      field: 'factorValue',
      headerName: 'Factor',
      type: 'number',
      editable: true,
      width: 230
    }
  ];

  const handleCellEditCommit = React.useCallback(
    async (params: GridCellEditCommitParams) => {
      try {
        const objFactor = {
          factorValue: params.value,
        };
        const url = `${api_rest}/api/factor/${params.id}`;
        await axios
          .put(url, objFactor)
          .then((response) => {
            const objSetting = {isOpen: true,message: 'Factor editado correctamente',severity: successColor,timeOut : 2000}
            dispatch(setOpenSnackbar(objSetting));   
          })
          .catch((error) => {
            const objSetting = {isOpen: true,message: error.message,severity: errorColor,timeOut : 2000}
            dispatch(setOpenSnackbar(objSetting));
          });
        setClacomsList((prev:any) => prev.map((row:any) => (row.id === params.id ? {...row} : row)));
      } catch (error) {
        setClacomsList((prev:any) => [...prev]);
      }
    },
    []
  );

  return (
    <Paper className={styles.content}>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Factores
        </Typography>
        <DownloadButton/>
      </Box>
      <Box className={styles.toolbar}>
        <Filters
          clacomsList={clacomsList}
          setClacomsList={setClacomsList}
          setClacomsFilterList={setClacomsFilterList}
          setFilterApplied={setFilterApplied}
        />
      </Box>
      <Box style={{height: '60vh', width: '100%'}}>
        <DataGrid
          rows={filterApplied ? clacomsFilterList : clacomsList}
          columns={columns}
          onCellEditCommit={handleCellEditCommit}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Paper>
  );
};

export default Table;
