// Controle da Animação Inicial
window.onload = () => {
    const introText = document.getElementById('intro-text');
    const introLogo = document.getElementById('intro-logo');
    const introScreen = document.getElementById('intro-screen');
    const authScreen = document.getElementById('auth-screen');

    setTimeout(() => {
        introText.style.opacity = '0';
        setTimeout(() => {
            introText.style.display = 'none';
            introLogo.style.display = 'block';
            setTimeout(() => { introLogo.style.opacity = '1'; }, 50);
            
            // Após 2 segundos com o logo, mostra o Login
            setTimeout(() => {
                introScreen.style.opacity = '0';
                setTimeout(() => {
                    introScreen.style.display = 'none';
                    authScreen.style.display = 'flex';
                }, 1000);
            }, 2000);
        }, 1000);
    }, 1500);
};

// Função de Login
function realizarLogin() {
    const user = document.getElementById('user').value;
    if(user === "") return alert("Digite seu usuário!");
    
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-layout').style.display = 'block';
}

// Controle do Menu Lateral
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    menu.style.left = menu.style.left === '0px' ? '-250px' : '0px';
}

// Navegação entre Seções
function irPara(id) {
    document.getElementById('sec-home').style.display = 'none';
    document.getElementById('sec-chat').style.display = 'none';
    document.getElementById('sec-puzzle').style.display = 'none';

    if(id === 'home') document.getElementById('sec-home').style.display = 'flex';
    else document.getElementById('sec-' + id).style.display = 'block';
    
    toggleMenu(); // Fecha o menu após clicar
}