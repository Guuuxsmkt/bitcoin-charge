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

window.onload = () => {
    setTimeout(() => {
        document.getElementById('intro-screen').style.display = 'none';
        if (dados.username !== "") entrarNoSite();
        else document.getElementById('auth-screen').style.display = 'flex';
    }, 4000);
};

window.finalizarRegistro = () => {
    const user = document.getElementById('reg-user').value;
    if (!user) return alert("Escolha um apelido!");
    dados.username = user;
    localStorage.setItem('btc_charge_data', JSON.stringify(dados));
    entrarNoSite();
}

function entrarNoSite() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-layout').style.display = 'flex';
    document.getElementById('user-welcome').innerText = "Olá, " + dados.username;
}

window.toggleMenu = () => document.getElementById('side-menu').classList.toggle('open');

window.mostrarSessao = (tipo) => {
    const secoes = ['home', 'chat', 'puzzle-main', 'puzzle-resolver', 'puzzle-criar'];
    secoes.forEach(s => {
        const el = document.getElementById(s + '-section');
        if (el) el.style.display = 'none';
    });
    document.getElementById(tipo + '-section').style.display = 'block';
    if (document.getElementById('side-menu').classList.contains('open')) toggleMenu();
}

window.enviarMensagem = () => {
    const input = document.getElementById('chat-input');
    if(!input.value) return;
    push(chatRef, { usuario: dados.username, texto: input.value });
    input.value = "";
}

onChildAdded(chatRef, (snapshot) => {
    const msg = snapshot.val();
    const display = document.getElementById('chat-display');
    if (display) {
        display.innerHTML += `<div style="margin-bottom:5px"><b>${msg.usuario}:</b> ${msg.texto}</div>`;
        display.scrollTop = display.scrollHeight;
    }
});