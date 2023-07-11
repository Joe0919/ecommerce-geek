import { productService } from "../../services/products-service.js";

const url = new URL(window.location);
const buscar_prod = url.searchParams.get("buscar");
const buscarlower = buscar_prod.toLocaleLowerCase();
//backticks
const crearNuevaLinea = (name, price, category, description, imageURL, id) => {
  const linea = document.createElement("div");
  linea.classList.add("resultados__product");
  const contenido = `
    <a href="../../view/products/description-product.html?id=${id}&category=${category}" class="resultado__link link-product">
        <div class="resultado__content-img">
            <img class="resultado__img" src="${imageURL}" alt="Imagen del Producto">
        </div>
        <div class="resultados_detalles">
            <p class="category_prod">${category}</p>
            <h1 class="nombre_prod">${name}</h1>
            <h5 class="precio_prod">$. ${price}</h5>
            <p class="descripcion_prod">${description}</p>
            <p class="link">Ver Producto <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
        </div>
        </a>
    `;

  linea.innerHTML = contenido;

  return linea;
};

const div = document.querySelector("[data-products]");
const input_search = document.querySelector("#search-input");

productService
  .listProducts()
  .then((data) => {
    data.forEach(({ name, price, category, description, imageURL, id }) => {
      const nombre = name.toLowerCase();

      if (nombre.includes(buscarlower)) {
        document.querySelector(".notfound").style.display = "none";
        document.querySelector(".resultados").style.display = "block";
        const nuevaLinea = crearNuevaLinea(
          name,
          price,
          category,
          description,
          imageURL,
          id
        );
        div.appendChild(nuevaLinea);
      }
    });
  })
  .catch((error) => alert("Hubo un error"));

input_search.value = buscar_prod;