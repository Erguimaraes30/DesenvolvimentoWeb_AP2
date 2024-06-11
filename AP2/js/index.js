import { hex_sha256 } from "./sha256.mjs";

const login = "715e561c392154e624994d1fafe75a9fc;b6c4cb26ac5235015c18c06dbba5037";
const increment = "fogao";
const error = document.getElementById("error");

document.getElementById("input1")

document.addEventListener('DOMContentLoaded', function() {
    const senhaInput = document.querySelector('#input1');
    const passwordForm = document.querySelector('#passwordForm');
    
    passwordForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (senhaInput.value.trim() === 'BOTAFOGO') {
        window.location.href = 'home.html';
      } else {
        alert('Senha incorreta. Por favor, tente novamente.');
      }
    });
  });