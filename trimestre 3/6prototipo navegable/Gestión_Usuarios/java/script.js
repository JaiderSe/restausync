const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Cargar usuarios desde localStorage al iniciar
window.addEventListener('DOMContentLoaded', () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach(user => addUserToList(user));
});

userForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (name && email) {
    const newUser = { name, email };

    // Guardar en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    addUserToList(newUser);
    userForm.reset();
  }
});

function addUserToList(user) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${user.name} - ${user.email}</span>
    <button onclick="removeUser(this, '${user.email}')">Eliminar</button>
  `;
  userList.appendChild(li);
}

function removeUser(button, email) {
  button.parentElement.remove();

  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.filter(u => u.email !== email);
  localStorage.setItem('users', JSON.stringify(users));
}

