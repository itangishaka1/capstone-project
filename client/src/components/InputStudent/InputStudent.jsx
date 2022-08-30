import './InputStudent.scss'

const InputStudent = ({ label, type, name, onChange, value   }) => {
  return (
    <div className="inputStudent">
    <label htmlFor={label} className="inputStudent__label">
      {label}
    </label>
    <input
      type={type}
      name={name}
      className="inputStudent__input"
      onChange={onChange}
      value={value}
    />
  </div>
  )
}

export default InputStudent