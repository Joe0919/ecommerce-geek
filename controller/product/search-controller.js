const btn_search = document.querySelector("#btn-search");
const input_search = document.querySelector("#search-input");

btn_search.addEventListener("click", () => {
  if (input_search.value.length != 0) {
    const buscador = input_search.value;
    if (input_search.classList[0] == "search-home") {
      window.location.href = `view/products/results.html?buscar=${buscador}`;
    } else {
      window.location.href = `../../view/products/results.html?buscar=${buscador}`;
    }
  } else {
    input_search.focus();
    alert("Debe llenar el campo");
  }
});

function Enter(event) {
  if (event.code === "Enter") {
    if (input_search.value.length != 0) {
      const buscador = input_search.value;
      if (input_search.classList[0] == "search-home") {
        window.location.href = `view/products/results.html?buscar=${buscador}`;
      } else {
        window.location.href = `../../view/products/results.html?buscar=${buscador}`;
      }
    } else {
      input_search.focus();
      alert("Debe llenar el campo");
    }
  }
}
