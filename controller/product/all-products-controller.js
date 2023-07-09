import { productService } from "../../services/products-service.js";

//!  MUESTRA LOS DATOS EN LA WEB
const addNewLine = (name, price, category, imageURL, id) => {
  const linea = document.createElement("li");
  linea.classList.add("category__list-item");
  const contenido = `                    
    <a href="../../view/products/description-product.html?id=${id}&category=${category}">
    <div class="div-img">
        <img class="list__img" src="${imageURL}" alt="Foto de Producto"/>
    </div>
    <div class="div-caract">
        <p class="list__category"> ${category}</p>
        <h3 class="list__title titulo3">${name}</h3>
        <p class="list__price">$ ${price}</p>
    </div>
    <div class="list__icons">
        <span class="boton1 btn-primary"> Ver Producto
        <i class="fa-solid fa-eye"></i>
        </span>
    </div>
    </a>
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