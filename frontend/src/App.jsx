import './App.css'
import NavBar from './components/NavBar';
import Home from './pages/home';
import Favourites from './pages/Favourites';
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/favourites' element={<Favourites />} />
    </Routes>
    </>
  )
}

export default App
