const images = [
    "https://cloud-h7scu58vo-hack-club-bot.vercel.app/0img_7894.jpg",
    "https://cloud-klyi66udw-hack-club-bot.vercel.app/0img_7895.jpg",
    "https://cloud-d3z3pxxay-hack-club-bot.vercel.app/0img_7896.jpg",
    "https://cloud-eg8zh3ear-hack-club-bot.vercel.app/0img_7897.jpg",
    "https://cloud-e4je0to4j-hack-club-bot.vercel.app/0img_7899.jpg",
    "https://cloud-4eufccfms-hack-club-bot.vercel.app/0img_7901.png"
];

function spin() {
    const isMinor = document.getElementById('minorCheckbox').checked;

    if (!isMinor) {
        showPopup();
        return;
    }

    const slot1 = images[Math.floor(Math.random() * images.length)];
    const slot2 = images[Math.floor(Math.random() * images.length)];
    const slot3 = images[Math.floor(Math.random() * images.length)];

    document.getElementById('slot1').src = slot1;
    document.getElementById('slot2').src = slot2;
    document.getElementById('slot3').src = slot3;

    const resultElement = document.getElementById('result');
    if (slot1 === slot2 && slot2 === slot3) {
        resultElement.textContent = "🎉 Jackpot! You win! 🎉";
        resultElement.style.color = "#FFD700";
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
        resultElement.textContent = "✨ Close! Two matched! ✨";
        resultElement.style.color = "#ADD8E6";
    } else {
        resultElement.textContent = "💔 Try Again!";
        resultElement.style.color = "white";
    }
}

function showPopup() {
    const popup = document.getElementById('popup');
    const angryNoise = document.getElementById('angryNoise');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
    angryNoise.play();
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    document.body.style.overflow = ''; 
}
