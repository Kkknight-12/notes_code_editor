import 'bulmaswatch/darkly/bulmaswatch.min.css'
import { Provider } from 'react-redux'
import CellList from './components/cell-list'
import { store } from './state/store'

function App() {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  )
}

export default App