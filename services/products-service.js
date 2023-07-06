// - LISTAR A LOS USUARIOS
const listUsers = () =>{
  return fetch("https://64a6171400c3559aa9c056d8.mockapi.io/profile").then(respuesta =>{
      return respuesta.json();
  });
};


//!  LISTAR LOS DATOS
const listProducts = () =>
  fetch("https://64a6171400c3559aa9c056d8.mockapi.io/products")
    .then((respuesta) => respuesta.json())
    .catch((error) => alert(error));

//! CREAR DATOS
const crearProducto = (name, price, description, imageURL,  category, id) => {
  return fetch("https://64a6171400c3559aa9c056d8.mockapi.io/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  name, price, description, imageURL, category, id}),
  });
};

//!  MOSTRAR DATOS A EDITAR
const detalleProducto = (id) => {
  return fetch(`https://64a6171400c3559aa9c056d8.mockapi.io/products/${id}`).then((respuesta) =>
    respuesta.json()
  );
};
// EDITAR LOS DATOS INGRESADOS
const actualizarProducto = (id, name, price, category, description, imageURL) => {
  return fetch(`https://64a6171400c3559aa9c056d8.mockapi.io/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price, category, description, imageURL }),
  })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

//PARA ELIMINAR EL PRODUCTO SELECCIONADO
const eliminarProducto = (id) => {
  return fetch(`https://64a6171400c3559aa9c056d8.mockapi.io/products/${id}`, {
    method: "DELETE",
  });
};

// ! ========== FUNCION PARA MOSTRAR EL SWEET ALERT ====================
const MostrarMensaje = (titulo, mensaje, tipo) => {
  Swal.fire(titulo, mensaje, tipo);
};


export const userServices = {
  listUsers,  
  MostrarMensaje,
}

//! EXPORTAR LAS FUNCIONES ANÓNIMAS
export const productService = {
  listProducts,
  crearProducto,
  detalleProducto,
  actualizarProducto,
  eliminarProducto,
  MostrarMensaje
};
