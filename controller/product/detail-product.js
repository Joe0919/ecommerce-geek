import { productService } from "../../services/products-service.js";

const url = new URL(window.location);
const idp = url.searchParams.get("id");
const cate = url.searchParams.get("category");
const cont_similares = document.getElementById("cont-similares");
let contador = 0;

//backticks
const crearLineaDescripcion = (
  name,
  price,
  category,
  description,
  imageURL
) => {
  const linea = document.createElement("div");

  const contenido = `
            <div class="description__header">
                <p class="enlace-desc">
                  <a href="../../index.html">Home</a> > 
                  <a href="../products/all-products.html">Productos</a> > 
                  ${category}
                </p>
            </div>
            <div class="description__product">
                <img class="description__product-photo" src="${imageURL}" alt="Foto de Producto ">
                <div class="description__product-info">
                    <h3 class="info__category">${category} </h3>
                    <h1 class="info__name">${name} </h1>
                    <h2 class="info__price">
                        <span class="desct"></span>
                        <b class="price-now black">$. ${price} </b>
                        <span class="price-previous"></span>
                    </h2>
                    <h3 class="info__title-desc black">Descripcion del producto: </h3>
                    <p class="info__desc">${description}</p>
                    <div class="info__butons">
                        <div class="size-config">
                            <span>Cantidad: </span>
                            <div class="size" >
                                <div class="dec button"><i class="fa-solid fa-minus ico"></i></div>
                                <div id="size-wrapper">
                                    <input type="text" name="" id="size" value="1">
                                </div>
                                <div class="inc button"><i class="fa-solid fa-plus ico"></i></div>
                            </div>
                        </div>
                        <div class="butons">
                            <a class="boton btn-warning buton__buy-now" href="#">
                                <i class="fa-solid fa-cash-register btn-i"></i>
                                Comprar ahora
                            </a>
                            <a class="boton btn-danger buton__car" href="#">
                                <i class="fa-solid fa-cart-shopping btn-i"></i>
                                Añadir al carrito
                            </a>
                        </div>
                        <a href="../../index.html" class="boton btn-primary">
                            <i class="fa-solid fa-house btn-i"></i>
                            Ir a Inicio</a>
                    </div>
                </div>
            </div>
    `;

  linea.innerHTML = contenido;

  return linea;
};

const section_detail = document.querySelector("[data-detail]");

productService
  .detalleProducto(idp)
  .then((data) => {
    const newLine = crearLineaDescripcion(
      data.name,
      data.price,
      data.category,
      data.description,
      data.imageURL
    );
    section_detail.appendChild(newLine);
  })
  .catch((error) => console.log(error));

const crearSimilares = (name, price, category, imageURL, id) => {
  const linea2 = document.createElement("div");
  linea2.classList.add("card");
  linea2.classList.add("swiper-slide");
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

  linea2.innerHTML = contenido;

  // Puedes colocar aca los eventos al cargar el DOM

  return linea2;
};

const section_similares = document.querySelector("[data-similares]");
//+ Agregamos productos similares
productService
  .listProducts()
  .then((data) => {
    data.forEach(({ name, price, category, imageURL, id }) => {
      if (cate == category) {
        if (id != idp) {
          contador++;
            const newLine = crearSimilares(name, price, category, imageURL, id);
            section_similares.appendChild(newLine);
        }
      }
    });
    if (contador == 0) {
      cont_similares.style.display="none";
    }else{
      cont_similares.style.display="block";
    }
  })
  .catch((error) => console.log(error));

//! ========== ACCIONES QUE SE REALIZAN CUANDO SE CARGA TODO EL DOM
window.addEventListener("load", () => {
  //! ========== REALIZAMOS UNA DELEGACIÓN DE EVENTOS PARA LOS BOTONES DE EDICIÓN Y BORRADO DE PRODUCTOS

  section_detail.addEventListener("click", (e) => {
    let elemento = e.target;
    let elementoTag = e.target.tagName;
    let val = 0;
    let input = "";

    if (
      (elemento &&
        elementoTag === "DIV" &&
        elemento.classList[1] == "button") ||
      (elementoTag === "I" && elemento.classList[2] == "ico")
    ) {
      input = elemento.closest(".size").children[1].children[0];
      val = Number(input.value);

      if (
        elemento.classList[0] === "inc" ||
        elemento.classList[1] == "fa-plus"
      ) {
        val = val + 1;
      } else {
        if (val > 0) {
          val = val - 1;
        } else {
          val = 0;
        }
      }
      input.value = val;
    }

    // if (elemento && (elementoTag === "DIV" || elementoTag === "I") &&
    // (elemento.classList[0] === "inc" || elemento.classList[1] == "fa-plus")) {

    //   input = elemento.closest('.size').children[1].children[0]

    //   val =  Number(input.value)

    //   val = val + 1;

    //   input.value = val;

    // }else if(elemento && (elementoTag === "DIV" || elementoTag === "I") &&
    // (elemento.classList[0] === "dec" || elemento.classList[1] == "fa-minus")){

    //   input = elemento.closest('.size').children[1].children[0]

    //   val =  Number(input.value)

    //   if (val > 0) {
    //     val = val - 1;
    //   }else{
    //   val = 0;
    //   }

    //   input.value = val;
    // }
  });
});
