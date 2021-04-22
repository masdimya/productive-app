const { render } = require('./view')
const { store$} = require('./store')

store$.subscribe(()=>{
  const state = store$.getState()
  render(state)
})

const state = store$.getState()
render(state)
