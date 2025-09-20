import './App.css'
import MovieCard from './components/MovieCard';
import NavBar from './components/NavBar';
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path='/' element={<MovieCard />} />
    </Routes>
    </>
  )
}

export default App
