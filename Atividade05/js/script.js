let botao = document.querySelector(".bt");
let navLateral = document.querySelector(".nav-lateral");
let container = document.querySelector(".container");
let cabecalho = document.querySelector(".cabecalho");

botao.addEventListener ("click", function(){
    navLateral.classList.toggle("active");
    container.classList.toggle("active");
    cabecalho.classList.toggle("active");
});

let botoesAccordeon = document.querySelectorAll(".accordeon .item-accordeon .botao-accordeon");
let conteudosAccordeon = document.querySelectorAll(".accordeon .item-accordeon .conteudo-accordeon");

for (let i=0; i<botoesAccordeon.length; i++){
    botoesAccordeon[i].addEventListener("click", function(){
        if(conteudosAccordeon[i].classList.contains("active")) {
            conteudosAccordeon[i].classList.remove("active");

            conteudosAccordeon[i].style.maxHeight = "0px";
        }
        else { 
            conteudosAccordeon.forEach(function(e){
                e.classList.remove("active");
                e.style.maxHeight = "0px";
            })
            conteudosAccordeon[i].classList.add("active");
            
            conteudosAccordeon[i].style.maxHeight = conteudosAccordeon[i].scrollHeight + "px";
        }
    })
}