const header_list = document.getElementById("header__nav-list");
const header_nav = document.getElementById("header__nav");
const mediaqueryList = window.matchMedia("(max-width: 575px)");
let search_value = "";

const addNewLine = (search_value) => {
  const linea = document.createElement("div");
  linea.classList.add("search-wrapper");
  linea.setAttribute("id", "search-wrapper1");
  const contenido = `                    
    <input class=" search-input" id="search-input" type="text" placeholder="¿Qué deseas Buscar?" onkeypress="Enter(event)">
    <button class="btn-search" title="Buscar" id="btn-search">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            class="feather feather-search" viewBox="0 0 24 24">
            <defs></defs>
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
        </svg>
    </button>
      `;
  linea.innerHTML = contenido;

  return linea;
};


//Dibujamos el campo de busqueda dependiendo el tamaño especificado de la pantalla
if (mediaqueryList.matches) {
  const newLine = addNewLine();
  header_nav.appendChild(newLine);
} else {
  const newLine = addNewLine();
  header_list.appendChild(newLine);
}

// al cambiar el tamaño de pantalla va moviendo el div de la busqueda a un diferente div
mediaqueryList.addListener((EventoMediaQueryList) => {
  const search = document.getElementById("search-wrapper1");
  if (EventoMediaQueryList.matches) {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(search);
    header_nav.appendChild(fragment);
  } else {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(search);
    header_list.appendChild(fragment);
  }
});


const btn_search = document.querySelector("#btn-search");
const input_search = document.querySelector("#search-input");

// Redirijimos segun sea la pagian en que nos encontramos
btn_search.addEventListener("click", () => {
  if (input_search.value.length != 0) {
    const buscador = input_search.value;
    if (input_search.closest('.home')) { //verificamos si estamos en la pag de Inicio
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
      if (input_search.closest('.home')) {
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
