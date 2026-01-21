// CONFIGURAÇÃO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyB8zHpjVzG-mWnSTFiaWhXwfSmzdgHasPc",
    authDomain: "bitcoinchargechat.firebaseapp.com",
    databaseURL: "https://bitcoinchargechat-default-rtdb.firebaseio.com",
    projectId: "bitcoinchargechat",
    storageBucket: "bitcoinchargechat.firebasestorage.app",
    messagingSenderId: "120515915221",
    appId: "1:120515915221:web:358830ce033f143ba8615c"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "mensagens");

let dados = JSON.parse(localStorage.getItem('btc_charge_data')) || { username: "" };

// ANIMAÇÃO DE ENTRADA
window.onload = () => {
    const text = document.getElementById('intro-text');
    const logo = document.getElementById('intro-logo');
    const screen = document.getElementById('intro-screen');

    setTimeout(() => {
        text.style.opacity = '0';
        setTimeout(() => {
            text.style.display = 'none';
            logo.style.display = 'block';
            setTimeout(() => { logo.style.opacity = '1'; }, 50);
            setTimeout(() => {
                screen.style.opacity = '0';
                setTimeout(() => {
                    screen.style.display = 'none';
                    if (dados.username !== "") entrarNoSite();
                    else document.getElementById('auth-screen').style.display = 'flex';
                }, 1000);
            }, 2500);
        }, 1500);
    }, 2000);
};

// LOGIN E REGISTRO
window.finalizarRegistro = () => {
    const email = document.getElementById('user-email').value;
    const nick = document.getElementById('user-nick').value;
    const pass = document.getElementById('user-pass').value;

    if (!email || !nick || !pass) return alert("Preencha todos os campos!");
    
    dados.username = nick;
    if (document.getElementById('remember-me').checked) {
        localStorage.setItem('btc_charge_data', JSON.stringify(dados));
    }
    entrarNoSite();
};

function entrarNoSite() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-layout').style.display = 'block';
}

// NAVEGAÇÃO DO MENU
window.toggleMenu = () => {
    const menu = document.getElementById('side-menu');
    menu.style.left = menu.style.left === '0px' ? '-250px' : '0px';
};

window.mostrarSessao = (tipo) => {
    const secoes = ['home', 'chat', 'puzzle-main', 'puzzle-criar'];
    secoes.forEach(s => document.getElementById(s + '-section').style.display = 'none');
    document.getElementById(tipo + '-section').style.display = tipo === 'home' ? 'flex' : 'block';
    window.toggleMenu();
};

// LÓGICA DO CHAT 24H
window.enviarMensagem = () => {
    const input = document.getElementById('chat-input');
    if(!input.value) return;
    push(chatRef, { usuario: dados.username, texto: input.value, data: Date.now() });
    input.value = "";
};

onChildAdded(chatRef, (snapshot) => {
    const msg = snapshot.val();
    const display = document.getElementById('chat-display');
    if (display) {
        display.innerHTML += `<div style="margin-bottom:10px;"><b style="color:#f3ba2f">${msg.usuario}:</b> ${msg.texto}</div>`;
        display.scrollTop = display.scrollHeight;
    }
});