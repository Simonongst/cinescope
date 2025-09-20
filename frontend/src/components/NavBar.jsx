import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <>
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/favourite'>Favourite</Link></li>
    </ul>
    </>
  )
}

export default NavBar