const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');

const {initialState, done, loadData, selectectUser} = require('./reducer');

const loadDataAction = createAction('loadData');
const doneAction = createAction('done');
const selectectUserAction = createAction('selectUser');



const todo = createReducer(initialState, {
  [loadDataAction] : loadData,
  [doneAction] : done,
  [selectectUserAction] : selectectUser,

})

const store$ = configureStore({
  reducer : todo
})

module.exports = {store$, loadDataAction, doneAction, selectectUserAction}