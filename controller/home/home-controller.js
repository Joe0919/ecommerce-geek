import { productService } from "../../services/products-service.js";
//backticks
const crearNuevaLinea = (name, price, category, imageURL, id) => {
  const linea = document.createElement("div");
  linea.classList.add("card");
  linea.classList.add("swiper-slide");
  const contenido = `                    
        <a href="../../view/products/description-product.html?id=${id}&category=${category}"
            class="link-product">
            <div class="image-content">

                <img src="${imageURL}" alt="Foto de producto" />
            </div>

            <div class="card-content">
                <div class="name-job">
                    <h3 class="name">${name}</h3>
                    <h4 class="job">$. ${price}</h4>
                    <p class="link">Ver Producto <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
                </div>
            </div>
        </a>
          `;

  linea.innerHTML = contenido;

  // Puedes colocar aca los eventos al cargar el DOM

  return linea;
};

const starwars = "Star Wars";
const consolas = "Consolas";
const diversos = "Diversos";

const section_product1 = document.querySelector("[data-product-1]");
const section_product2 = document.querySelector("[data-product-2]");
const section_product3 = document.querySelector("[data-product-3]");

let cont_sw = 0;
let cont_cl = 0;
let cont_dv = 0;

productService
  .listProducts()
  .then((data) => {
    data.forEach(({ name, price, category, imageURL, id }) => {
      //   if (screen.width > 768) {
      if (category === starwars) {
        const nuevaLinea = crearNuevaLinea(name, price, category, imageURL, id);
        section_product1.appendChild(nuevaLinea);
      }
      if (category === consolas ) {
        const nuevaLinea = crearNuevaLinea(name, price, category, imageURL, id);
        section_product2.appendChild(nuevaLinea);
      }
      if (category === diversos) {
        const nuevaLinea = crearNuevaLinea(name, price, category, imageURL, id);
        section_product3.appendChild(nuevaLinea);
      }
      //   }
    });
  })
  .catch((error) => console.log(error));
