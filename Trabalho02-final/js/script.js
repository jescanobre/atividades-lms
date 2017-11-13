let layout = document.querySelector(".layout");
layout.style.display = "none";

let modalLogin = document.querySelector(".modal-login");
let modalSobreposicao = document.querySelector(".modal-overlay");
let botao = document.querySelector(".botao");

let usuariologado = "user";

function aparecerMensageiro() {
    layout.style.display = "block";
};

function desaparecerMensageiro() {
    layout.style.display = "none";    
};

let campoIdUsuario = document.querySelector("#campo_id");

function estadoBotaoLogin(){
    if(String(botao.innerHTML).trim() == "Entrar") {
        botao.innerHTML = "Sair";
    }
    else {
        botao.innerHTML = "Entrar";
    }
}

function login() {
    if (campoIdUsuario.value == usuariologado) {
        localStorage.idUser = campoIdUsuario.value;
        fecharModalLogin();
        estadoBotaoLogin();
        layout.style.animationName ="in";
        layout.style.animationDuration = "600ms";
        aparecerMensageiro();
        campoIdUsuario.value = "";
    }

    else {
        alert("ID incorreto!");
    }
};


let entrar = document.querySelector("#form-submit");

entrar.addEventListener("click", function(e){
    e.preventDefault();
    login();
});

function logout() {
    localStorage.idUser = null;
    estadoBotaoLogin();
    desaparecerMensageiro();
}

function abrirModalLogin() {
    if (String(botao.innerHTML).trim() == "Sair") {
        logout();
    }
    modalLogin.style.display = "block"; 
    modalSobreposicao.style.display = "block";
    
};

botao.addEventListener("click", abrirModalLogin);

function fecharModalLogin() {
    modalLogin.style.display = "none";
    modalSobreposicao.style.display = "none";
};


if (localStorage.idUser == "user") {
    aparecerMensageiro();
    estadoBotaoLogin();
    fecharModalLogin();
    requisicoes();
    
}

else {  }

function requisicoes() {

let listaGrupos = document.querySelector(".lista-grupos");
let mensagensCss = document.querySelector(".mensagens");
let grupoSelecionado = document.querySelector(".grupo-selecionado");
let grupos = [];


let btAddGrupo = document.querySelector(".adicionar-grupo");
let modalAddGrupo = document.querySelector(".modal-addgrupo");

function abrirFecharAddGrupo (){
    if(modalAddGrupo.style.display != "block"){
            modalAddGrupo.style.display = "block";
    } else {
        modalAddGrupo.style.display = "none";
        
    }
};

btAddGrupo.addEventListener("click", abrirFecharAddGrupo);

let submitGrupo = document.querySelector(".add-grupo-submit");
let campoNomeGrupo = document.querySelector("#nome-do-grupo");
let campoIdGrupo = document.querySelector("#id-do-grupo");

function enviarDados(dado, link, sucesso) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4){
            sucesso(dado);
        }
    }

    xhttp.open("POST", link, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dado));
}

function updateList(grupo) {
    console.log(grupo);
    mostrarGrupos(grupo.groupName, grupo.groupID);   
}

function inserirGrupo(dado){
    enviarDados(dado, "http://rest.learncode.academy/api/mariajesca/groups", updateList);
}

submitGrupo.addEventListener("click", function(evento){
    evento.preventDefault();
    if (campoNomeGrupo.value != null && campoIdGrupo.value != null && String(campoNomeGrupo.value).trim() != "" && String(campoIdGrupo.value).trim()  != "" && campoNomeGrupo.value.legth != 0 && campoIdGrupo.value.legth != 0){
        let nome = campoNomeGrupo.value;
        let id = campoIdGrupo.value;       
        let dado = {"groupName": nome, "groupID": id};
        inserirGrupo(dado);

        campoNomeGrupo.value = "";
        campoIdGrupo.value = "";
    } 
    else {
        alert("Todos os campos devem ser preenchidos!")
    }
});    

function updateMensagens(mensagem) {
    mostrarMensagem(mensagem.userName, mensagem.message);
}

function inserirMensagem(dado){
    enviarDados(dado, "http://rest.learncode.academy/api/mariajesca/" + grupoSelecionado.groupID, updateMensagens);
}

submitMensagem = document.querySelector(".enviar-men");
campoMensagem = document.querySelector("#campo_mensagem");

submitMensagem.addEventListener("click", function(evento){
    evento.preventDefault();

    let men = campoMensagem.value;

    let dado = {"message": men, "userName": localStorage.idUser};

    inserirMensagem(dado);

    campoMensagem.value = "";

});

function mostrarMensagem(usuario, texto) {

    let mensagem = document.createElement("div");
    let tituloMensagem = document.createElement("div");
    let nomeUsuario = document.createElement("span");
    let textoNome = document.createTextNode(usuario);
    let conteudoMensagem = document.createElement("div");
    let conteudo = document.createElement("p");
    let textoConteudo = document.createTextNode(texto);

    mensagem.classList.add("mensagem");
    tituloMensagem.classList.add("titulo-mensagem");
    conteudoMensagem.classList.add("conteudo-mensagem");

    nomeUsuario.appendChild(textoNome);
    tituloMensagem.appendChild(nomeUsuario);
    conteudo.appendChild(textoConteudo);
    conteudoMensagem.appendChild(conteudo);

    mensagem.appendChild(tituloMensagem);
    mensagem.appendChild(conteudoMensagem);

    if(usuario == localStorage.idUser){
        mensagem.classList.add("eu");
      }

    mensagensCss.appendChild(mensagem);
}


function mostrarMensagens() {
    let texto = document.createTextNode(this.groupName);

    grupoSelecionado.innerHTML = "";
    mensagensCss.innerHTML = "";

    grupoSelecionado.appendChild(texto);

    grupoSelecionado.groupID = this.groupId;

    let xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            let obj_parsed = JSON.parse(this.responseText);
        
            console.log(obj_parsed);
            for(let i = 0; i< obj_parsed.length; i++){
                mostrarMensagem(obj_parsed[i].userName, obj_parsed[i].message);
                
            }
        }
    };

    xhttp2.open("GET", "http://rest.learncode.academy/api/mariajesca/" + this.groupId, true);
    xhttp2.send();

}


function mostrarGrupos(nomeGrupo, idGrupo) {
    let grupo = document.createElement("div");
    let avatar = document.createElement("img");
    let nomeGrupoSpan = document.createElement("span");
    let texto = document.createTextNode(nomeGrupo);

    avatar.src = "img/grupo.png";

    grupo.classList.add("grupo");

    avatar.classList.add("icon");
    nomeGrupoSpan.classList.add("nome");

    nomeGrupoSpan.appendChild(texto);
    grupo.appendChild(avatar);
    grupo.appendChild(nomeGrupoSpan);

    listaGrupos.appendChild(grupo);
    
    grupos.push(grupo);

    grupo.groupId = idGrupo;
    grupo.groupName = nomeGrupo;

    grupo.addEventListener("click", mostrarMensagens);
    
}

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
       let obj_parsed = JSON.parse(this.responseText);

       for(let i = 0; i< obj_parsed.length; i++) {
            mostrarGrupos(obj_parsed[i].groupName, obj_parsed[i].groupID);
       }
    }
};

xhttp.open("GET", "http://rest.learncode.academy/api/mariajesca/groups", true);
xhttp.send();

}
