const initialState = {
  selectedUser : 1,
  user: [
    {
      userId: 1, 
      name: 'dimas',
      task: [
        { id: 1, title: 'dimas book', type: 'checkbox', finish: false },
        { id: 2, title: 'finish book', type: 'checkbox', finish: true },
        {
          id: 3,
          title: 'finish book2',
          sub: [
            { id: 1, title: 'day1', type: 'checkbox', finish: true },
            { id: 2, title: 'day2', type: 'checkbox', finish: false },
            { id: 3, title: 'day3', type: 'checkbox', finish: true },
          ],
          finish: true,
        },
        {
          id: 4,
          title: 'finish book2',
          sub: [
            { id: 1, title: 'day1', type: 'checkbox', finish: true },
            { id: 2, title: 'day2', type: 'checkbox', finish: false },
            { id: 3, title: 'day3', type: 'checkbox', finish: true },
            {
              id: 4,
              title: 'finish book5',
              sub: [
                { id: 1, title: 'day5', type: 'checkbox', finish: true },
                { id: 2, title: 'day5', type: 'checkbox', finish: false },
                { id: 3, title: 'day5', type: 'checkbox', finish: true },
              ],
              finish: true,
            },
          ],
          finish: true,
        },
      ],
    },
    {
      userId: 2,
      name: 'ofa',
      task: [
        { id: 1, title: 'finish book', type: 'checkbox', finish: false },
        { id: 2, title: 'finish book', type: 'checkbox', finish: true },
        {
          id: 3,
          title: 'finish book2',
          sub: [
            { id: 1, title: 'day1', type: 'checkbox', finish: true },
            { id: 2, title: 'day2', type: 'checkbox', finish: false },
            { id: 3, title: 'day3', type: 'checkbox', finish: true },
          ],
          finish: true,
        },
      ],
    },
  ],
};

function done(state, action) {
  let { id, subId, checked } = action.payload;
  if (subId) {
    const taskParent = state.task.find((t) => t.id === id);
    const task = taskParent.sub.find((t) => t.id === subId);
    task.finish = checked;
  }

  if (!subId) {
    const task = state.task.find((t) => t.id === id);
    task.finish = checked;
  }

  return state;
}

function loadData(state, action) {
  state = action.payload;
  return state;
}

function selectectUser(state,action){
  state.selectedUser = action.payload;
  return state;
}

module.exports = { initialState, done, loadData, selectectUser };
