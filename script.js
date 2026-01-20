// 1. CONFIGURAÇÃO DO SEU FIREBASE (DADOS REAIS DA SUA IMAGEM)
const firebaseConfig = {
    apiKey: "AIzaSyB8zHpjVzG-mWnSTFiaWhXwfSmzdgHasPc",
    authDomain: "bitcoinchargechat.firebaseapp.com",
    databaseURL: "https://bitcoinchargechat-default-rtdb.firebaseio.com",
    projectId: "bitcoinchargechat",
    storageBucket: "bitcoinchargechat.firebasestorage.app",
    messagingSenderId: "120515915221",
    appId: "1:120515915221:web:358830ce033f143ba8615c"
};

// 2. IMPORTANDO AS FERRAMENTAS DO FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Inicialização
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "mensagens");

// 3. LÓGICA DE LOGIN E SALDO
let dados = JSON.parse(localStorage.getItem('btc_charge_data')) || { username: "", saldo: 0 };

window.onload = () => {
    // Se o usuário já tem nome, entra direto. Se não, mostra tela de registro.
    if (dados.username !== "") {
        setTimeout(() => { encerrarIntro(); entrarNoSite(); }, 4500);
    } else {
        setTimeout(() => { encerrarIntro(); document.getElementById('auth-screen').style.display = 'flex'; }, 6500);
    }
};

function encerrarIntro() {
    const intro = document.getElementById('intro-screen');
    if (intro) {
        intro.style.opacity = '0';
        setTimeout(() => intro.style.display = 'none', 1000);
    }
}

// Função de Registro (Username)
window.finalizarRegistro = function() {
    const user = document.getElementById('reg-user').value;
    if (!user) return alert("Escolha um username!");
    dados.username = user;
    localStorage.setItem('btc_charge_data', JSON.stringify(dados));
    entrarNoSite();
}

function entrarNoSite() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-layout').style.display = 'flex';
    document.getElementById('user-welcome').innerText = dados.username;
    document.getElementById('saldo-valor').innerText = dados.saldo.toFixed(8);
}

// 4. MENU E NAVEGAÇÃO
window.toggleMenu = () => document.getElementById('side-menu').classList.toggle('open');

window.mostrarSessao = (tipo) => {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('miner-section').style.display = 'none';
    document.getElementById('chat-section').style.display = 'none';
    
    document.getElementById(tipo + '-section').style.display = 'block';
    window.toggleMenu();
}

// 5. MINERAÇÃO (SIMULADA)
window.resolverCaptcha = () => {
    if(confirm("Validar acesso e liberar Hashrate?")) {
        const hashrate = (Math.random() * 9.9 + 0.1).toFixed(2);
        document.getElementById('miner-status').innerText = hashrate;
        
        // Ganho pequeno por clique para simular mineração
        dados.saldo += (hashrate * 0.000001);
        document.getElementById('saldo-valor').innerText = dados.saldo.toFixed(8);
        localStorage.setItem('btc_charge_data', JSON.stringify(dados));
        alert("Minerando com " + hashrate + " TH/s!");
    }
}

// 6. CHAT EM TEMPO REAL (FIREBASE)
window.enviarMensagem = () => {
    const input = document.getElementById('chat-input');
    if(!input.value) return;

    // Envia para o banco de dados
    push(chatRef, {
        usuario: dados.username,
        texto: input.value,
        timestamp: Date.now()
    });
    
    input.value = "";
}

// Escuta novas mensagens de outros usuários e mostra na tela
onChildAdded(chatRef, (snapshot) => {
    const msg = snapshot.val();
    const display = document.getElementById('chat-display');
    if (display) {
        display.innerHTML += `<div><b style="color:#f3ba2f">${msg.usuario}:</b> ${msg.texto}</div>`;
        display.scrollTop = display.scrollHeight;
    }
});