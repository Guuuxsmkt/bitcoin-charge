// CONFIGURAÇÃO FIREBASE (MANTIDA)
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
const app = initializeApp(firebaseConfig);

let dados = JSON.parse(localStorage.getItem('btc_charge_data')) || { username: "" };

window.onload = () => {
    const text = document.getElementById('intro-text');
    const logo = document.getElementById('intro-logo');
    const screen = document.getElementById('intro-screen');

    // Sequência de Animação: Texto sumindo -> Logo aparecendo
    setTimeout(() => {
        text.style.opacity = '0'; // Texto some
        setTimeout(() => {
            text.style.display = 'none';
            logo.style.display = 'block';
            setTimeout(() => { logo.style.opacity = '1'; }, 100); // Logo aparece
        }, 2000);
    }, 2000);

    // Finaliza animação e vai para login/main
    setTimeout(() => {
        screen.style.opacity = '0';
        setTimeout(() => {
            screen.style.display = 'none';
            if (dados.username !== "") entrarNoSite();
            else document.getElementById('auth-screen').style.display = 'flex';
        }, 2000);
    }, 7000);
};

window.finalizarRegistro = () => {
    const user = document.getElementById('user-nick').value;
    if (!user) return alert("Por favor, preencha o seu username.");
    
    dados.username = user;
    if (document.getElementById('remember-me').checked) {
        localStorage.setItem('btc_charge_data', JSON.stringify(dados));
    }
    entrarNoSite();
};

function entrarNoSite() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-layout').style.display = 'block';
    document.getElementById('user-display').innerText = dados.username;
}

window.toggleMenu = () => {
    const menu = document.getElementById('side-menu');
    menu.style.left = menu.style.left === '0px' ? '-250px' : '0px';
};