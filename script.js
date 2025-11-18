// JogoBaloes (pasta: JogoBaloes) - script.js (lógica do jogo)
let score = 0;
const scoreDisplay = document.getElementById('score');
const popSound = document.getElementById('popSound');
const gameArea = document.getElementById('gameArea');
const audioStatus = document.getElementById('audioStatus');
const startBtn = document.getElementById('startBtn');
let spawnIntervalId = null;

function createBalloon(){
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = Math.random() * 90 + '%';
  balloon.style.background = randomGradient();

  balloon.addEventListener('pointerdown', () => {
    playPop();
    score++;
    scoreDisplay.textContent = "Pontuação: " + score;
    balloon.remove();
  });

  gameArea.appendChild(balloon);

  setTimeout(() => balloon.remove(), 5000);
}

function randomGradient(){
  const cores = ['#4caf50','#ff7f00','#ffdf00','#ff0000'];
  const c1 = cores[Math.floor(Math.random()*cores.length)];
  const c2 = cores[Math.floor(Math.random()*cores.length)];
  return `radial-gradient(circle at 50% 40%, #ffffff, ${c1}, ${c2})`;
}

// Garantir que o áudio esteja carregado antes do jogo iniciar
popSound.volume = 0.8;
popSound.load();

function updateAudioStatus(ok){
  const hasSource = !!popSound.currentSrc || popSound.querySelectorAll('source').length > 0;
  if (ok) {
    audioStatus.textContent = '';
    audioStatus.style.display = 'none';
  } else if (hasSource) {
    audioStatus.textContent = 'Som: carregando…';
    audioStatus.style.color = '#444';
    audioStatus.style.display = 'block';
  } else {
    audioStatus.textContent = '';
    audioStatus.style.display = 'none';
  }
}

popSound.addEventListener('canplaythrough', ()=> updateAudioStatus(true));
popSound.addEventListener('loadeddata', ()=> updateAudioStatus(true));
popSound.addEventListener('error', ()=> updateAudioStatus(false));
updateAudioStatus(false);

let audioCtx = null;
function ensureAudioCtx(){
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(_) {}
  }
}

function playBeep(){
  ensureAudioCtx();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(880, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.09);
}

async function playPop(){
  try {
    popSound.currentTime = 0;
    await popSound.play();
  } catch(_) {
    playBeep();
  }
}

startBtn.addEventListener('click', ()=>{
  score = 0;
  scoreDisplay.textContent = "Pontuação: 0";
  gameArea.style.display = 'block';

  // Desbloquear o áudio com uma interação do usuário
  try {
    ensureAudioCtx();
    popSound.muted = true;
    const maybePromise = popSound.play();
    if (maybePromise && typeof maybePromise.then === 'function') {
      maybePromise.then(() => {
        popSound.pause();
        popSound.currentTime = 0;
        popSound.muted = false;
        updateAudioStatus(true);
      }).catch(() => {
        popSound.muted = false;
        updateAudioStatus(false);
      });
    } else {
      popSound.pause();
      popSound.currentTime = 0;
      popSound.muted = false;
      updateAudioStatus(true);
    }
  } catch (_) {}

  if(spawnIntervalId) clearInterval(spawnIntervalId);
  spawnIntervalId = setInterval(createBalloon, 900);
});
