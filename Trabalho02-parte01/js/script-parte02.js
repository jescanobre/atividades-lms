let grupoNomeId = { };

let sof = document.querySelector(".nome-software");
sof.addEventListener("click", function(){
    let divMensagens = document.getElementsByClassName("mensagens")[0];
    divMensagens.innerHTML = " ";
});

let listaMensagens = document.querySelector(".mensagens");

function mostrarMensagens(usuario, mensagem) {
    let itemLista = document.createElement("li");
    usuario = document.createTextNode(usuario);
    mensagem = document.createTextNode(mensagem);

    itemLista.appendChild(usuario);
    itemLista.appendChild(mensagem);
    listaMensagens.appendChild(itemLista);
}

let xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function() {
    if (xhttp2.readyState == 4){
        let obj_parsed = JSON.parse(xhttp2.responseText);
        console.log(obj_parsed);

        for (let i = 0; i<obj_parsed.length; i++){
            mostrarMensagens(obj_parsed[i].userName, obj_parsed[i].message);
        }
    }
}

let listaGrupos = document.querySelector(".lista-amigos");
listaGrupos = listaGrupos.getElementsByTagName("ul")[0];

function mostrarGrupo(nomeGrupo, grupoId) {
    let itemLista = document.createElement("li");
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "meuLink"); //mudar o nome dessa classe 
    let avatar = document.createElement("img");
    avatar.src = "img/amigo.png";        
    let nome = document.createTextNode(nomeGrupo);

    link.appendChild(avatar);
    link.appendChild(nome);
    // link.grupoId = grupoNomeId[nome];
    link.addEventListener ("click", function (){
        xhttp2.open('GET','http://rest.learncode.academy/api/mariajesca/' + grupoId, true);
        xhttp2.send();
    }, false);
    itemLista.appendChild(link);
    listaGrupos.appendChild(itemLista);
}

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4){
        let obj_parsed = JSON.parse(xhttp.responseText);

        for (let i = 0; i<obj_parsed.length; i++){
            mostrarGrupo(obj_parsed[i].groupName, obj_parsed[i].groupID);
            // grupoNomeId[obj_parsed[i].groupName] = obj_parsed[i].groupID;
        }
    }
}

xhttp.open('GET','http://rest.learncode.academy/api/mariajesca/groups',true);
xhttp.send();








// let grupos = document.getElementsByClassName("meuLink");
// console.log (grupos.length);

// for (let i=0; i<grupos.length; i++){
//     grupos[i].addEventListener("click", function() {
//         console.log(this.textContent);
//     });
// }
