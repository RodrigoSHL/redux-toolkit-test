import React, {useState, useEffect} from 'react';
import {
  Button,
  Modal,
  Box,
  Stack,
  Grid,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import moment from 'moment';
//Icon
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const status = [
  {value: 'Active', label: 'Active'},
  {value: 'Blocked', label: 'Blocked'},
  {value: 'Pending', label: 'Pending'},
];

const ModalRoleEdit = ({element}:any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [roleObject, setRoleObject] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    infoJob: '',
    joinDate: '',
    status: '',
  });

  const addDataInMemory = (e:any) => {
    const {name, value} = e.target;
    setRoleObject((prev) => ({...prev, [name]: value}));
  };

  const submitForm = async (e:any) => {
    e.preventDefault();
    console.log('role', roleObject);
    console.log('ModalRoleEdit.element:', element);
  };

  useEffect(() => {
    setRoleObject({
      first_name: element.first_name,
      last_name: element.last_name,
      email: element.email,
      phone: element.phone,
      infoJob: element.jobTitle,
      joinDate: moment().format('DD-MM-YYYY hh:mm:ss'),
      status: element.status,
    });
    // console.log('roleObject:', roleObject);
  }, []);

  return (
    <>
      <IconButton aria-label="edit" size="large" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar Roles
          </Typography>
          <Box component="form" onSubmit={submitForm} noValidate sx={{mt: 1}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar Nombre"
                  variant="outlined"
                  fullWidth
                  required
                  name="name"
                  onChange={addDataInMemory}
                  value={`${roleObject.first_name} ${roleObject.last_name}`}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar E-Mail"
                  variant="outlined"
                  fullWidth
                  required
                  name="email"
                  onChange={addDataInMemory}
                  value={roleObject.email}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar Teléfono"
                  variant="outlined"
                  fullWidth
                  required
                  name="phone"
                  onChange={addDataInMemory}
                  value={roleObject.phone}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar Cargo"
                  variant="outlined"
                  fullWidth
                  required
                  name="infoJob"
                  onChange={addDataInMemory}
                  value={roleObject.infoJob}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Fecha Ingreso"
                  variant="outlined"
                  fullWidth
                  required
                  name="joinDate"
                  onChange={addDataInMemory}
                  value={roleObject.joinDate}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar Estado"
                  variant="outlined"
                  fullWidth
                  select
                  required
                  name="status"
                  onChange={addDataInMemory}
                  value={roleObject.status}>
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Button type="submit" startIcon={<SaveIcon />} variant="outlined">
                    Guardar
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CloseIcon />}
                    onClick={handleClose}>
                    Cerrar
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalRoleEdit;
