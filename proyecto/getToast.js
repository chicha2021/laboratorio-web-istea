export const showToast = (message, color) => {
  const toast = document.getElementById('toast');
  if(color === 'success') {
    toast.classList.add("bg-success", "text-white");
  } else if (color === 'danger') {
    toast.classList.add("bg-danger", "text-white");
  }
  toast.querySelector('.toast-body').textContent = message;
  const bsToast = new bootstrap.Toast(toast, {
    delay: 3000
  });
  bsToast.show();
}