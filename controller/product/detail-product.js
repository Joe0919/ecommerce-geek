import { productService } from "../../services/products-service.js";

const url = new URL(window.location);
const id = url.searchParams.get("id");
const cate = url.searchParams.get("category");

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
                <p>Home > ${category} </p>
            </div>
            <div class="description__product">
                <img class="description__product-photo" src="${imageURL}" alt="Foto de Producto ">
                <div class="description__product-info">
                    <h3 class="info__category">${category} </h3>
                    <h1 class="info__name">${name} </h1>
                    <h2 class="info__price">
                        <span class="desct"></span>
                        <b class="price-now">$. ${price} </b>
                        <span class="price-previous"></span>
                    </h2>
                    <h3 class="info__title-desc">Descripcion del producto: </h3>
                    <p class="info__desc">${description}</p>
                    <div class="info__butons">
                        <div class="size-config">
                            <span>Cantidad: </span>
                            <div class="size">
                                <div class="inc button"><i class="fa-solid fa-plus"></i></div>
                                <div id="size-wrapper">
                                    <input type="text" name="" id="size" value="1">
                                </div>
                                <div class="dec button"><i class="fa-solid fa-minus"></i></div>
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
  .detalleProducto(id)
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
  .catch((error) => alert(error));

const crearSimilares = (name, price, category, imageURL, id) => {
  const linea2 = document.createElement("li");
  linea2.classList.add("category__list-item");
  const contenido = `                    
    
        <div class="div-img">
            <img class="list__img" src="${imageURL}" alt="Foto de Producto">
        </div>
        <div class="div-caract">
          <p class="list__category"> ${category}</p>
          <h3 class="list__title titulo3">${name}</h3>
          <p class="list__price">$ ${price}</p>
          
        </div>
        <div class="list__icons">
        <a href="../../view/products/description-product.html?id=${id}&category=${category}">
          <i class="fa-solid fa-eye btn-ver"></i>
        </a>
        <i class="fa-solid fa-pen btn-editar" title="Editar"></i>
        <i class="fa-solid fa-trash btn-delete" id="${id}" title="Eliminar"></i>
        </div>
        <input class="id-product" name="id-product" type="hidden" value="${id}">
          `;

  linea2.innerHTML = contenido;

  // Puedes colocar aca los eventos al cargar el DOM

  return linea2;
};

const section_similares = document.querySelector("[data-product]");

productService
  .listProducts()
  .then((data) => {
    data.forEach((product) => {
      const newLine = crearSimilares(
        product.name,
        product.price,
        product.category,
        product.imageURL,
        product.id
      );
      section_similares.appendChild(newLine);
    });
  })
  .catch((error) => console.log(error));
