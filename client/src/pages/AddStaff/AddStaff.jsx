import "./AddStaff.scss"
import { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
class AddStaff extends Component {
  state = {
    error: "",
    success: false,
    failedAuth: false
  }

componentDidMount() {
   const authToken = sessionStorage.getItem('authToken')
   if(!authToken) {
      this.setState({ failedAuth: true })
   }
} 

  handleSubmit = event => {
    event.preventDefault()

    const form = event.target

    const staffInfo = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      phone: form.phone.value,
      address: form.address.value,
      email: form.email.value,
      password: form.password.value,
      position: form.position.value,
      gender: form.gender.value,
      department: form.department.value,
    }
   
    const authToken = sessionStorage.getItem('authToken')
    if(!authToken) {
      this.setState({ failedAuth: true})
    }

    axios
      .post("https://relax-admin.herokuapp.com/staff/register", staffInfo, {headers: {Authorization: `Bearer ${authToken}`}})
      .then((res) => {
        console.log(res)
        this.setState({
          success: true,
          error: "",
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          success: false,
          error: err.response.data.error,
        })
      })
  }

  render() {
    return (
      <main className="add-staff">
        {this.state.failedAuth && (
          <Redirect to="/login-in" />
        )}
        <h1 className="add-staff__title">ADD NEW STAFF 💪🏻</h1>
        <form className="add-staff__form" onSubmit={this.handleSubmit}>
            <div className="add-staff__wrapper">
              <div className="add-staff__info">
                <h3 className="add-staff__info-heading">STAFF INFORMATION</h3>
                <div className="add-staff__info-desc">
                  <Input type="text" name="first_name" label="First name" />
                  <Input type="text" name="last_name" label="Last name" />
                  <Input type="text" name="position" label="Position" />
                  <label className="add-staff__label" htmlFor="gender">Gender</label>
                  <select name="gender" id="gender" className="add-staff__select">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="add-staff__address">
                <h3 className="add-staff__info-heading">CONTACT INFORMATION</h3>
                <Input type="text" name="phone" label="Phone" />
                <Input type="text" name="address" label="Address" />
                <Input type="text" name="email" label="Email" />
                <Input
                  type="password"
                  name="password"
                  label="Temporary Password"
                />
              </div>
            </div>

          {/* Success message */}
          {this.state.success && (
            <div className="add-staff__success">
              Staff created successfully! 👌
              <Redirect to="/admin/staffs" />
            </div>
          )}

          {/* Error message */}
          {this.state.error && (
            <div className="add-staff__error">{this.state.error}</div>
            )}
                        <div className="add-staff__depart">
              <h3 className="add-staff__info-heading">DEPARTMENT</h3>
              <label className="add-staff__label" htmlFor="department">Department</label>
              <select name="department" id="department" className="add-staff__select">
                <option value="Education">Education</option>
                <option value="Computer">Computer Science</option>
                <option value="Health">Health Science</option>
              </select>
            </div>
            <Button text="Add Staff" className="add-staff__button"></Button>
        </form>
      </main>
    )
  }
}

export default AddStaff
