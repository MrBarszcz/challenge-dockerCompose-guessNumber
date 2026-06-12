const inputGuess = document.getElementById('guess');
const btnAttempt = document.getElementById('btn-attempt');
const btnRestart = document.getElementById('btn-restart');
const displayMessage = document.getElementById('message');
const displayAttempts = document.getElementById('attempts');

const API_URL = 'http://localhost:8081/api/game'; 

async function checkTip() {
    const guess = Number(inputGuess.value);

    if (!guess || guess < 1 || guess > 100) {
        displayMessage.textContent = "Insira um número entre 1 e 100.";
        displayMessage.style.color = "#f9e2af"; 
        return;
    }

    try {
        const response = await fetch(`${API_URL}/attempt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Envia o JSON { "guess": valor } exatamente como o Record do C# espera
            body: JSON.stringify({ guess: guess }) 
        });
        
        const data = await response.json();

        displayAttempts.textContent = data.attempts;
        displayMessage.textContent = data.message;

        if (data.status === "success") {
            displayMessage.style.color = "#a6e3a1"
            btnAttempt.disabled = true;
            inputGuess.disabled = true;
            btnRestart.classList.remove('hidden');
        } else {
            displayMessage.style.color = "#f38ba8";
        }
    } catch (error) {
        displayMessage.textContent = "Erro ao conectar com a API .NET!";
        displayMessage.style.color = "#f38ba8";
    }
    
    inputGuess.value = '';
    inputGuess.focus();
}

async function restartGame() {
    await fetch(`${API_URL}/restart`, { method: 'POST' });
    
    displayAttempts.textContent = "0";
    displayMessage.textContent = "";
    btnAttempt.disabled = false;
    inputGuess.disabled = false;
    inputGuess.value = '';
    btnRestart.classList.add('hidden');
    inputGuess.focus();
}

btnAttempt.addEventListener('click', checkTip);
inputGuess.addEventListener('keypress', e => { if (e.key === 'Enter') checkTip(); });
btnRestart.addEventListener('click', restartGame);