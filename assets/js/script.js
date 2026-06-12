const inputGuess = document.getElementById('guess');
const btnAttempt = document.getElementById('btn-attempt');
const btnRestart = document.getElementById('btn-restart');
const displayMessage = document.getElementById('message');
const displayAttempts = document.getElementById('attempts');

// A porta 8081 é onde o .NET será exposto pelo Docker
const API_URL = 'http://localhost:8081/api/game'; 

async function checkTip() {
    const guess = Number(inputGuess.value);

    if (!palpite || palpite < 1 || palpite > 100) {
        displayMessage.textContent = "Insira um número entre 1 e 100.";
        displayMessage.style.color = "#f9e2af"; // Amarelo aviso
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tentativa`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ guess: guess })
        });
        
        const data = await response.json();

        displayAttempts.textContent = data.tentativas;
        displayMessage.textContent = data.mensagem;

        if (data.status === "sucesso") {
            displayMessage.style.color = "#a6e3a1"; // Verde sucesso
            btnAttempt.disabled = true;
            inputGuess.disabled = true;
            btnRestart.classList.remove('hidden');
        } else {
            displayMessage.style.color = "#f38ba8"; // Vermelho erro
        }
    } catch (error) {
        displayMessage.textContent = "Erro ao conectar com a API .NET!";
        displayMessage.style.color = "#f38ba8";
    }
    
    inputGuess.value = '';
    inputTip.focus();
}

async function restartGame() {
    await fetch(`${API_URL}/restart`, { method: 'POST' });
    
    displayAttempts.textContent = "0";
    displayMessage.textContent = "";
    btnAttempt.disabled = false;
    inputPalpite.disabled = false;
    inputTip.value = '';
    btnRestart.classList.add('hidden');
    inputTip.focus();
}

btnAttempt.addEventListener('click', checkTip);
inputTip.addEventListener('keypress', e => { if (e.key === 'Enter') checkTip(); });
btnRestart.addEventListener('click', restartGame);
