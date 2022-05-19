import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const successAlert = () => {
  MySwal.fire({
    icon: 'success',
    title: 'Plantilla descargada exitosamente',
    showConfirmButton: false,
    timer: 2500,
  });
};

export const errorAlert = () => {
  MySwal.fire({
    icon: 'error',
    title: 'Problemas con el servidor.',
    text: 'Inténtalo más tarde!',
    showConfirmButton: false,
    timer: 2500,
  });
};

export const successAlertResponseFile = (obj: any) => {
  MySwal.fire({
    icon: 'success',
    title: 'Se ha realizado la carga exitosamente',
    html:
      `Factores cargados: ${obj.OkProcess} <br/>` +
      `Factores no cargados: ${obj.NokProcess} <br/>` +
      `Total factores cargados: ${obj.Total} <br/>`,
    showConfirmButton: true,
    confirmButtonText: 'OK',
  });
};
