import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
interface IMessage {
  statusCode?: string;
  message: string;
  title?: string;
  timer?: number;
}

export const successAlert = () => {
  MySwal.fire({
    icon: "success",
    title: "Plantilla descargada exitosamente",
    showConfirmButton: false,
    timer: 2500,
  });
};

export const errorAlert = () => {
  MySwal.fire({
    icon: "error",
    title: "Problemas con el servidor.",
    text: "Inténtalo más tarde!",
    showConfirmButton: false,
    timer: 2500,
  });
};

export const successAlertResponseFile = (obj: any) => {
  MySwal.fire({
    icon: "success",
    title: "Se ha realizado la carga exitosamente",
    html:
      `Factores cargados: ${obj.OkProcess} <br/>` +
      `Factores no cargados: ${obj.NokProcess} <br/>` +
      `Total factores cargados: ${obj.Total} <br/>`,
    showConfirmButton: true,
    confirmButtonText: "OK",
  });
};

export const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});


export const SuccessToast = () => {
  Toast.fire({ icon: "success", title: "Signed in successfully" });
}