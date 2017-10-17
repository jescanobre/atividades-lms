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


let botaoAccordeon = document.querySelector(".botao-accordeon");
let conteudoAccordeon = document.querySelector(".conteudo-accordeon");

function conteudo() {
    if (conteudoAccordeon.style.animationName=="abrir-conteudo"){
        abrirConteudo();
    }
    else {
        fecharConteudo();
    }
}

function abrirConteudo() {
    conteudoAccordeon.style.animationName = "abrir-conteudo";
}

function fecharConteudo() {
    conteudoAccordeon.style.animationName = "fechar-conteudo";
}

botaoAccordeon.addEventListener("click", conteudo)