let dados = JSON.parse(localStorage.getItem('btc_charge_data')) || { username: "" };

window.onload = () => {
    const text = document.getElementById('intro-text');
    const logo = document.getElementById('intro-logo');
    const screen = document.getElementById('intro-screen');

    // 1. Texto some após 2 segundos
    setTimeout(() => {
        text.style.opacity = '0';
        
        // 2. Logo aparece após o texto sumir
        setTimeout(() => {
            text.style.display = 'none';
            logo.style.display = 'block';
            setTimeout(() => { logo.style.opacity = '1'; }, 50);
            
            // 3. A tela inteira some após o logo brilhar por 3 segundos
            setTimeout(() => {
                screen.style.opacity = '0';
                setTimeout(() => {
                    screen.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Libera o clique no site
                    
                    if (dados.username !== "") entrarNoSite();
                    else document.getElementById('auth-screen').style.display = 'flex';
                }, 1000);
            }, 3000);
        }, 1500);
    }, 2000);
};

window.finalizarRegistro = () => {
    const user = document.getElementById('user-nick').value;
    if (!user) return alert("Digite seu Username");
    
    dados.username = user;
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