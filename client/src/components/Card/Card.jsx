import "./Card.scss"
import { Link } from 'react-router-dom'
import { ArrowCircleRight } from "@mui/icons-material"

const Card = props => {
  return (
    <article className={`card ${props.className}`} key={props.key} stuff={props.stuff} >
        <div className="card__icon-container">
      <props.icon className='card__icon' />
        </div>
      <div className="card__desc">
        <span className="card__number">{props.number}</span>
        <span className="card__title">{props.title}</span>
      </div>
      <Link className="card__view-details link" to ={props.route}>
        <span>View Details</span>
        <ArrowCircleRight className="card__arrow" />
      </Link>
    </article>
  )
}

export default Card
