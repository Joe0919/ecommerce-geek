import { productService } from "../../services/products-service.js";

//!  MUESTRA LOS DATOS EN LA WEB
const addNewLine = (name, price, category, imageURL, id) => {
  const linea = document.createElement("li");
  linea.classList.add("category__list-item");
  const contenido = `                    

    <div class="div-img">
        <img class="list__img" src="${imageURL}" alt="Foto de Producto">
    </div>
    <div class="div-caract">
      <p class="list__category"> ${category}</p>
      <h3 class="list__title titulo3">${name}</h3>
      <p class="list__price">$ ${price}</p>
      
    </div>
    <div class="list__icons prod">
    <a href="../../view/products/description-product.html?id=${id}&category=${category}">
      <i class="fa-solid fa-eye btn-ver"></i>
    </a>
    <i class="fa-solid fa-pen btn-editar" title="Editar"></i>
    <i class="fa-solid fa-trash btn-delete" id="${id}" title="Eliminar"></i>
    </div>
    <input class="id-product" name="id-product" type="hidden" value="${id}">
      `;

  linea.innerHTML = contenido;

  // Puedes colocar aca los eventos al cargar el DOM

  return linea;
};

//!  AGREGA LA LINEA DE CODIGO AL ELEMENTO PADRE
const list = document.querySelector("[data-product]");

productService
  .listProducts()
  .then((data) => {
    data.forEach((product) => {
      const newLine = addNewLine(
        product.name,
        product.price,
        product.category,
        product.imageURL,
        product.id
      );
      list.appendChild(newLine);
    });
  })
  .catch((error) => alert("Ocurrió un error"));

// + CONTROLADOR DE CREACIÓN

const inputFileImage = document.querySelector("#input__imagen");
// const inputFileImageE = document.querySelector("#input__imagenE");
const labelFileImage = document.querySelector("#labelarchivo");

let imagen = "";

inputFileImage.addEventListener("change", cargar);

function cargar(ev) {
  let arch = new FileReader();
  arch.readAsDataURL(ev.target.files[0]);
  /*imagen = ev.target.files[0];*/
  arch.addEventListener("load", leer);
}

function leer(ev) {
  document.getElementById("box__imagen").style.backgroundImage =
    "url('" + ev.target.result + "')";
  imagen = ev.target.result;
  let nombreArchivo = inputFileImage.files[0].name;
  if (labelFileImage.value != "") {
    labelFileImage.innerHTML = nombreArchivo;
  } else {
    labelFileImage.innerHTML = "Selecciona una foto...";
  }

  // document
  //   .querySelector(".archivo__faltante")
  //   .parentElement.classList.remove("input__invalido");
}

//! ============ < CREACIÓN E INSERCIÓN DE NUEVOS DATOS EN EL DB.JSON >
const formulario = document.querySelector("[data-form-productC]"); //FORMULARIO DEL MODAL CREATE
// buttonSubmit.disabled = true;

const modal = document.querySelector(".main-modal"); // MODAL
const modalE = document.querySelector(".main-modalE"); // MODAL

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!imagen) {
    productService.MostrarMensaje(
      "Advertencia",
      "Es obligatorio elegir una foto",
      "warning"
    );
  } else {
    const name = document.querySelector("[data-name]").value;
    const price = formatearPrice(document.querySelector("[data-price]").value);
    const category = document.querySelector("[data-category]").value;
    const description = document.querySelector("[data-description]").value;
    const idinput = document.querySelector("[data-id]").value;

    if (idinput.length == 0) {
      // Se crea
      //! ============ ACCION PARA LA INSERCIÓN DE LOS DATOS =================
      console.log("Se crea :" + idinput);

      // const id = uuid.v4();

      Swal.fire({
        title: "¿Estás seguro?",
        text: "Guardar los datos ingresados",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, guardar",
      }).then((result) => {
        if (result.isConfirmed) {
          productService
            .crearProducto(name, price, description, imagen,  category)
            .then((response) => {

              if (response.status < 500 && response.status >= 400) {
                productService.MostrarMensaje("Archivo muy grande","Elija una imagen menos pesada.","error");
              } else {
                window.location.href = "../../view/products/create-success.html";
              }
            })
            .catch((err) => console.log(err));
        }
      });
    } else {
      // Se edita
      //! ============ ACCION PARA LA EDICION DE LOS DATOS =================
      console.log("Se edita :" + idinput);

      Swal.fire({
        title: "¿Estás seguro?",
        text: "Actualizar con los datos ingresados",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, editar",
      }).then((result) => {
        if (result.isConfirmed) {
          productService
            .actualizarProducto(idinput, name, price, category, description, imagen)
              .then((response) => {

                if (response.status < 500 && response.status >= 400) {
                  productService.MostrarMensaje("Archivo muy grande","Elija una imagen menos pesada.","error");
                } else {
                  window.location.href = "../../view/products/update-success.html";
                }
            })
            .catch((err) => console.log(err));
        }
      });
    }
  }
});

//! ========== OBTENER Y MOSTRAR DATOS A ACTUALIZAR ============
const obtenerInformacion = async (id) => {
  formulario.reset();

  // const id = document.querySelector(".id-product").value;
  if (id === null) {
    productService.MostrarMensaje("Error", "No hay ID", "error");
  }

  const name = document.querySelector("[data-name]");
  const price = document.querySelector("[data-price]");
  const category = document.querySelector("[data-category]");
  const description = document.querySelector("[data-description]");
  const idinput = document.querySelector("[data-id]");
  const imagenDiv = document.querySelector(".agregar__imagen-div");

  try {
    const product = await productService.detalleProducto(id);

    if (product.name && product.category && product.imageURL) {
      name.value = product.name;
      price.value = product.price;
      category.value = product.category;
      description.value = product.description;
      imagen = product.imageURL;
      idinput.value = id;

      imagenDiv.style.backgroundImage = `url("${product.imageURL}")`;

      modal.classList.remove("fadeOut");
      modal.classList.add("fadeIn");
      modal.style.display = "flex";
      console.log(imagen);
    } else {
      throw new Error();
    }
  } catch (error) {
    productService.MostrarMensaje("Error", error + "", "error");
    console.log(error);
  }
};

// ! FUncion que formatea el precio ingresado
const formatearPrice = (price) => {
  let newprice = "";
  let array = price.split(".");

  if (array.length == 2) {
    let decimal = array[1] + "";
    if (decimal.length == 1) {
      newprice = price + "0";
    } else if (decimal == "") {
      newprice = price + "00";
    } else {
      newprice = price;
    }
  } else {
    newprice = price + ".00";
  }

  return newprice;
};

//! ========== ACCIONES QUE SE REALIZAN CUANDO SE CARGA TODO EL DOM
window.addEventListener("load", () => {
  //! ========== REALIZAMOS UNA DELEGACIÓN DE EVENTOS PARA LOS BOTONES DE EDICIÓN Y BORRADO DE PRODUCTOS
  list.addEventListener("click", (e) => {
    if (
      // si el icono es Editar
      e.target &&
      e.target.tagName === "I" &&
      e.target.classList[2] === "btn-editar"
    ) {
      let idinput = e.target.closest("li").lastElementChild.value;
      obtenerInformacion(idinput);
    } else if (
      // si el icono es Borrar
      e.target &&
      e.target.tagName === "I" &&
      e.target.classList[2] === "btn-delete"
    ) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Eliminar los datos del producto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          const id = e.target.id;
          productService
            .eliminarProducto(id)
            .then((respuesta) => {
              console.log(respuesta);
              window.location.reload();
            })
            .catch((err) => console.log(err));
        }
      });
    }
  });
});
