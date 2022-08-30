import './Button.scss'

const Button = (props) => {
  return (
    <button className={ `${props.className} button`}>
        {props.text}
    </button>
  )
}

export default Button