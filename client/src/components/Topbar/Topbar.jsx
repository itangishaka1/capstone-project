import './Topbar.scss'
import { Link } from 'react-router-dom'

const Topbar = (props) => {
  return (
    <div className={`${props.className} topbar`}>
      <Link to="/"className="link">
        <span className='topbar__logo'>RELAX ADMIN</span>
      </Link>
    </div>
  )
}

export default Topbar