import {
  Alert,
  AlertProps,
  Box,
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Snackbar,
  Typography,
} from '@mui/material';
import React, {useState} from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import styles from "./Factors.module.css";

import axios from 'axios';
import {LoadingButton} from '@mui/lab';

const api_rest = 'http://localhost:3001'


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalUploadFile = ({anchorEl, setAnchorEl}:any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [uploadFile, setUploadFile] = useState<any>();
  const [showFileName, setShowFileName] = useState(false);
  const [responseFileUploaded, setResponseFileUploaded] = useState<any>({});

  const [showLoadingButton, setShowLoadingButton] = useState(false);

  const clearFile = () => {
    setUploadFile('');
    setShowFileName(false);
  };

  const submitFile = async (e:any) => {
    e.preventDefault();
    setShowLoadingButton(true);
    uploadFile && setShowFileName(true);
    if (!uploadFile) {
      setSnackbar({
        children: 'No ha seleccionado ningún archivo',
        severity: 'error',
      });
      handleClose();
      setShowLoadingButton(false);
      return;
    }
    let currentFile = uploadFile[0];
    const formData = new FormData();
    formData.append('file', currentFile);
    await axios
      .post(`${api_rest}/api/upload-download-excel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('response', response);
        handleClose();
        setAnchorEl(null)
      })
      .catch((error) => {
        console.log('error', error);
        handleClose();
        setAnchorEl(null)
      });
  };

  console.log('responseFileUploaded', responseFileUploaded);

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <UploadFileIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>Importar Factores</ListItemText>
      </MenuItem>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={3000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Carga masiva de factores comerciales
          </Typography>
          <Box component="form" onSubmit={submitFile} noValidate sx={{mt: 1}}>
            <Grid container spacing={2}>
              <Grid item xs={12} className={styles.center}>
                <input
                  className={styles.input}
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => {
                    setUploadFile(e.target.files);
                    setShowFileName(true);
                  }}
                  accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                />
                <label htmlFor="contained-button-file">
                  <Button
                    sx={{width: '100%'}}
                    size="large"
                    color="secondary"
                    variant="contained"
                    component="span"
                    startIcon={<UploadFileIcon fontSize="large" />}>
                    Subir Archivo
                  </Button>
                </label>
              </Grid>
              {showFileName && (
                <Grid item xs={12} className={styles.center}>
                  <label htmlFor="name-file">Archivo cargado en memoria...</label>
                  <IconButton onClick={clearFile} aria-label="delete" size="small">
                    <ClearIcon fontSize="inherit" />
                  </IconButton>
                </Grid>
              )}
              {showLoadingButton ? (
                <Grid item xs={12} className={styles.center}>
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined">
                    Cargando Archivo en Sistema
                  </LoadingButton>
                </Grid>
              ) : (
                <Grid item xs={12} className={styles.buttonModal}>
                  <Button type="submit" fullWidth variant="contained">
                    Cargar
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                    sx={{marginLeft: 2}}>
                    Cerrar
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalUploadFile;
