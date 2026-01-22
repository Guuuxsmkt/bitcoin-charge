const firebaseConfig = {
  apiKey: "AIzaSyB8zHpjVzG-mWmSTFiaWhXwfSmzdgHasPc",
  authDomain: "bitcoinchargechat.firebaseapp.com",
  databaseURL: "https://bitcoinchargechat-default-rtdb.firebaseio.com",
  projectId: "bitcoinchargechat",
  storageBucket: "bitcoinchargechat.firebasestorage.app",
  messagingSenderId: "120515915221",
  appId: "1:120515915221:web:358830ce033f143ba8615c"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

// LOGIN AUTOMÁTICO PARA NÃO FICAR DESLOGANDO [cite: 2026-01-22]
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    return auth.onAuthStateChanged((user) => {
        if (!user) {
            auth.signInAnonymously().catch(err => console.error("Erro no Login:", err));
        }
    });
});

const CARTEIRAS = {
    'Bitcoin': { endereco: 'bc1q2zvuafqplffeu5ukfudnuugf3l0l5kc2a8ue6j', simbolo: 'BTC', taxa: 0.015 },
    'Solana': { endereco: 'Sua_Carteira_Solana', simbolo: 'SOL', taxa: 0.02 },
    'Ethereum': { endereco: 'Sua_Carteira_Eth', simbolo: 'ETH', taxa: 0.02 },
    'TRX': { endereco: 'Sua_Carteira_TRX', simbolo: 'TRX', taxa: 0.02 }
};

let moedaAtual = 'Bitcoin';

function mostrarTela(id) {
    const telas = ['tela-criacao', 'tela-pagamento', 'tela-vitrine', 'tela-detalhes'];
    telas.forEach(t => document.getElementById(t).style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'tela-vitrine') carregarPuzzles();
}

function prepararPagamento() {
    if(!document.getElementById('recompensa-puzzle').value) return alert("Insira o valor da recompensa.");
    mostrarTela('tela-pagamento');
    selecionarMoeda('Bitcoin');
}

function selecionarMoeda(moeda) {
    moedaAtual = moeda;
    const valorRec = document.getElementById('recompensa-puzzle').value;
    const taxaCalc = (valorRec * CARTEIRAS[moeda].taxa).toFixed(8);
    
    document.getElementById('box-pagamento-detalhes').style.display = 'block';
    document.getElementById('moeda-nome').innerText = moeda;
    document.getElementById('moeda-simbolo').innerText = CARTEIRAS[moeda].simbolo;
    document.getElementById('valor-taxa-display').innerText = taxaCalc;
    document.getElementById('carteira-exibida').innerText = CARTEIRAS[moeda].endereco;
}

function confirmarELancar() {
    const dados = {
        nome: document.getElementById('nome-puzzle').value,
        recompensa: document.getElementById('recompensa-puzzle').value + " " + CARTEIRAS[moedaAtual].simbolo,
        nivel: document.getElementById('nivel-puzzle').value,
        dicasGratis: document.getElementById('dicas-gratis-input').value,
        dicasPagas: document.getElementById('dicas-pagas-input').value,
        status: "Ativo",
        timestamp: Date.now()
    };

    database.ref('puzzles').push(dados).then(() => {
        alert("Puzzle criado com sucesso!");
        mostrarTela('tela-vitrine');
    });
}

function carregarPuzzles() {
    const lista = document.getElementById('lista-puzzles-real');
    database.ref('puzzles').on('value', (snapshot) => {
        lista.innerHTML = "";
        if(!snapshot.exists()) {
            lista.innerHTML = "<p style='color:#666; text-align:center;'>Nenhum puzzle ativo.</p>";
            return;
        }
        snapshot.forEach((item) => {
            const p = item.val();
            const cor = p.nivel === "Iniciante" ? "#00ff00" : (p.nivel === "Médio" ? "#f7931a" : "#ff4444");
            lista.innerHTML += `
                <div class="card-puzzle" style="border: 2px solid ${cor}; background: #111; padding: 15px; margin-bottom: 10px; border-radius: 10px;">
                    <h3 style="margin: 0;">${p.nome}</h3>
                    <p style="color: ${cor}; font-weight: bold; margin: 5px 0;">💰 ${p.recompensa}</p>
                    <button class="btn-lancar" style="background: ${cor}; color: #000; width: 100%;" onclick="abrirPuzzle('${item.key}')">Resolver</button>
                </div>
            `;
        });
    });
}

function abrirPuzzle(id) {
    database.ref('puzzles/' + id).once('value').then((snapshot) => {
        const p = snapshot.val();
        document.getElementById('detalhe-nome').innerText = p.nome;
        document.getElementById('tag-nivel').innerText = p.nivel;
        document.getElementById('tag-nivel').style.background = p.nivel === "Iniciante" ? "#00ff00" : (p.nivel === "Médio" ? "#f7931a" : "#ff4444");
        document.getElementById('box-dicas-gratis').innerText = p.dicasGratis;
        
        document.getElementById('btn-comprar-dicas').onclick = () => {
            if(confirm("Deseja pagar 0.00005 BTC para liberar as dicas extras?")) {
                document.getElementById('box-dicas-pagas').innerText = p.dicasPagas;
                document.getElementById('box-dicas-pagas').style.background = "#002200";
                document.getElementById('box-dicas-pagas').style.color = "#fff";
            }
        };
        mostrarTela('tela-detalhes');
    });
}