
// $(document).change(function(){
//     if(taVazio(localStorage.user)){
//         mostrarCarEOut();
//     }
// });
let produtos = [
    {id: 1,
    imagem: "eleven.jpg",
    nome: "Boneco Funko Pop Eleven" ,
    preco: 98.90,
    parcelas: "3x de R$ 32,96"},
    {id: 2,
    imagem: "voldemort.jpg",
    nome: "Boneco Funko Pop Voldemort" ,
    preco: 98.90,
    parcelas: "3x de R$ 32,96"},
    {id: 3,
    imagem: "frodo.jpg",
    nome: "Boneco Funko Pop Frodo" ,
    preco: 98.90,
    parcelas: "3x de R$ 32,96"}, 
    {id: 4,
    imagem: "alex.jpg",
    nome: "Boneco Funko Pop Alex" ,
    preco: 98.90,
    parcelas: "3x de R$ 32,96"},
    {id: 5,
    imagem: "batman.jpg",
    nome: "Boneco Funko Pop Batman" ,
    preco: 98.90,
    parcelas: "3x de R$ 32,96"},
    {id: 6,
    imagem: "chewbacca.jpg",
    nome: "Boneco Funko Pop Chew" ,
    preco: 98.90,
    parcelas: "3x de R$ 32,96"}, 
    {id: 7,
    imagem: "dumbledore.jpg",
    nome: "Boneco Funko Pop Dumbledore" ,
    preco: 98.90,
    parcelas: "3x de R$ 32,96"},
    {id: 8,
    imagem: "lovegood.jpg",
    nome: "Boneco Funko Pop Lovegood" ,
    preco: 98.90,
    parcelas: "3x de R$ 32,96"}   
];

