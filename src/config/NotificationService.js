import Swal from "sweetalert2";

export const notifySuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
};

export const notifyError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    timer: 2500,
    showConfirmButton: false,
  });
};