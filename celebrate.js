// Get data from localStorage
const name = localStorage.getItem('birthdayName');
const age = localStorage.getItem('birthdayAge');
const photo = localStorage.getItem('birthdayPhoto');

// Display user data
document.getElementById('userName').textContent = name;
document.getElementById('userAge').textContent = age + ' Years Young!';
document.getElementById('userPhoto').src = photo;

// Create confetti
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8dadc', '#f4a261'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
        document.body.appendChild(confetti);
    }
}

createConfetti();

// Music control
const audio = document.getElementById('birthdaySong');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicToggle.textContent = '🎵 Play Birthday Song';
    } else {
        audio.play();
        musicToggle.textContent = '⏸️ Pause Song';
    }
    isPlaying = !isPlaying;
});

// Auto-play (some browsers block this)
window.addEventListener('load', () => {
    audio.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = '⏸️ Pause Song';
    }).catch(() => {
        console.log('Autoplay blocked by browser');
    });
});
