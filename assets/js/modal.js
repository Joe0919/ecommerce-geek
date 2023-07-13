

const closeButton = document.querySelector("#close-button");
const cancelButton = document.querySelector("#cancel-button");

const formulario = document.querySelector("[data-form-productC]");


const openModal = () => {
  formulario.reset();
  document.getElementById("box__imagen").style.backgroundImage = "url('../../assets/img/no-img-photo.jpg')";
  document.querySelector("#labelarchivo").innerHTML = 'Selecciona una foto...'
};

// for (let i = 0; i < closeButton.length; i++) {
//   const elements = closeButton[i];

//   elements.onclick = (e) => modalClose();

//   modal.style.display = "none";
//   // modalE.style.display = 'none';

//   // window.onclick = function (event) {
//   // 	if (event.target == modal) modalClose();
//   // }
// }
// for (let i = 0; i < closeButtonE.length; i++) {
//   const elementsE = closeButtonE[i];

//   elementsE.onclick = (e) => modalCloseE();

//   modalE.style.display = "none";
//   // modalE.style.display = 'none';

//   // window.onclick = function (event) {
//   // 	if (event.target == modalE) modalCloseE();
//   // }
// }
