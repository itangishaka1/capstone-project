import {Link} from 'react-router-dom'
import './EditButton'


const EditButton = ({text, editRoute}) => {
    return (
        <Link to={editRoute} className='link' >
       <button className='btn'>{text}</button>
    </Link>
  )
}
export default EditButton