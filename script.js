// 1. CONFIGURAÇÃO DO FIREBASE (DADOS REAIS)
const firebaseConfig = {
    apiKey: "AIzaSyB8zHpjVzG-mWnSTFiaWhXwfSmzdgHasPc",
    authDomain: "bitcoinchargechat.firebaseapp.com",
    databaseURL: "https://bitcoinchargechat-default-rtdb.firebaseio.com",
    projectId: "bitcoinchargechat",
    storageBucket: "bitcoinchargechat.firebasestorage.app",
    messagingSenderId: "120515915221",
    appId: "1:120515915221:web:358830ce033f143ba8615c"
};

// 2. CONEXÃO COM O FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "mensagens");

// 3. VARIÁVEIS DO USUÁRIO
let dados = JSON.parse(localStorage.getItem('btc_charge_data')) || { username: "", saldo: 0 };

// 4. CONTROLE DA ANIMAÇÃO DE ENTRADA (CORRIGIDO PARA NÃO TRAVAR)
function encerrarIntro() {
    const intro = document.getElementById('intro-screen');
    if (intro) {
        intro.style.opacity = '0';
        setTimeout(() => {
            intro.style.display = 'none';
        }, 1000);
    }
}

window.onload = () => {
    // Tenta tirar a animação após 5 segundos
    setTimeout(() => {
        encerrarIntro();
        if (dados.username !== "") {
            entrarNoSite();
        } else {
            document.getElementById('auth-screen').style.display = 'flex';
        }
    }, 5000);

    // SEGURANÇA: Se em 8 segundos ainda estiver travado, força a entrada
    setTimeout(() => {
        const intro = document.getElementById('intro-screen');
        if (intro && intro.style.display !== 'none') {
            encerrarIntro();
            entrarNoSite();
        }
    }, 8000);
};

// 5. FUNÇÕES DE NAVEGAÇÃO
window.finalizarRegistro = function() {
    const user = document.getElementById('reg-user').value;
    if (!user) return alert("Escolha um apelido!");
    dados.username = user;
    localStorage.setItem('btc_charge_data', JSON.stringify(dados));
    entrarNoSite();
}

function entrarNoSite() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-layout').style.display = 'flex';
    document.getElementById('user-welcome').innerText = dados.username;
}

window.toggleMenu = () => document.getElementById('side-menu').classList.toggle('open');

window.mostrarSessao = (tipo) => {
    // Esconde todas as partes do site
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('chat-section').style.display = 'none';
    // Se você tiver a seção de puzzle no HTML, adicione aqui
    
    // Mostra apenas a que você clicou
    document.getElementById(tipo + '-section').style.display = 'block';
    window.toggleMenu();
}

// 6. CHAT GLOBAL EM TEMPO REAL
window.enviarMensagem = () => {
    const input = document.getElementById('chat-input');
    if(!input.value) return;

    push(chatRef, {
        usuario: dados.username,
        texto: input.value,
        data: Date.now()
    });
    input.value = "";
}

onChildAdded(chatRef, (snapshot) => {
    const msg = snapshot.val();
    const display = document.getElementById('chat-display');
    if (display) {
        display.innerHTML += `<div style="margin-bottom:8px"><b style="color:#f3ba2f">${msg.usuario}:</b> ${msg.texto}</div>`;
        display.scrollTop = display.scrollHeight;
    }
});