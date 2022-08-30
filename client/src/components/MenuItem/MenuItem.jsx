import './MenuItem.scss'



const MenuItem = (props) => {

  return (
    <div className='menuItem'>
        <props.icon className={`menuItem__icon ${props.className}`} />
        <h3 className="menuItem__title">{props.title}</h3>
     </div>
  )
}

export default MenuItem