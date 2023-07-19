        
function detectColorScheme() {
    var theme = "light";    //default to light

    //el almacenamiento local se usa para anular la configuración del tema del sistema operativo
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark") {
            var theme = "dark";
        }
    } else if (!window.matchMedia) {
        //método matchMedia no compatible
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //Configuración del tema del sistema operativo detectada como oscura
        var theme = "dark";
    }

    //Se prefiere el tema oscuro, establezca el documento con un atributo `data-theme`
    if (theme == "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }
}
detectColorScheme();