$(function(){
    $cardDeck = $("#card-deck");  

    // console.log("funfou!");
    function mostrarProdutos(){
        $cardDeck.html("");
        for(let i=0; i<produtos.length; i++){
            adicionarProduto(produtos[i]);
        }
    }

    function adicionarProduto(produto){
        let modelo = [
            // '<div class="row">',
                '<div class="card col-md-3"  id="produto'+produto.id+'">', /*por que esse id aqui?*/ 
                    '<img class="card-img-top" src="img/'+produto.imagem+'" alt="Card image cap">',
                    '<div class="card-block">',
                        '<h4 class="card-title">'+produto.nome+'</h4><br>',
                        '<span class="card-text">R$ '+produto.preco+',00</span><br>',
                        '<span class="card-text"><small class="text-muted">'+produto.parcelas+'</small></span>',
                        '<br>',
                    '</div>',
                    '<div class="card-img-overlay ">',
                        '<div class="car bt-cart-'+produto.id+'">',
                            '<a href="#" class="btn btn-success"><span class="fa fa-shopping-cart" aria-hidden="true"></span> </a>',
                        '</div>',
                        '<div class="quant">',
                            '<input type="number" class="form-control input-sm qtd" value="1" min="1">',
                        '</div>',
                    '</div>',
                '</div>',
                '<br>'
                
            // '</div>'
        ].join('');    
        $cardDeck.append(modelo);
        
        $(".bt-cart-"+produto.id).click(function(){
            let quantidade = $(this).parent().find(".qtd").val();
            quantidade = parseInt(quantidade);  
            produto.quantidade = quantidade;    
            // console.log(quantidade);

            if(localStorage.carrinho == undefined || localStorage.carrinho.length == 0){
                let carrinho = [produto];
                localStorage.carrinho = JSON.stringify(carrinho);
            }
            
            else {
                let carrinho = JSON.parse(localStorage.carrinho); 
                console.log(carrinho);
                let existe = false;
                $.each(carrinho, function(i, item){
                    if(item.id == produto.id){
                        existe = true;
                        item.quantidade += produto.quantidade;
                    }
                });

                if(!existe) {
                    carrinho.push(produto);
                }
                
                localStorage.carrinho = JSON.stringify(carrinho);
                mostrarCarrinho();

            }
            /*FALTA ADICIONAR AS FUNÇÕES DE ADICIONAR NO CARRINHO  */

        });
    }
    mostrarProdutos();
    
    $compras = $("#compras");
    
    function addAoCarrinho(produto){
        let modeloCarrinho = [
            '<div>',
                '<div class="row ">',
                    '<div class="col-10" >',
                        '<div class="row">',
                            '<div class="col-3">',
                                '<img style="width: 70px;" src="img/'+produto.imagem+'">',
                            '</div>',
                                
                            '<div class="col-7 offset-2">',
                                '<div class="row"> '+produto.nome+' </div>',
                                '<div class="row">',
                                    '<div class="col-8 justify-content"><span class="card-text"><small class="text-muted">Quantidade:'+produto.quantidade+'</small></span></div>',
                                    '<div class="col-4 justify-content"><span style="font-size: 13px;" class="card-text">R$'+(produto.preco*produto.quantidade).toFixed(2)+'</span></div>',
                                '</div>',
                            '</div>', 
                        '</div>',
                    '</div>',
                    '<br>',
                    '<div class="col-2">',
                        '<div class="row justify-content-center tirar-'+produto.id+'"> <span class="fa fa-times" aria-hidden="true"> </span></div>',
                    '</div>',
                '</div>',
            '</div>',
            '<div class="dropdown-divider">',
            '</div>'
        ].join('');

        $compras.append(modeloCarrinho);

        $(".tirar-"+produto.id).click(function(){
            console.log(produto);
            $carrinho = JSON.parse(localStorage.carrinho);
            $.each($carrinho, function(i, item){

                if( item!= undefined && item.id == produto.id){
                    $carrinho.splice(i, 1);
                }
               
            }); 
            localStorage.carrinho = JSON.stringify($carrinho);
            mostrarCarrinho();
        });
        
    }

    function mostrarCarrinho(){
        if(localStorage.carrinho == undefined || localStorage.carrinho.length == 0) {
            return;
        }
        $compras.html("");
        $carrinho = JSON.parse(localStorage.carrinho);
        console.log($carrinho);
        $.each($carrinho, function(i, produto){
            if(produto != undefined){
                addAoCarrinho(produto);
            }
        });
    }
    mostrarCarrinho();

    
    function addCompra(produto, carrinho){
        let modeloCompras = [
            '<tr id="tr-'+produto.id+'">',
                '<td class="col-sm-8 col-md-6">',
                    '<div class="media">',
                        '<img class="media-object" src="img/'+produto.imagem+'" style="width: 72px; height: 72px;">',
                        '<div class="media-body">',
                            '<h4 class="media-heading" style="margin: 17px 10px;">'+produto.nome+'</h4>',
                        '</div>',
                    '</div>',
                '</td>',
                '<td class="col-sm-1 col-md-1" style="text-align: center">',
                    '<input type="number" class="form-control" id="input-quantidade-'+produto.id+'" value="'+produto.quantidade+'" min="1">',
                '</td>',
                '<td class="col-sm-1 col-md-1 text-center"><strong>R$'+(produto.preco).toFixed(2)+'</strong></td>',
                '<td class="col-sm-1 col-md-1 text-center"><strong id="total-'+produto.id+'">R$'+(produto.preco * produto.quantidade).toFixed(2)+'</strong></td>',
                '<td class="col-sm-1 col-md-1">',
                    '<button type="button" id="remover-'+produto.id+'" class="btn btn-danger">',
                        '<span class="glyphicon glyphicon-remove"></span> Remover',
                    '</button>',
                '</td>',
            '</tr>'
        ].join('');

        $(modeloCompras).insertBefore($("#total"));


        $("#input-quantidade-"+produto.id).change(function(){
            produto.quantidade = parseInt($(this).val());
            $("#total-" + produto.id).html("R$"+(produto.preco * produto.quantidade).toFixed(2));
            localStorage.carrinho = JSON.stringify(carrinho);
            mostrarCarrinho();
            mostrarTotal();
        });

        $("#remover-"+produto.id).click(function(){
            console.log(produto);
            carrinho = JSON.parse(localStorage.carrinho);
            $.each(carrinho, function(i, item){

                if( item!= undefined && item.id == produto.id){
                    carrinho.splice(i, 1);
                    $("#tr-"+produto.id).remove();
                }
               
            }); 
            localStorage.carrinho = JSON.stringify(carrinho);
            mostrarCarrinho();
            mostrarTotal();
            
        });
    }

    function mostrarCompras(){
        $carrinho = JSON.parse(localStorage.carrinho);
        $.each($carrinho, function(i, item){ 
            if(item != undefined) {
                addCompra(item, $carrinho);
            }
        });
        mostrarTotal();        
    }

    if(String(window.location.href).includes("seus-produtos.html")){
        mostrarCompras();
    }
    console.log(window.location);

    function totalCarrinho(){
        $carrinho = JSON.parse(localStorage.carrinho);
        $total = 0;

        $.each($carrinho, function(i, item){ 
            if(item != undefined) {
                $total += (item.preco*item.quantidade);
            }
        });

        return $total;
    };

    function mostrarTotal(){
        $("#valor-total").html(totalCarrinho().toFixed(2));
    }

    $("#guardar").click(function(){
        $carrinho = JSON.parse(localStorage.carrinho);
        $.each($carrinho, function(i, produto){ 
            $.post("http://rest.learncode.academy/api/mariajesca/comprasfeitas", produto);
        });

        alert("Compra realizada com sucesso!");
    });

    $historico = $("#historico");

    function addHistorico(produto){
        let modeloCarrinho = [
            '<div>',
                '<div class="row ">',
                    '<div class="col-11 offset-1" >',
                        '<div class="row">',
                            '<div class="col-3">',
                                '<img style="width: 70px;" src="img/'+produto.imagem+'">',
                            '</div>',
                                
                            '<div class="col-7 offset-2">',
                                '<div class="row"> '+produto.nome+' </div>',
                                '<div class="row">',
                                    '<div class="col-8 justify-content"><span class="card-text"><small class="text-muted">Quantidade:'+produto.quantidade+'</small></span></div>',
                                    '<div class="col-4 justify-content"><span style="font-size: 13px;" class="card-text">R$'+(produto.preco*produto.quantidade).toFixed(2)+'</span></div>',
                                '</div>',
                            '</div>', 
                        '</div>',
                    '</div>',
                    '<br>',
                '</div>',
            '</div>'
        ].join('');

        $historico.append(modeloCarrinho);        
    }

    function mostrarHistorico(){
        $.getJSON("http://rest.learncode.academy/api/mariajesca/comprasfeitas", function(historico, status){
            if(status == "success"){
                $.each(historico, function(i, produto){
                    addHistorico(produto);
                });
            }
        });     
    }
    // $(".historico").click(function(){

    // });
    mostrarHistorico();
    mostrarCarrinho();
    
});

