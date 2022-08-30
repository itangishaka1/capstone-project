import "./EditStaff.scss"
import { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
class EditStaff extends Component {
  state = {
    error: "",
    success: false,
    failedAuth: false,
    staff: null,
    address: "",
    department: "",
    email: "",
    first_name: "",
    gender: "",
    last_name: "",
    phone: "",
    position: "",

  }
 
  componentDidMount() {
    const authToken = sessionStorage.getItem("authToken")

    if (!authToken) {
      this.setState({
        failedAuth: true,
      })
    }

    const user_id = this.props.match.params.id
    axios
      .get(`https://relax-admin.herokuapp.com/staff/${user_id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then(res => {
        console.log('From GET /:ID server: ', res.data)
        this.setState({
          failedAuth: false,
          staff: res.data,
          address: res.data.address,
          department: res.data.department,
          email: res.data.email,
          first_name: res.data.first_name,
          gender: res.data.gender,
          last_name: res.data.last_name,
          phone: res.data.phone,
          position: res.data.position,
        })
      })
      .catch(err => {
        this.setState({
          failedAuth: true,
          error: err.response.data,
        })
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const authToken = sessionStorage.getItem("authToken")

    if (!authToken) {
      this.setState({
        failedAuth: true,
      })
    }
    const staffInfo = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone: this.state.phone,
      address: this.state.address,
      email: this.state.email,
      password: this.state.password,
      position: this.state.position,
      gender: this.state.gender,
      department: this.state.department,
    }

    if(!staffInfo.first_name || !staffInfo.last_name || !staffInfo.phone || !staffInfo.address || !staffInfo.email || !staffInfo.password || !staffInfo.position){
       this.setState({
          error: "Please fill in all the required fields"
       })
    }

    const user_id = this.props.match.params.id

    axios
      .put(`https://relax-admin.herokuapp.com/staff/${user_id}/edit`, staffInfo, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then(res => {
        console.log("PUT returned: ", res.data)
        this.setState({
          success: true,
          error: "",
          address: "",
          department: "",
          email: "",
          first_name: "",
          gender: "",
          last_name: "",
          phone: "",
          position: "",
          password: "",
        })
      })
      .catch(err => {
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
          <div className="edit-staff__top">
            <h1 className="add-staff__title">EDIT STAFF 💪🏻</h1>
            <Link to="/admin/staffs" className="link">
              <Button text="All Staffs" />
            </Link>
          </div>
          <form className="add-staff__form" onSubmit={this.handleSubmit}>
            <div className="add-staff__wrapper">
              <div className="add-staff__info">
                <h3 className="add-staff__info-heading">STAFF INFORMATION</h3>
                <div className="add-staff__info-desc">
                  <Input
                    type="text"
                    name="first_name"
                    label="First name"
                    onChange={this.handleChange}
                    value={this.state.first_name}
                  />
                  <Input
                    type="text"
                    name="last_name"
                    label="Last name"
                    onChange={this.handleChange}
                    value={this.state.last_name}

                  />
                  <Input
                    type="text"
                    name="position"
                    label="Position"
                    onChange={this.handleChange}
                    value={this.state.position}
                  />
                  <label className="add-staff__label" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="add-staff__select"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="add-staff__address">
                <h3 className="add-staff__info-heading">CONTACT INFORMATION</h3>
                <Input
                  type="text"
                  name="phone"
                  label="Phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                />
                <Input
                  type="text"
                  name="address"
                  label="Address"
                  onChange={this.handleChange}
                  value={this.state.address}
                  
                />
                <Input
                  type="text"
                  name="email"
                  label="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <Input
                  type="password"
                  name="password"
                  label="Temporary Password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </div>
            </div>

            {/* Success message */}
            {this.state.success && (
              <div className="add-staff__success">
                Staff Updated successfully! 👌
              </div>
            )}

            {/* Error message */}
            {this.state.error && (
              <div className="add-staff__error">{this.state.error}</div>
            )}
            <div className="add-staff__depart">
              <h3 className="add-staff__info-heading">DEPARTMENT</h3>
              <label className="add-staff__label" htmlFor="department">
                Department
              </label>
              <select
                name="department"
                id="department"
                className="add-staff__select"
              >
                <option value="Education">Education</option>
                <option value="Computer">Computer Science</option>
                <option value="Health">Health Science</option>
              </select>
            </div>
            <Button text="Edit Staff" />
          </form>
        </main>
      )
    
  }
}

export default EditStaff
