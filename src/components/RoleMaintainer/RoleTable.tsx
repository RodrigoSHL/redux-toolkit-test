import React, { useEffect, useState } from "react";
//Reduxjs
import { useAppDispatch, useAppSelector } from "../../app/hooks";
//Mui
import {
  // Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
  Theme,
  IconButton,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
//Icon
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { getAllUsers, selectUsers } from "../../features/user/userSlice";
import styles from "./RoleMaintainer.module.css";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function RoleTable() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { listUsers: USERS }: any = useAppSelector(selectUsers);
  const menuTitle: string = "Mantenedor de Roles";

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERS.length) : 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={styles.content}>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          {menuTitle}
        </Typography>
      </Box>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeaderCell}>
                Información Usuario
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Información Trabajo
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Perfil Asignado
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? USERS.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : USERS
            ).map((row: any) => (
              <TableRow key={row.idUser}>
                <TableCell>
                  <Grid container>
                    <Grid item lg={2}>
                      <Avatar
                        alt={`${row.firstNameUser} ${row.lastNameUser}`}
                        src={row.avatar}
                        className={styles.avatar}
                      />
                    </Grid>
                    <Grid item lg={10}>
                      <Typography className={styles.name}>
                        {`${row.firstNameUser} ${row.lastNameUser}`}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {row.mailUser}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography color="primary" variant="subtitle2">
                    {row.displayNameUser}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {`${row.firstNameUser} ${row.lastNameUser}`}
                  </Typography>
                </TableCell>
                <TableCell>{row.idRole.nameRole}</TableCell>
                <TableCell>
                  <Typography
                    className={styles.status}
                    style={{
                      backgroundColor:
                        row.stateUser === true
                          ? "green"
                          : row.stateUser === null
                          ? "orange"
                          : row.stateUser === false
                          ? "red"
                          : "grey",
                    }}
                  >
                    {row.stateUser === true
                      ? "Activo"
                      : row.stateUser === null
                      ? "Pendiente"
                      : row.stateUser === false
                      ? "Inactivo"
                      : "Otro"}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                colSpan={5}
                count={USERS.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default RoleTable;
