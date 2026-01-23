// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB8zHpjVzG-mWmSTfiaWhXwFSmzdgHasPc",
    databaseURL: "https://bitcoinchargechat-default-rtdb.firebaseio.com",
    projectId: "bitcoinchargechat",
    appId: "1:120515915221:web:358830ce033f143ba8615c"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Efeito de transição da Intro para o Site
setTimeout(() => {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('main-site').style.display = 'flex';
}, 4000);

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function toggleQR() {
    document.getElementById('qr-container').style.display = 'block';
}

function confirmDonation() {
    document.getElementById('qr-container').style.display = 'none';
    document.getElementById('thanks-msg').style.display = 'block';
}

function sendMsg() {
    const user = document.getElementById('username-display').value || "Anônimo";
    const text = document.getElementById('chat-input').value;
    if (!text) return;
    db.ref('public_chat').push({ user, text });
    document.getElementById('chat-input').value = "";
}

db.ref('public_chat').limitToLast(15).on('child_added', snap => {
    const m = snap.val();
    document.getElementById('chat-box').innerHTML += `<p><b style="color:#F7931A">${m.user}:</b> ${m.text}</p>`;
});




