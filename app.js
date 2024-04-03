//let titulo = document.querySelector('h1'); //Vai lá no documento e seleciona este pedaço no Html. Criando variável para guardar campo do H1
//titulo.innerHTML = 'Jogo do Número Secreto'; //Inner é dentro, então dentro do HTML daquele titulo

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
    
let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio(); //Aqui chama a função
let tentativas = 1;

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMensagemInicial (){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 100');
}

exibirMensagemInicial();
exibirTextoNaTela('h1','Jogo do Número Secreto'); // Primeira vez que chamar a função, tudo que tiver tag será subts por h1
exibirTextoNaTela('p','Escolha um número entre 1 e 100'); // Segunda vez que chamar a função, tudo que tiver tag será subts por p

//Ao clique precisa acontecer uma funcionalidade, então precisamos criar uma function. Funtion trecho de código responsável por algo.

function verificarChute() {
    let chute = document.querySelector('input').value; //Para pegar apenas o valor que foi digitado no input
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p','O número é menor!');
        } else {
                exibirTextoNaTela('p','O número é maior!');
            }
            tentativas++;
            limparCampo();
        }
    }

//Esse retorno é pra o número aleatório que gerar aqui, ser retornado e atribuido pra variavel la em cima. Vai atribuir valor pra variavel através desse retorno

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //push no final pra adicionar itens na lista
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo ();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById ('reiniciar').setAttribute('disabled',true);
}