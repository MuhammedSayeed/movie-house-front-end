import './App.css';
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { BackgroundWrapper } from './components/BackgroundWrapper '

function App() {
  return (
    <BackgroundWrapper>
      <RouterProvider router={router} />
    </BackgroundWrapper>
  )
}

export default App