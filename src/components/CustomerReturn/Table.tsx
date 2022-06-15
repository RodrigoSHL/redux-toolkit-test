import React, { useState } from "react";
import {
  Alert,
  AlertProps,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  IconButton,
  Snackbar,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Filters from "./Filters";
import moment from "moment";
//Icon
import FunctionsIcon from "@mui/icons-material/Functions";
import CheckIcon from "@mui/icons-material/Check";
import DownloadIcon from "@mui/icons-material/Download";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

//Excel
import * as XLSX from "xlsx";

import styles from "./CustomerReturn.module.css";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const CustomerReturnTable = () => {
  const [dataList, setDataList] = useState<any>([]);
  const [clacomsFilterList, setClacomsFilterList] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // console.log('dataList::', dataList);
  /* Constantes de Excel  */
  const nameFileExcel =
    "devolucionCliente_" + moment().format("YYYYMMDD_hhmmss");

  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExportExcel = () => {
    console.log("entra.dataList::", dataList);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dataList);
    XLSX.utils.book_append_sheet(wb, ws, "Devolucion Cliente");
    XLSX.writeFile(wb, `${nameFileExcel}.xlsx`);
  };

  return (
    <Paper className={styles.content}>
      <div className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Devolución Cliente
        </Typography>
      </div>
      <div className={styles.toolbar}>
        <Filters
          dataList={dataList}
          setDataList={setDataList}
          clacomsFilterList={clacomsFilterList}
          setClacomsFilterList={setClacomsFilterList}
          filterApplied={filterApplied}
          setFilterApplied={setFilterApplied}
        />
      </div>
      {/* <div style={{height: '60vh', width: '100%'}}> */}
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeaderCell} colSpan={7}>
                Venta Producto
              </TableCell>
            </TableRow>
            <TableRow>
              {/* <TableCell className={styles.tableHeaderCell}>Factor Periodo 1</TableCell>
              <TableCell className={styles.tableHeaderCell}>Factor Periodo 2</TableCell> */}
              <TableCell className={styles.tableHeaderCell}></TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Factor Promedio
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Monto a Considerar
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Indice Periodo
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Provision Acumulada
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? dataList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : dataList
            ).map((row: any) => (
              <TableRow key={row.id}>
                {/* <TableCell>{row.factorPeriod1}</TableCell>
                <TableCell>{row.factorPeriod2}</TableCell> */}
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.factorAverage}</TableCell>
                <TableCell>{row.AmountToConsider}</TableCell>
                <TableCell>{row.IndexPeriod}</TableCell>
                <TableCell>{row.AccumulatedProvision}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, {label: 'Todos', value: -1}]}
                colSpan={7}
                count={dataList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter> */}
        </Table>
      </TableContainer>

      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={3000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      {/* </div> */}
      <Box>
        <Grid classes={styles.center}>
          <Stack direction="row" spacing={4}>
            <Grid item xs={4}>
              <Button
                color="primary"
                variant="contained"
                sx={{ borderRadius: 8, minWidth: "110px", ml: 2 }}
                startIcon={<FunctionsIcon />}
              >
                Calcular
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                color="primary"
                variant="outlined"
                sx={{ borderRadius: 8, minWidth: "110px", ml: 1 }}
                startIcon={<CheckIcon />}
              >
                Autorizar
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                onClick={handleExportExcel}
                color="primary"
                variant="outlined"
                sx={{ borderRadius: 8, minWidth: "110px", ml: 1 }}
                startIcon={<DownloadIcon />}
              >
                Exportar XLSX
              </Button>
            </Grid>
          </Stack>
        </Grid>
      </Box>
    </Paper>
  );
};
export default CustomerReturnTable;
