import "./Task.scss"
import AddButton from "../AddButton/AddButton"
import EditButton from "../EditButton/EditButton"

const Task = ({ image, heading, desc, addRoute, editRoute }) => {
  return (
    <article className="task">
      <img src={image} alt="" className="task__img" />
      <div className="task__desc">
        <h3 className="task__heading">{heading}</h3>
        <p className="task__text">{desc}</p>
      </div>
      <div className="task__buttons">
        <AddButton text="Add" addRoute={addRoute} />
        <EditButton text="Edit" editRoute={editRoute} />
      </div>
    </article>
  )
}

export default Task