$(document).ready(function() { 
    function taVazio(texto){
        // console.log(texto);
        return texto == null || texto == undefined || texto == "" || String(texto).trim() == "" || texto.length == 0 ;  
    }

    // console.log(taVazio(localStorage.user));
    let btCadastro = document.querySelector(".cadastro");
    let btLogin = document.querySelector(".login");
    let btCarrinho = document.querySelector(".carrinho");
    let btSair = document.querySelector(".sair");
    let btHis = document.querySelector(".historico");

    function mostrarCadELog() {
        btCadastro.style.display = "block";
        btLogin.style.display = "block";
        btCarrinho.style.display = "none";
        btSair.style.display = "none";  
        btHis.style.display = "none";  
    }
    
    function mostrarCarEOut() {
        btCadastro.style.display = "none";
        btLogin.style.display = "none";
        btCarrinho.style.display = "block";
        btSair.style.display = "block";
        btHis.style.display = "block";  
    }

    if(localStorage.user == ""){
        mostrarCadELog();
        // console.log(localStorage.user);
    }
    else {
        mostrarCarEOut();
        // console.log(localStorage.user);
    }

    $("#cadastro-enviar").click(function(evento){
        evento.preventDefault();
        let dados = {"nome":$("#campo_usuario").val(), "email":$("#campo_email").val(), "senha":$("#campo_senha").val()};
        let campoSenhaC = $("#campo_confirma_senha").val();

        
        if (taVazio(dados.nome) || taVazio(dados.email) || taVazio(dados.senha) || taVazio(campoSenhaC)) {
            alert ("Todos os campos devem ser preenchidos");
            return ;
        }
        
        if(campoSenhaC == dados.senha){
            $.post("http://rest.learncode.academy/api/mariajesca/usuariosloja", dados);
            alert("Deu certo!");
            $("#campo_usuario").val("");
            $("#campo_email").val("");
            $("#campo_senha").val("");
            $("#campo_confirma_senha").val("");
        }
 
        else {
            alert("Os campos das senhas não correspodem!");
        }
    });

    $("#login-enviar").click(function(evento){
        evento.preventDefault();
        let usuario = {"nome": $("#login_campo_usuario").val(), "senha": $("#login_campo_senha").val()};
        
        if (taVazio(usuario.nome) || taVazio(usuario.senha)) {
            alert ("Todos os campos devem ser preenchidos");
            return ;
        }

        $.getJSON("http://rest.learncode.academy/api/mariajesca/usuariosloja", function(result, status){
            if(status == "success"){
                $.each(result, function(i, dado){
                    if(dado.nome == usuario.nome || dado.email == usuario.nome){
                        if(dado.senha == usuario.senha){
                            localStorage.user = usuario;
                            $("#login_campo_usuario").val("");
                            $("#login_campo_senha").val("");
                            mostrarCarEOut(); 
                            alert ("usuario logado");
                            return;
                        }
                    }
                });
            }
        });     
    });

    

    $("#sair").click(function(evento){
        evento.preventDefault();
        // dar a opção da pessoa querer confirmar a saída ou não
        localStorage.user = "";
        window.location = this.href;


    });
    

    /*fazer parecer um erro caso esteja sem internet */
});