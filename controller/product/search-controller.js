const header_list = document.querySelector(".header__nav-list");
const header_nav = document.querySelector(".header__nav");
const mediaqueryList = window.matchMedia("(max-width: 575px)");
let search_value = "";

const addNewLine = (search_value) => {
  const linea = document.createElement("div");
  linea.classList.add("search-wrapper");
  linea.setAttribute("id", "search-wrapper1");
  const contenido = `                    
    <input class="search-home search-input" id="search-input" type="text" placeholder="¿Qué deseas Buscar?" onkeypress="Enter(event)">
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

  const search = document.querySelector("#search-wrapper1");

  if (search !== null) {
    search_value = search.querySelector(".search-input").value;

    const padre = search.parentNode;

    padre.removeChild(search);

    console.log(search_value);
    if (search_value.length != 0) {
        search.querySelector(".search-input").value = search_value;
    }
  }

  return linea;
};

if (mediaqueryList.matches) {
  const newLine = addNewLine();
  header_nav.appendChild(newLine);
} else {
  const newLine = addNewLine();
  header_list.appendChild(newLine);
}

mediaqueryList.addListener((EventoMediaQueryList) => {
  if (EventoMediaQueryList.matches) {
    const newLine = addNewLine(search_value);
    header_nav.appendChild(newLine);
  } else {
    const newLine = addNewLine(search_value);
    header_list.appendChild(newLine);
  }
});

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
