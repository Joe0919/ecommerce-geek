import { productService } from "../../services/products-service.js";



const addNewLine = (name, price, imageURL, id) => {
  const linea = document.createElement("li");
  linea.classList.add("category__list-item");
  const contenido = `                    

    <div class="div-img">
        <img class="list__img" src="${imageURL}" alt="Foto de Producto">
    </div>
    <h3 class="list__title titulo3">${name}</h3>
    <p class="list__price">$ ${price}</p>
    <a class="link list__boton link" href="">Ver Producto</a>
    <div class="list__icons">
        <i class="fa-solid fa-pen" title="Editar"></i><i class="fa-solid fa-trash"
            title="Eliminar"></i>
    </div>
      `;
  linea.innerHTML = contenido;
  return linea;
};

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

const formulario = document.querySelector("[data-form-product]");
// buttonSubmit.disabled = true;

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const category = document.querySelector("[data-category]").value;
  const description = document.querySelector("[data-description]").value;

  const imageURL = document.querySelector("[data-file]").value;
  const newimageURL = "";
  const nameimage = document.querySelector("[data-file]").files[0].name;
  const extimage = nameimage.split(".").pop();

  const id = uuid.v4();

  const modal = document.querySelector(".main-modal");

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
      // File destination.txt will be created or overwritten by default.
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
        .crearProducto(name, price, category, newimageURL, description)
        .then(() => {
          evento.preventDefault();
          modal.classList.remove("fadeIn");
          modal.classList.add("fadeOut");

          modal.style.display = "none";

          Swal.fire(
            "!Hecho¡",
            "Los datos del producto fueron guardados",
            "success"
          );
        })
        .catch((err) => console.log(err));
    }
  });
});
