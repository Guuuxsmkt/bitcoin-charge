let dados = JSON.parse(localStorage.getItem('btc_charge_data')) || { username: "" };

window.onload = () => {
    const text = document.getElementById('intro-text');
    const logo = document.getElementById('intro-logo');
    const screen = document.getElementById('intro-screen');

    // 1. Texto Inicial
    setTimeout(() => {
        text.style.opacity = '0';
        
        // 2. Troca para o Logo Menor
        setTimeout(() => {
            text.style.display = 'none';
            logo.style.display = 'block';
            setTimeout(() => { logo.style.opacity = '1'; }, 50);
            
            // 3. Entra no site
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

window.finalizarRegistro = () => {
    const email = document.getElementById('user-email').value;
    const nick = document.getElementById('user-nick').value;
    const pass = document.getElementById('user-pass').value;

    if (!email || !nick || !pass) return alert("Por favor, preencha todos os campos!");
    
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

window.toggleMenu = () => {
    const menu = document.getElementById('side-menu');
    menu.style.left = menu.style.left === '0px' ? '-250px' : '0px';
};