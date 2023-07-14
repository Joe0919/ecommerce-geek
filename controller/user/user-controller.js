import { userServices } from "../../services/products-service.js";


const formulario = document.querySelector("[data-form-login]");

formulario.addEventListener("submit", (evento) =>{
    evento.preventDefault();
    const email = document.querySelector("[data-login-email]").value;
    const password = document.querySelector("[data-login-psw]").value;

   userServices
    .listUsers()
    .then((respuesta) =>{
        const user = respuesta;


        for(let i = 0; i < user.length; i++){
            
            if(user[i].email == email && user[i].password == password){
                window.location.href = "../../view/products/";
                break;
            }else{
                userServices.MostrarMensaje("Error. No esta registrado","Verifique que el email y contraseña sean correctos","error");
            }
        }
    }).catch((err) => console.log(err));


});

