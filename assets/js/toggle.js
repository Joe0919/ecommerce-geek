window.addEventListener("load", () => {
  const inputs = document.querySelectorAll(".contacto__form-input");

  inputs.forEach(function (input) {
    input.addEventListener("blur", () => {
      if (input.value) {
        input.classList.add("used");
      } else {
        input.classList.remove("used");
      }
    });
  });
  const toggleSwitch = document.querySelector("#checkbox_theme");
  
  //todo: función que cambia el tema y establece una variable localStorage para rastrear el tema entre cargas de página
  const switchTheme = (e) => {
    if (e.target.checked) {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
      toggleSwitch.checked = true;
      document.getElementById("toggle").classList.add("dark");
      document.getElementById("toggle__btn").classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
      toggleSwitch.checked = false;
      document.getElementById("toggle").classList.remove("dark");
      document.getElementById("toggle__btn").classList.remove("dark");
    }
  };
  
  const enviarMensaje = (e) => {
    Swal.fire("¡Hecho!", "El mensaje fue enviado", "success");
  };
  
  //listener for changing themes
  toggleSwitch.addEventListener("change", switchTheme, false);
  
  // const boton = document.querySelector("#boton-form");
  // boton.addEventListener("click", enviarMensaje);
  
  //# marca previamente la casilla de verificación de tema oscuro si el tema oscuro está configurado
  if (document.documentElement.getAttribute("data-theme") == "dark") {
    toggleSwitch.checked = true;
    document.getElementById("toggle").classList.add("dark");
    document.getElementById("toggle__btn").classList.add("dark");
    // document.getElementById("img1").src = "assets/img/logo2.png";
  }
});

//todo: Inicializamos el elemento switch
