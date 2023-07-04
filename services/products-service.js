const listProducts = () =>
  fetch("http://localhost:3000/products")
    .then((respuesta) => respuesta.json())
    .catch((error) => alert(error));

const crearProducto = (id, name, price, category, imageURL,description) => {
  return fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name, price, category, imageURL, description}),
  });
};

export const productService = {
  listProducts,
  crearProducto,
};
