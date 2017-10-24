let amigosMensagens = [
    { 
        "usuario": "joao03",
        "nome": "João",
        "mensagens": 
        [    
            {
                "usuario": "joao03",
                "texto": "Tudo bem?"
            },
            {
                "usuario": "victor23",
                "texto": "Tudo Tranqs"
            },
            {
                "usuario": "joao03",
                "texto": "Que bom"
            },
        ]
    },
    { 
        "usuario": "maria2000",
        "nome": "Maria",
        "mensagens": 
        [
            {
                "usuario": "maria2000",
                "texto": "Na paz?"
            },
            {
                    "usuario": "victor23",
                    "texto": "Show"
            },
            {
                    "usuario": "maria2000",
                    "texto": "Que bom"
            },
        ]
    },
    { 
        "usuario": "robson_alves",
        "nome": "Robson Alves",
        "mensagens": 
        [
            {
                "usuario": "victor23",
                "texto": "Bom?"
            },
            {
                "usuario": "robson_alves",
                "texto": "Bom"
            },
            {
                "usuario": "victor23",
                "texto": "Que bom"
            },
        ]
    }
 ];

let amigos = [];
let usuarioNome = { }; 

//Confuso
for(i=0; i<amigosMensagens.length; i++) {
    amigos.push(amigosMensagens[i].usuario);
    usuarioNome[amigosMensagens[i].usuario] = amigosMensagens[i].nome;
}

usuarioNome["victor23"] = "Victor";

let listaAmigos = document.querySelector(".lista-amigos");
listaAmigos = listaAmigos.getElementsByTagName("ul")[0];

function criarLiAmigos(amigos, lista){
    for (i=0; i<amigos.length; i++){
        let itemLista = document.createElement("li");
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("class", "meuLink"); //mudar o nome dessa classe 
        let avatar = document.createElement("img");
        avatar.src = "img/amigo.png";        
        let nome = document.createTextNode(usuarioNome[amigos[i]]);

        link.appendChild(avatar);
        link.appendChild(nome);
        itemLista.appendChild(link);
        lista.appendChild(itemLista);
    }
}


let sof = document.querySelector(".nome-software");
sof.addEventListener("click", function(){
    let divMensagens = document.getElementsByClassName("mensagens")[0];
    divMensagens.innerHTML = " ";
});


function mostrarMensagens(){
    let links = document.getElementsByClassName("meuLink");
    let divMensagens = document.getElementsByClassName("mensagens")[0];

    for (i=0; i<links.length; i++){
        var link = links[i];
        link.idx=i;
        links[i].addEventListener("click", function(){
            i = this.idx;
            divMensagens.innerHTML = " ";

            let mensagem = document.createElement("div");
            mensagem.setAttribute("class", "mensagem");
            console.log(i);
            let nome = document.createTextNode(amigosMensagens[i].nome);
            mensagem.appendChild(nome);

            let conteudoMensagem = document.createElement("div");
            conteudoMensagem.setAttribute("class", "conteudo-mensagem");
            
            for (j=0; j<amigosMensagens[i].mensagens.length; j++) {
                let conteudo = document.createTextNode(amigosMensagens[i].mensagens[j].texto);
                let usuario = document.createTextNode(usuarioNome [amigosMensagens[i].mensagens[j].usuario]);
                
                let span = document.createElement("span");
                span.appendChild(usuario);

                let p = document.createElement("p");
                p.appendChild(conteudo);
                
                conteudoMensagem.appendChild(span);
                conteudoMensagem.appendChild(p);
            }

            mensagem.appendChild(conteudoMensagem);
            divMensagens.appendChild(mensagem);
        }, false);
    }
}

criarLiAmigos(amigos, listaAmigos);
mostrarMensagens();


//  console.log(amigosMensagens);

// let amigos = document.querySelector(".lista-amigos");

// function listaAmigos(){


    // let amigo = document.createElement("div");
    // let nave = document.createElement("nav");
    // let lista = document.createElement("ul");
    // let item = document.createElement("li");
    // let texto = document.createTextNode(amigo1);
    // let link = document.createElement("a");
    // link.setAttribute("href");

    // item.appendChild(link & texto);
    // lista.appendChild(item);
    // nave.appendChild(lista);
    // amigo.appendChild(nave);;
    // amigo.classList.add("amigo");
    // listaAmigos.appendChild(amigo);


    // let amigo = document.createElement("div");
    // // let avatar = document.createElement("img src="../img/amigo.png"");
    // let span1 = document.createElement("span");
    // let text1 = document.createTextNode(nome);

    // span1.appendChild(text1);
    // amigo.appendChild(span1);
    // amigo.classList.add("amigo");
    // listaAmigos.appendChild(amigo);
// }

// let entrar = document.querySelector(".entrar");

// entrar.addEventListener("click",function(){
//     // event.preventDefault();
//     listaAmigos();
// });