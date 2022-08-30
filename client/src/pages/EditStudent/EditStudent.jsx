import { Component } from "react"
import { Link, Redirect } from 'react-router-dom'
import axios from "axios"
import "./EditStudent.scss"
import InputStudent from "../../components/InputStudent/InputStudent"
import Button from "../../components/Button/Button"
import Student from '../../assets/images/student.jpg'
import {Upload } from "@mui/icons-material"
class EditStudent extends Component {
  state = {
    student: null,
    address: "",
    email: "",
    first_name: "",
    last_name: "",
    parent_email: "",
    parent_phone: "",
    password: "",
    success_update: false,
    error: "",
    failedAuth: false
  }

  componentDidMount() {
    const authToken = sessionStorage.getItem("authToken")

    if (!authToken) {
      this.setState({ failedAuth: true })
    }

    const studentId = this.props.match.params.id

    axios
      .get(`https://relax-admin.herokuapp.com/student/${studentId}`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then(res => {
        this.setState({
          student: res.data,
          address: res.data.address,
          email: res.data.email,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          parent_email: res.data.parent_email,
          parent_phone: res.data.parent_phone,
        })
      })
      .catch(err => {
        console.log("student error: ", err)
        this.setState({
          failedAuth: true,
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
      this.setState({ failedAuth: true })
    }

    const updatedStudent = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      parent_phone: this.state.parent_phone,
      parent_email: this.state.parent_email,
      email: this.state.email,
      address: this.state.address,
      password: this.state.password
    }

    console.log('updatedStudent: ', updatedStudent)
    const studentId = this.props.match.params.id
    axios
      .put(`https://relax-admin.herokuapp.com/student/${studentId}`, updatedStudent, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then(res => {
        console.log('updatedStudent success: ', res.data)
          this.setState({
            success_update: true,
            error: "",
            address: "",
            email: "",
            first_name: "",
            last_name: "",
            parent_email: "",
            parent_phone: "",
            password: ""
          })
      })
      .catch(err => {
        console.log('updatedStudent error: ',err)
        this.setState({
          error: err.response.data.error,
          success_update: false,
        })
      })
  }

  render(){
    return (
      <main className='edit-student'>
        { this.state.failedAuth && ( <Redirect to="/login-in"  /> )}
        <div className="edit-student__top">
           <h1 className="edit-student__title">Edit Student</h1>
           <Link to="/admin/students">
               <Button text="All Students" />
           </Link>
        </div>
        <form className="edit-student__form" onSubmit={this.handleSubmit}>
          <div className="edit-student__form-left">
          <InputStudent   
              label="First Name"
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
          />
            <InputStudent   
              label="Last Name"
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
          />

          <InputStudent   
              label="Address"
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
          />
          <InputStudent   
              label="Email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
          />
          <InputStudent   
              label="Parent email"
              type="email"
              name="parent_email"
              value={this.state.parent_email}
              onChange={this.handleChange}
          />
          <InputStudent   
              label="Parent phone"
              type="tel"
              name="parent_phone"
              value={this.state.parent_phone}
              onChange={this.handleChange}
          />
          <InputStudent   
              label="Temporary password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
          />
          {
            this.state.success_update && (
              <div className="edit-student__success">
                 Success, Student has been updated! 👌
              </div>
            )
          }
          {
            this.state.error && (
              <div className="edit-student__error">
                 {this.state.error} !!!
              </div>
            )
          }
          <Button text="Update" className="edit-student__btn-submit" />
          </div>
          <div className="edit-student__form-right">
            <img src={Student} alt="student" className="edit-student__image" />
            <div className="edit-student__btn">
              <Upload className='edit-student__icon' />
              <Button text="Upload" />
            </div>
          </div>
        </form>
      </main>
    )
}
}

export default EditStudent
