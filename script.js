const rouletteDiv = document.getElementById('roulette');
const lancerBtn = document.getElementById('lancer');
const resetBtn = document.getElementById('reset');
const maxNumberInput = document.getElementById('maxNumber');

let nombresDisponibles = [];

function initialiserListe(max) {
  nombresDisponibles = [];
  for (let i = 0; i <= max; i++) {
    nombresDisponibles.push(i);
  }
}

function choisirNombreUnique() {
  if (nombresDisponibles.length === 0) {
    rouletteDiv.textContent = "🎉 Tous les nombres ont été tirés !";
    rouletteDiv.style.backgroundColor = "#dff0d8";
    rouletteDiv.style.color = "#27ae60";
    return;
  }

  let interval = setInterval(() => {
    const random = nombresDisponibles[Math.floor(Math.random() * nombresDisponibles.length)];
    rouletteDiv.textContent = random;
  }, 80);

  setTimeout(() => {
    clearInterval(interval);
    const index = Math.floor(Math.random() * nombresDisponibles.length);
    const final = nombresDisponibles.splice(index, 1)[0];
    rouletteDiv.textContent = final;
    rouletteDiv.style.backgroundColor = '#ffe6cc';
    rouletteDiv.style.color = '#d35400';
  }, 3000);
}

lancerBtn.addEventListener('click', () => {
  const max = parseInt(maxNumberInput.value);
  if (isNaN(max) || max < 1) {
    rouletteDiv.textContent = "⚠️ Veuillez entrer un nombre valide.";
    rouletteDiv.style.backgroundColor = "#ffcccc";
    rouletteDiv.style.color = "#c0392b";
    return;
  }

  if (nombresDisponibles.length === 0) {
    initialiserListe(max);
  }

  rouletteDiv.style.backgroundColor = "#fef9f1";
  rouletteDiv.style.color = "#e74c3c";
  choisirNombreUnique();
});

resetBtn.addEventListener('click', () => {
  const max = parseInt(maxNumberInput.value);
  if (isNaN(max) || max < 1) {
    rouletteDiv.textContent = "⚠️ Entrez un nombre max d'abord.";
    rouletteDiv.style.backgroundColor = "#ffcccc";
    rouletteDiv.style.color = "#c0392b";
    return;
  }
  initialiserListe(max);
  rouletteDiv.textContent = "🔄 Réinitialisé ! Prêt à relancer.";
  rouletteDiv.style.backgroundColor = "#fff3cd";
  rouletteDiv.style.color = "#856404";
});
