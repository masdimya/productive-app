const { store$, doneAction, selectectUserAction } = require('./store');
const root = document.getElementById('task');
const select = document.getElementById('user');
select.onchange = (e) => {
  const userId = parseInt(e.target.value)
  store$.dispatch(selectectUserAction(userId))
}


function task(item, parentId = null) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = item.finish;
  input.onclick = (e) => {
    if (parentId) {
      store$.dispatch(doneAction({ id: parentId, subId: item.id, checked: e.target.checked }));
    } else {
      store$.dispatch(doneAction({ id: item.id, checked: e.target.checked }));
    }
  };

  const label = document.createElement('label');
  label.textContent = item.title;
  return { input, label };
}

function title(item) {
  const label = document.createElement('p');
  label.textContent = item.title;
  return label;
}

function generate(tasks, parentId = null) {
  return tasks.reduce((el, item) => {
    if (item.type) {
      const parent = document.createElement('div');
      const { input, label } = parentId ? task(item, parentId) : task(item);
      parent.appendChild(input);
      parent.appendChild(label);
      el.push(parent);
      return el;
    }

    if (!item.type) {
      const parent = document.createElement('div');
      const label = title(item);
      const subTasks = generate(item.sub, item.id);
      parent.appendChild(label);
      subTasks.map((node) => parent.appendChild(node));
      el.push(parent);
      return el;
    }
  }, []);
}

function listUser(state){
  select.innerHTML = '';
  const users = state.user

  users.map((user) => {
    const option = document.createElement('option');
    option.textContent = user.name;
    option.value = user.userId;
    select.appendChild(option);
  })

  select.value = state.selectedUser
}

function render(state) {
  
  const selectedUser = state.user.find((t) => t.userId === state.selectedUser)
  root.innerHTML = '';
  
  listUser(state);
  generate(selectedUser.task).map((el) => root.appendChild(el));
}

module.exports = { render };
