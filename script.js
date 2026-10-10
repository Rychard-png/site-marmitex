let produtos = [
    {
        nome: "Frango a parmegiana",
        descricao: "Acompanha: arroz, macarrão, maionese, fritas e feijão tropeiro ou feijão comum",
        preco: 35,
        imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
    },
    {
        nome: "Frango a milanesa",
        descricao: "Acompanha: arroz, macarrão, maionese e feijão tropeiro",
        preco: 28,
        imagem: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
    },
    {
        nome: "Costela Com Batata",
        descricao: "Acompanha: arroz, macarrão, maionese, fritas e feijão tropeiro ou feijão comum",
        preco: 35,
        imagem: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
    },
      {
        nome: "Mocoto",
        descricao: "Acompanha: arroz, macarrão, maionese e feijão tropeiro",
        preco: 28,
        imagem: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
    },
    {
        nome: "Costelinha porco assado com batata",
        descricao: "Acompanha: arroz, macarrão, maionese e feijão tropeiro ou comum",
        preco: 30,
        imagem: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
    },
        {
        nome: "Contra filé Acebolado",
        descricao: "Acompanha: arroz, macarrão, maionese, fritas e feijão",
        preco: 35,
        imagem: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
    }
];

let carrinho = [];


// MOSTRAR OS PRODUTOS

function mostrarProdutos() {

    let area = document.getElementById("produtos");

    area.innerHTML = "";

    for (let i = 0; i < produtos.length; i++) {

        area.innerHTML += `
            <div class="produto">

                <img
                    src="${produtos[i].imagem}"
                    alt="${produtos[i].nome}"
                    loading="lazy"
                >

                <h3>${produtos[i].nome}</h3>

                <p class="descricao">
                    ${produtos[i].descricao}
                </p>

                <strong class="preco">
                    R$ ${produtos[i].preco.toFixed(2).replace(".", ",")}
                </strong>

                <button
                    class="botao"
                    onclick="adicionarCarrinho(${i})"
                >
                    + ADICIONAR
                </button>

            </div>
        `;
    }
}


// ADICIONAR PRODUTO AO CARRINHO

function adicionarCarrinho(index) {

    let produto = null;

    for (let i = 0; i < carrinho.length; i++) {

        if (carrinho[i].nome == produtos[index].nome) {
            produto = carrinho[i];
        }
    }

    if (produto != null) {

        produto.quantidade++;

    } else {

        carrinho.push({
            nome: produtos[index].nome,
            preco: produtos[index].preco,
            quantidade: 1
        });
    }

    mostrarCarrinho();

    document.getElementById("meu-carrinho").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// AUMENTAR QUANTIDADE

function aumentar(index) {

    carrinho[index].quantidade++;

    mostrarCarrinho();
}


// DIMINUIR QUANTIDADE

function diminuir(index) {

    carrinho[index].quantidade--;

    if (carrinho[index].quantidade == 0) {

        carrinho.splice(index, 1);
    }

    mostrarCarrinho();
}


// MOSTRAR O CARRINHO E CALCULAR O TOTAL

function mostrarCarrinho() {

    let area = document.getElementById("carrinho");

    let aviso = document.getElementById("aviso-carrinho");

    area.innerHTML = "";

    let total = 0;

    if (carrinho.length == 0) {

        aviso.style.display = "block";

    } else {

        aviso.style.display = "none";
    }

    for (let i = 0; i < carrinho.length; i++) {

        let produto = carrinho[i];

        let subtotal = produto.preco * produto.quantidade;

        total = total + subtotal;

        area.innerHTML += `
            <div class="item-carrinho">

                <div class="info-produto">

                    <h3>${produto.nome}</h3>

                    <p>
                        Preço: R$
                        ${produto.preco.toFixed(2).replace(".", ",")}
                    </p>

                </div>

                <div class="quantidade">
                   <button
                        onclick="diminuir(${i})"
                        aria-label="Diminuir ${produto.nome}"
                    >
                        −
                    </button>

                    <span>${produto.quantidade}</span>

                    <button
                        onclick="aumentar(${i})"
                        aria-label="Aumentar ${produto.nome}"
                    >
                        +
                    </button>

                </div>

                <div class="subtotal">
                    Subtotal:
                    R$ ${subtotal.toFixed(2).replace(".", ",")}
                </div>

            </div>
        `;
    }

    document.getElementById("total").innerHTML =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}


// FINALIZAR PELO WHATSAPP

function finalizarPedido() {

    if (carrinho.length == 0) {

        alert("Adicione pelo menos uma marmita ao pedido.");

        return;
    }

    let nome = document.getElementById("nome-cliente").value.trim();

    let endereco = document.getElementById("endereco").value.trim();

    if (nome == "" || endereco == "") {

        alert("Por favor, informe seu nome e endereço de entrega.");

        return;
    }

    let mensagem = "Olá! Gostaria de fazer um pedido.\n\n";

    mensagem += "Nome: " + nome + "\n";
    mensagem += "Endereço: " + endereco + "\n\n";
    mensagem += "Meu pedido:\n";

    let total = 0;

    for (let i = 0; i < carrinho.length; i++) {

        let produto = carrinho[i];

        let subtotal = produto.preco * produto.quantidade;

        total += subtotal;

        mensagem +=
            produto.nome +
            " - Quantidade: " + produto.quantidade +
            " - Subtotal: R$ " +
            subtotal.toFixed(2).replace(".", ",") +
            "\n";
    }

    mensagem +=
        "\nTotal do pedido: R$ " +
        total.toFixed(2).replace(".", ",");

    mensagem += "\n\nAguardo a confirmação do pedido!";

    // SUBSTITUA PELO WHATSAPP DA SUA LOJA
    let telefone = "5511999999999";

    let link = "https://wa.me/" + telefone +
        "?text=" + encodeURIComponent(mensagem);

    window.open(link, "_blank");
}


// INICIAR O SITE

mostrarProdutos();
mostrarCarrinho();