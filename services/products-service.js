// LISTAR LOS DATOS
const listProducts = () =>
  fetch("http://localhost:3000/products")
    .then((respuesta) => respuesta.json())
    .catch((error) => alert(error));

// CREAR DATOS
const crearProducto = (name, price, category, description, imageURL, id) => {
  return fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  name, price, category, description, imageURL, id}),
  });
};

// MOSTRAR DATOS A EDITAR
const detalleProducto = (id) => {
  return fetch(`http://localhost:3000/products/${id}`).then((respuesta) =>
    respuesta.json()
  );
};
// EDITAR LOS DATOS INGRESADOS
const actualizarProducto = (id, name, price, category, description, imageURL) => {
  return fetch(`http://localhost:3000/products/${id}`, {
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
  return fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });
};


// EXPORTAR LAS FUNCIONES ANÓNIMAS
export const productService = {
  listProducts,
  crearProducto,
  detalleProducto,
  actualizarProducto,
  eliminarProducto
};
