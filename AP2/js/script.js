import { hex_sha256 } from "./sha256-min.mjs";

const target = '715e561c392154e624994d1fafe75a9fcb6c4cb26ac5235015c18c06dbba5037';
const incremento = 'fogao';
const message =  document.getElementById('message')

document.getElementById('passwordForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const entrada = document.getElementById('input1').value;
    if (hex_sha256(entrada + incremento) === target){
        sessionStorage.setItem('logado', '1');
        window.location.href = 'jogadores.html';
        console.log("correto")
    }else{
        message.innerHTML = 'Senha incorreta';
    }
});