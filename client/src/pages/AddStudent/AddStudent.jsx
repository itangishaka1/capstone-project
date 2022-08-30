import './AddStudent.scss'
import {Component} from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import InputStudent from '../../components/InputStudent/InputStudent'
import Button from '../../components/Button/Button'
import {Upload } from "@mui/icons-material"
import Student from '../../assets/images/student.jpg' 


class AddStudent extends Component {
  state = {
    address: "",
    email: "",
    first_name: "",
    last_name: "",
    parent_email: "",
    parent_phone: "",
    password: "",
    success_created: false,
    error: "",
    authFailed: false
  }

  componentDidMount() {
    const authToken = sessionStorage.getItem("authToken") 
    if(!authToken) {
       this.setState({
        authFailed: true
       })
    }

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

    const newStudent = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      parent_phone: this.state.parent_phone,
      parent_email: this.state.parent_email,
      email: this.state.email,
      address: this.state.address,
      password: this.state.password
    }

    axios
      .post(`https://relax-admin.herokuapp.com/student/`, newStudent, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then(res => {
        console.log('newStudent success: ', res.data)
          this.setState({
            success_created: true,
            error: "",
            address: "",
            email: "",
            first_name: "",
            last_name: "",
            parent_email: "",
            parent_phone: "",
            password: ''
          })
      })
      .catch(err => {
        console.log('newStudent error: ',err)
        this.setState({
          error: err.response.data.error,
          success_created: false,
        })
      })
  }

  render(){
      return (
        <main className='add-student'>
          { this.state.authFailed && ( <Redirect to="/login-in"  /> )}
          <div className="add-student__top">
             <h1 className="add-student__title">Add Student</h1>
             <Link to="/admin/students">
                  <Button text="All Students" />
             </Link>
          </div>
          <form className="add-student__form" onSubmit={this.handleSubmit}>
            <div className="add-student__form-left">
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
            {this.state.error && (
               <div className="add-student__error">
                   {this.state.error}
               </div>
            )}
            {this.state.success_created && (
               <div className="add-student__success">
                   Success, Student created!!! 👌
               </div>
            )}
            <Button text="Submit" className="add-student__btn-submit" />
            </div>
            <div className="add-student__form-right">
              <img src={Student} alt="student" className="add-student__image" />
              <div className="add-student__btn">
                <Upload className='add-student__icon' />
                <Button text="Upload" />
              </div>
            </div>
          </form>
        </main>
      )
  }
}

export default AddStudent