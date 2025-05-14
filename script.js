const rouletteDiv = document.getElementById('roulette');
const lancerBtn = document.getElementById('lancer');
const resetBtn = document.getElementById('reset');
const maxNumberInput = document.getElementById('maxNumber');
const fullscreenButton = document.getElementById('fullscreen'); // Ajout de la constante

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

  if (nombresDisponibles.length === 0 || nombresDisponibles.length - 1 !== max) { // Réinitialise si la liste est vide ou si le max a changé
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

// Logique pour le bouton de plein écran
if (fullscreenButton) {
  fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => {
          // Icône "quitter le plein écran" (réduire)
          fullscreenButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z" width="24px" fill="#FFFFFF"><path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/></svg>';
        })
        .catch(err => {
          alert(`Impossible de passer en mode plein écran : ${err.message} (${err.name})`);
        });
    } else {
      document.exitFullscreen()
        .then(() => {
          // Icône "mettre en plein écran"
          fullscreenButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" width="24px" fill="#FFFFFF"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>';
        })
        .catch(err => {
          alert(`Impossible de quitter le mode plein écran : ${err.message} (${err.name})`);
        });
    }
  });
}
