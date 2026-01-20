let dados = JSON.parse(localStorage.getItem('btc_charge_data')) || { username: "", saldo: 0, moeda: "BTC" };

// LÓGICA DE TRANSIÇÃO
window.onload = () => {
    if (dados.username !== "") {
        // Se já tem usuário, pula a intro mais rápido
        setTimeout(() => {
            encerrarIntro();
            entrarNoSite();
        }, 4500);
    } else {
        // Se é novo, mostra a intro completa e depois o registro
        setTimeout(() => {
            encerrarIntro();
            document.getElementById('auth-screen').style.display = 'flex';
        }, 6500);
    }
};

function encerrarIntro() {
    const intro = document.getElementById('intro-screen');
    if (intro) {
        intro.style.opacity = '0';
        setTimeout(() => intro.style.display = 'none', 1000);
    }
}

function finalizarRegistro() {
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
}

// MENU E SEÇÕES
function toggleMenu() { document.getElementById('side-menu').classList.toggle('open'); }
function mostrarSessao(tipo) {
    const sessoes = ['home-section', 'miner-section', 'chat-section'];
    sessoes.forEach(s => document.getElementById(s).style.display = 'none');
    document.getElementById(tipo + '-section').style.display = 'block';
    toggleMenu();
}

// MINERAÇÃO SIMPLIFICADA
function resolverCaptcha() {
    if(confirm("Validar acesso e liberar Hashrate?")) {
        const hashrate = (Math.random() * 9.9 + 0.1).toFixed(2);
        document.getElementById('miner-status').innerText = hashrate;
        dados.saldo += (hashrate * 0.00001);
        document.getElementById('saldo-valor').innerText = dados.saldo.toFixed(8);
        localStorage.setItem('btc_charge_data', JSON.stringify(dados));
        alert("Minerando com " + hashrate + " TH/s!");
    }
}

function enviarMensagem() {
    const input = document.getElementById('chat-input');
    if(!input.value) return;
    const display = document.getElementById('chat-display');
    display.innerHTML += `<div><b style="color:#f3ba2f">${dados.username}:</b> ${input.value}</div>`;
    input.value = "";
    display.scrollTop = display.scrollHeight;
}