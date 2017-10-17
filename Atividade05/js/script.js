let botao = document.querySelector(".bt");
let navLateral = document.querySelector(".nav-lateral");

function abrirOuFecharNav() {

    if (navLateral.style.display=="block"){
        fecharNav();
    }

    else {
        abrirNav();
    }
}

function abrirNav() {
    navLateral.style.display = "block";
}

function fecharNav() {
    navLateral.style.display = "none";
}

botao.addEventListener('click', function() {
    abrirOuFecharNav(); 
});