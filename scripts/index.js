// Récuperation des elements du DOM
const containerTasks = document.getElementById('container-tasks');

// Fonction qui permet de générer l'affichage (+ execution imédiate)
function displayTodoList() {

  // Effacement de tout les elements présent dans containers (pour les refresh)
  containerTasks.innerHTML = '';

  // Récuperation des taches depuis le localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

  // Parcours des taches à l'aide d'une boucle
  for (let i = 0; i < tasks.length; i++) {

    // Récuperation des infos de la taches
    const task = tasks[i];

    // Informations d'un tache et des boutons d'interaction
    const taskInfo = createTaskInfo(task);
    const taskButtons = createTaskBtn(task, i);

    // Création d'un noeud HTML pour réprésenter une tache
    const taskNode = document.createElement('li');
    taskNode.append(taskInfo, taskButtons);

    // Injection dans la balise "container-tasks"
    containerTasks.appendChild(taskNode);
  }
}
displayTodoList();

// Fonction pour générer une div avec les informations d'une tache
function createTaskInfo(task) {
  const taskInfo = document.createElement('div');

  const taskName = document.createElement('p');
  taskName.innerText = task.name;
  taskInfo.appendChild(taskName);

  const taskPriority = document.createElement('p');
  taskPriority.innerText = (task.priority === 'low') ? 'Priorité basse' : 'Priorité haute';
  taskInfo.appendChild(taskPriority);

  if (task.limitDate) {
    const taskDate = document.createElement('p');
    taskDate.innerText = `Date limite : ${task.limitDate}`;
    taskInfo.appendChild(taskDate);
  }

  return taskInfo;
}

// Fonction pour générer une div avec les boutons
function createTaskBtn(task, index) {
  const taskButtons = document.createElement('div');

  const taskBtnFinish = document.createElement('button');
  taskBtnFinish.innerText = 'Finalisé';
  if (task.isDone) {
    taskBtnFinish.setAttribute('disabled', '');
  }
  taskBtnFinish.addEventListener('click', function () {
    handleFinishTask(index);
  });
  taskButtons.appendChild(taskBtnFinish);

  const taskBtnDelete = document.createElement('button');
  taskBtnDelete.innerText = 'Supprimer';
  taskBtnDelete.addEventListener('click', function () {
    handleDeleteTask(index);
  });
  taskButtons.appendChild(taskBtnDelete);

  return taskButtons;
}

// Fonctions pour traité la validation et la suppression
function handleFinishTask(index) {

  // Récuperation des taches depuis le localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

  // Modification de la propriété "isDone" de l'element ciblé (via l'index)
  tasks[index].isDone = true;

  // Sauvegarde des données dans le LocalStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Rappel de la fonction "displayTodoList" pour actualisé l'ecran
  displayTodoList();
}

function handleDeleteTask(index) {

  // Récuperation des taches depuis le localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

  // Suppression de l'element ciblé (via l'index)
  tasks.splice(index, 1);

  // Sauvegarde des données dans le LocalStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Rappel de la fonction "displayTodoList" pour actualisé l'ecran
  displayTodoList();
}