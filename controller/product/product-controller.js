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

//! ============ < CREACIÓN E INSERCIÓN DE NUEVOS DATOS EN EL DB.JSON >
const formulario = document.querySelector("[data-form-productC]"); //FORMULARIO DEL MODAL CREATE
// buttonSubmit.disabled = true;

const modal = document.querySelector(".main-modal"); // MODAL
const modalE = document.querySelector(".main-modalE"); // MODAL

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("[data-name]").value;
  const price = formatearPrice(document.querySelector("[data-price]").value);
  const category = document.querySelector("[data-category]").value;
  const description = document.querySelector("[data-description]").value;

  const imageURL = document.querySelector("[data-file]").value;
  const newimageURL = "../../assets/img/console6.png";
  const nameimage = document.querySelector("[data-file]").files[0].name;
  const extimage = nameimage.split(".").pop();

  const id = uuid.v4();

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
      // Copiar y guardar la foto del producto

      // fs.copyFile(imageURL, "../../assets/img/", (err) => {
      //   if (err) throw err;
      //   console.log("se copio");
      // });

      // fs.rename(
      //   "../../assets/img/" + nameimage,
      //   "../../assets/img/" + id + "." + extimage,
      //   (err) => {
      //     if (err) throw err;
      //     console.log("se renombro");
      //   }
      // );

      // newimageURL = "../../assets/img/" + id + "." + extimage;

      productService
        .crearProducto(name, price, description, newimageURL, category, id)
        .then(() => {
          window.location.href = "../../view/products/create-success.html";
        })
        .catch((err) => console.log(err));
    }
  });
});

//! ========== OBTENER Y MOSTRAR DATOS A ACTUALIZAR ============
const obtenerInformacion = async (id) => {
  formularioE.reset();

  // const id = document.querySelector(".id-product").value;
  if (id === null) {
    productService.MostrarMensaje(
      "Error",
      "Algo salió mal al cargar los datos",
      "error"
    );
  }

  const name = document.querySelector("[data-nameE]");
  const price = document.querySelector("[data-priceE]");
  const category = document.querySelector("[data-categoryE]");
  const description = document.querySelector("[data-descriptionE]");
  const imageURL = document.querySelector("[data-imageE]");
  const idinput = document.querySelector("[data-idE]");
  try {
    const product = await productService.detalleProducto(id);

    if (product.name && product.price && product.category && product.imageURL) {
      name.value = product.name;
      price.value = product.price;
      category.value = product.category;
      description.value = product.description;
      imageURL.value = product.imageURL;
      idinput.value = id;

      modalE.classList.remove("fadeOut");
      modalE.classList.add("fadeIn");
      modalE.style.display = "flex";
    } else {
      throw new Error();
    }
  } catch (error) {
    productService.MostrarMensaje(
      "Error",
      "Algo salió mal al actualizar los datos",
      "error"
    );
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
    } else {
      newprice = price + "00";
    }
  } else {
    newprice = price + ".00";
  }

  return newprice;
};

//! ============ ACCION PARA LA EDICION DE LOS DATOS =================
const formularioE = document.querySelector("[data-form-productE]"); //FORMULARIO DEL MODAL EDICION

formularioE.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const id = document.querySelector("[data-idE]").value;
  const name = document.querySelector("[data-nameE]").value;
  const price = formatearPrice(document.querySelector("[data-priceE]").value);
  const category = document.querySelector("[data-categoryE]").value;
  const description = document.querySelector("[data-descriptionE]").value;
  const imageURL = document.querySelector("[data-imageE]").value;

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
        .actualizarProducto(id, name, price, category, description, imageURL)
        .then(() => {
          window.location.href = "../../view/products/update-success.html";
        })
        .catch((err) => console.log(err));
    }
  });
});

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
