// $(window, document, undefined).ready(function () {
//   $(".contacto__form-input").blur(function () {
//     var $this = $(this);
//     if ($this.val()) $this.addClass("used");
//     else $this.removeClass("used");
//   });
// });

window.addEventListener("load", () => {
  const inputs = document.querySelectorAll(".contacto__form-input");

  inputs.forEach(function (input) {

    input.addEventListener("blur", () => {
        if (input.value) {
            input.classList.add("used")
        } else {
            input.classList.remove("used")  
        }
    });

  });
});
