let money = 10000;
let playCount = 0;
const maxPlays = 10;

document.addEventListener('DOMContentLoaded', () => {
    updateMoneyDisplay();
});

function updateMoneyDisplay() {
    const moneyDisplay = document.getElementById('money-display');
    moneyDisplay.textContent = `$${money.toLocaleString()}`;
}

const images = [
    "https://cloud-h7scu58vo-hack-club-bot.vercel.app/0img_7894.jpg",
    "https://cloud-klyi66udw-hack-club-bot.vercel.app/0img_7895.jpg",
    "https://cloud-d3z3pxxay-hack-club-bot.vercel.app/0img_7896.jpg",
    "https://cloud-eg8zh3ear-hack-club-bot.vercel.app/0img_7897.jpg",
    "https://cloud-e4je0to4j-hack-club-bot.vercel.app/0img_7899.jpg",
    "https://cloud-4eufccfms-hack-club-bot.vercel.app/0img_7901.png"
];

const backgroundMusic = document.getElementById('bg-music');
let musicPlaying = false;

document.getElementById('toggle-music').addEventListener('click', () => {
    if (musicPlaying) {
        backgroundMusic.pause();
        document.getElementById('toggle-music').textContent = 'Turn Music On';
    } else {
        backgroundMusic.play();
        document.getElementById('toggle-music').textContent = 'Turn Music Off';
    }
    musicPlaying = !musicPlaying;
});

function spin() {
    const isMinor = document.getElementById('minorCheckbox').checked;

    if (!isMinor) {
        showNotMinorPopup();
        return;
    }

    const betAmount = 100;
    if (money < betAmount) {
        alert("You don't have enough money to play!");
        return;
    }

    money -= betAmount;
    playCount++;
    updateMoneyDisplay();

    const slot1Index = Math.floor(Math.random() * images.length);
    const slot2Index = Math.floor(Math.random() * images.length);
    const slot3Index = Math.floor(Math.random() * images.length);

    const slot1 = images[slot1Index];
    const slot2 = images[slot2Index];
    const slot3 = images[slot3Index];

    document.getElementById('slot1').src = slot1;
    document.getElementById('slot2').src = slot2;
    document.getElementById('slot3').src = slot3;

    if (slot1Index === slot2Index && slot2Index === slot3Index) {
        const winAmount = betAmount * 10;
        money += winAmount;
        updateMoneyDisplay();
        showResultMessage(`🎉 Jackpot! You win $${winAmount.toLocaleString()}! 🎉`, "cheer.mp3", true);
    } else if (slot1Index === slot2Index || slot2Index === slot3Index || slot1Index === slot3Index) {
        const winAmount = betAmount * 2;
        money += winAmount;
        updateMoneyDisplay();
        showResultMessage(`✨ Matched two symbols! You win $${winAmount.toLocaleString()}! ✨`, "cheer.mp3", true);
    } else {
        showResultMessage("💔 You lost this round!", "unhappy.mp3", false);
    }

    if (playCount === maxPlays) {
        setTimeout(() => {
            const netEarnings = money - 10000; 
            const summaryMessage = netEarnings >= 0
                ? `🎉 After ${maxPlays} plays, you earned $${netEarnings.toLocaleString()}!`
                : `💔 After ${maxPlays} plays, you lost $${Math.abs(netEarnings).toLocaleString()}!`;
            showResultMessage(summaryMessage, "cheer.mp3", netEarnings >= 0);
        }, 2000);
    }
}

function showResultMessage(message, soundFile, confetti) {
    const resultElement = document.getElementById('result');
    const soundEffect = new Audio(soundFile);

    resultElement.textContent = '';
    resultElement.style.fontSize = '2em'; 
    resultElement.style.textAlign = 'center';
    resultElement.textContent = message;

    soundEffect.play();

    if (confetti) {
        launchConfetti();
    }
}

function showNotMinorPopup() {
    const popup = document.getElementById('popup');
    const popupContent = document.querySelector('.popup-content h1');
    const angryNoise = document.getElementById('angryNoise');

    popupContent.textContent = "ONLY MINORS ARE ALLOWED TO GAMBLE ON THIS WEBSITE! 🚨";
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    angryNoise.play();
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    document.body.style.overflow = '';
}

function launchConfetti() {
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confettiCanvas';
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = 0;
    confettiCanvas.style.left = 0;
    confettiCanvas.style.width = '100%';
    confettiCanvas.style.height = '100%';
    confettiCanvas.style.pointerEvents = 'none';
    document.body.appendChild(confettiCanvas);

    const confetti = window.confetti.create(confettiCanvas, { resize: true });
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });

    setTimeout(() => document.body.removeChild(confettiCanvas), 3000); 
}
