import './AddButton.scss'
import {Link} from 'react-router-dom'


const AddButton = ({text, addRoute}) => {
  return (
    <Link to={addRoute} className='link' >
       <button className='btn'>{text}</button>
    </Link>
  )
}

export default AddButton