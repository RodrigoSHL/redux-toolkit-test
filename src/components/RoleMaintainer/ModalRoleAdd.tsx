import {Button, Modal, Box, Grid, MenuItem, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';

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

const countries = [
  {value: 'CL', label: 'CL'},
  {value: 'PE', label: 'PE'},
  {value: 'BRA', label: 'BRA'},
  {value: 'ARG', label: 'ARG'},
];

const companies = [{value: '1', label: 'IKS'}];

const stores = [
  {value: '1', label: 'Falabella'},
  {value: '2', label: 'Sodimac'},
  {value: '3', label: 'Linio'},
  {value: '4', label: 'Tottus'},
];

const ModalRoleAdd = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [factor, setFactor] = useState({
    company: '',
    country: '',
    store: '',
    clacom: '',
    factor: '',
  });

  const addDataInMemory = (e:any) => {
    const {name, value} = e.target;
    setFactor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e:any) => {
    e.preventDefault();
    console.log('factor', factor);
  };

  return (
    <>
      <Button onClick={handleOpen} color="primary" startIcon={<AddBoxIcon />}>
        Nuevo Factor
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nuevo Rol
          </Typography>
          <Box component="form" onSubmit={submitForm} noValidate sx={{mt: 1}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar país"
                  variant="outlined"
                  fullWidth
                  required
                  select
                  name="country"
                  onChange={addDataInMemory}
                  value={factor.country}>
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar unidad de negocio"
                  variant="outlined"
                  fullWidth
                  required
                  select
                  name="company"
                  onChange={addDataInMemory}
                  value={factor.company}>
                  {companies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar tienda"
                  variant="outlined"
                  fullWidth
                  select
                  required
                  name="store"
                  onChange={addDataInMemory}
                  value={factor.store}>
                  {stores.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar clacom"
                  variant="outlined"
                  fullWidth
                  required
                  name="clacom"
                  onChange={addDataInMemory}
                  value={factor.clacom}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar factor"
                  variant="outlined"
                  fullWidth
                  required
                  name="factor"
                  onChange={addDataInMemory}
                  value={factor.factor}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" sx={{mt: 2, mb: 2}}>
                  Guardar
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}>
                  Cerrar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalRoleAdd;
