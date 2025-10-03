import styles from './App.module.css'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div>
      <NavBar />
      <main className={styles.mainContent}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='*' element={<h1>Oops! We couldn't find that page</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
