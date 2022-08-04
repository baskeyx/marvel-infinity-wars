import Swal from 'sweetalert2'

const SweetAlert2 = (message) => {
  Swal.fire({
    text: message,
    confirmButtonText: 'Ok'
  })
}

export default SweetAlert2;
