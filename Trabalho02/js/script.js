let amigos = document.querySelector(".lista-amigos");

function listaAmigos(){

    let amigo = document.createElement("div");
    let nave = document.createElement("nav");
    let lista = document.createElement("ul");
    let item = document.createElement("li");
    let texto = document.createTextNode(amigo1);
    let link = document.createElement("a");
    link.setAttribute("href");

    item.appendChild(link & texto);
    lista.appendChild(item);
    nave.appendChild(lista);
    amigo.appendChild(nave);
    amigo.classList.add("amigo");
    listaAmigos.appendChild(amigo);


    // let amigo = document.createElement("div");
    // // let avatar = document.createElement("img src="../img/amigo.png"");
    // let span1 = document.createElement("span");
    // let text1 = document.createTextNode(nome);

    // span1.appendChild(text1);
    // amigo.appendChild(span1);
    // amigo.classList.add("amigo");
    // listaAmigos.appendChild(amigo);
}

let entrar = document.querySelector(".entrar");

entrar.addEventListener("click",function(){
    // event.preventDefault();
    listaAmigos();
});