// Récuperation des taches et de l'id depuis le localStorage
const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

// Récuperation des elements du DOM
const inputName = document.getElementById('input-name');
const inputPriority = document.getElementById('input-priority');
const inputLimitDate = document.getElementById('input-limit-date');
const btnAddTask = document.getElementById('btn-add-task');

// Réaction à l'event "click" du bouton
btnAddTask.addEventListener('click', function() {

  // Récuperation du nom et de la priorité
  const name = inputName.value.trim();
  const priority = inputPriority.value;
  
  // Message d'erreur s'il n'y a pas le nom et la priorité
  if(!name || !priority) {
    alert('Information manquante !');
    return; // Arrêt de la réaction
  }

  // Récuperation de la date (La valeur '' est remplacer "null")
  const limitDate = inputLimitDate.value === '' ? null : inputLimitDate.value;
  
  // Création d'un objet pour symboliser une tache
  const task = {
    name: name,
    priority: priority,
    limitDate: limitDate,
    isDone: false
  }

  // Modification du tableau des taches
  tasks.push(task);

  // Sauvegarde des données dans le localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Remise à zéro de la zone d'encodage
  inputName.value = '';
  inputPriority.value = 'low';
  inputLimitDate.value = '';
});