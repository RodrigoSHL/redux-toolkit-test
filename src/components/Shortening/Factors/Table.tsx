import { Alert, AlertProps, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import Filters from "./Filters";
import styles from "./Factors.module.css";
import {DataGrid,  esES,  GridCellEditCommitParams} from '@mui/x-data-grid';
import axios from "axios";
import DownloadButton from "./DownloadButton";
import { useAppDispatch } from "../../../app/hooks";
import { setOpenSnackbar } from "../../../features/snackbar/snackbarSlice";
import { AlertColor } from "@mui/material";

const api_rest = 'http://localhost:3001'

const severityColor:AlertColor = 'warning'

const Table = () => {
  const dispatch = useAppDispatch();
  const [clacomsList, setClacomsList] = useState<any>([]);
  const [clacomsFilterList, setClacomsFilterList] = useState<any>([]);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const columns = [
    {
      field: 'nameClacom',
      headerName: 'Descripción',
      width: 300,
    },
    {
      field: 'codeClacom',
      headerName: 'Clacom',
      width: 230,
    },
    {
      field: 'factorValue',
      headerName: 'Factor',
      type: 'number',
      editable: true,
      width: 230,
    }
  ];

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

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
            setSnackbar({
              children: 'Factor editado correctamente',
              severity: 'success',
            });
          })
          .catch((error) => {
            setSnackbar({
              children: error.message,
              severity: 'error',
            });
          });
        clacomsList((prev:any) => prev.map((row:any) => (row.id === params.id ? {...row} : row)));
      } catch (error) {
        clacomsList((prev:any) => [...prev]);
      }
    },
    []
  );

  const testing = (e:any) => {
    e.preventDefault();
    const objSetting = {
      isOpen: true,
      message: 'Hola probando objetos setting',
      severity: severityColor,
      timeOut : 6000
    }
    dispatch(setOpenSnackbar(objSetting))
  }

  return (
    <Paper className={styles.content}>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Factores
        </Typography>
        <Button onClick={testing} variant="contained">Contained</Button>

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
