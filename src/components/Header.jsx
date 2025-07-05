import { Link } from 'react-router-dom'
import './Header.scss'

const Contact = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/reserve'>Reservation</Link></li>
            </ul>
        </nav>
    )
}

export default Contact;