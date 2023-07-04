import { productService } from "../../services/products-service.js";

// MUESTRA LOS DATOS EN LA WEB
const addNewLine = (name, price, imageURL, id) => {
  const linea = document.createElement("li");
  linea.classList.add("category__list-item");
  const contenido = `                    

    <div class="div-img">
        <img class="list__img" src="${imageURL}" alt="Foto de Producto">
    </div>
    <h3 class="list__title titulo3">${name}</h3>
    <p class="list__price">$ ${price}</p>
    <a class="link list__boton link" href="#">Ver Producto</a>
    <div class="list__icons">
    <i class="fa-solid fa-pen btn-editar" title="Editar"></i>
    <i class="fa-solid fa-trash btn-delete" title="Eliminar"></i>
    </div>
    <input class="id-product" name="id-product" type="hidden" value="${id}">
      `;
  linea.innerHTML = contenido;
  return linea;
};

// AGREGA LA LINEA DE CODIGO AL ELEMENTO PADRE
const list = document.querySelector("[data-product]");

productService
  .listProducts()
  .then((data) => {
    data.forEach((product) => {
      const newLine = addNewLine(
        product.name,
        product.price,
        product.imageURL,
        product.id
      );
      list.appendChild(newLine);
    });
  })
  .catch((error) => alert("Ocurrió un error"));

// CREACIÓN E INSERCIÓN DE NUEVOS DATOS EN EL DB.JSON
const formulario = document.querySelector("[data-form-productC]"); //FORMULARIO DEL MODAL CREATE
// buttonSubmit.disabled = true;

const modal = document.querySelector(".main-modal"); // MODAL
const modalE = document.querySelector(".main-modalE"); // MODAL

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
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
        .crearProducto(id, name, price, category, description, newimageURL)
        .then(() => {
          window.location.href = "../../view/products/create-success.html";
        })
        .catch((err) => console.log(err));
    }
  });
});

// OBTENER Y MOSTRAR DATOS A ACTUALIZAR
const obtenerInformacion = async (id) => {
  formularioE.reset();

  // const id = document.querySelector(".id-product").value;
  if (id === null) {
    MostrarMensaje("Error", "Algo salió mal al cargar los datos", "error");
  }

  const name = document.querySelector("[data-nameE]");
  const price = document.querySelector("[data-priceE]");
  const category = document.querySelector("[data-categoryE]");
  const description = document.querySelector("[data-descriptionE]");
  const idinput = document.querySelector("[data-idE]");
  try {
    const product = await productService.detalleProducto(id);

    if (product.name && product.price && product.category) {
      name.value = product.name;
      price.value = product.price;
      category.value = product.category;
      description.value = product.description;
      idinput.value = id;

      modalE.classList.remove("fadeOut");
      modalE.classList.add("fadeIn");
      modalE.style.display = "flex";
    } else {
      throw new Error();
    }
  } catch (error) {
    MostrarMensaje("Error", "Algo salió mal al actualizar los datos", "error");
  }
};

// FUNCION PARA MOSTRAR EL SWEET ALERT
function MostrarMensaje(titulo, mensaje, tipo) {
  Swal.fire(titulo, mensaje, tipo);
}

const formularioE = document.querySelector("[data-form-productE]"); //FORMULARIO DEL MODAL EDICION

formularioE.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const name = document.querySelector("[data-nameE]").value;
  const price = document.querySelector("[data-priceE]").value;
  const category = document.querySelector("[data-categoryE]").value;
  const description = document.querySelector("[data-descriptionE]").value;
  const id = document.querySelector("[data-idE]").value;

  console.log(name);
  console.log(price);
  console.log(category);
  console.log(description);
  console.log(id);

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
        .actualizarProducto(id, name, price, category, description)
        .then(() => {
          window.location.href = "../../view/products/update-success.html";
        })
        .catch((err) => console.log(err));
    }
  });
});

// ACCIONES QUE SE REALIZAN CUANDO SE CARGA TODO EL DOM
window.addEventListener("load", () => {
  // REALIZAMOS UNA DELEGACIÓN DE EVENTOS PARA LOS BOTONES DE EDICIÓN Y BORRADO DE PRODUCTOS
  list.addEventListener("click", (e) => {
    if (
      e.target &&
      e.target.tagName === "I" &&
      e.target.classList[2] === "btn-editar"
    ) {
      let idinput = e.target.closest("li").lastElementChild.value;
      obtenerInformacion(idinput);
    } else if (
      e.target &&
      e.target.tagName === "I" &&
      e.target.classList[2] === "btn-delete"
    ) {
      alert("boton eliminar");
    }
  });
});
