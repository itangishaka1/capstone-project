import { Component } from 'react'
import axios from 'axios'
import "./Profile.scss"
import {
  FileUpload,
  HomeWork,
  LibraryBooks,
  People,
  School,
} from "@mui/icons-material"
import Card from "../../components/Card/Card"
import adminPhoto from "../../assets/images/adminImage.jpg"
import Button from "../../components/AddButton/AddButton"
import { Redirect } from 'react-router-dom'

class Profile extends Component {
    state = {
      Students: [],
      Staffs: [],
      Departments: [],
      Courses: [],
      admin: null,
      failedAuth: false,
      error: ""
    }
  
   routes = {
     stuffs: "/admin/staffs",
     students: "/admin/students",
    //  courses: "/admin/courses",
     courses: "",
     department: ""
  }

  componentDidMount() {
    const authToken = sessionStorage.getItem('authToken')

    if(!authToken) {
       this.setState({ failedAuth: true})
    }
    
    axios.get('https://relax-admin.herokuapp.com/admin/current', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => {
        this.setState({
          admin: (res.data)[0]
        })
    })
    .catch(err => {
      console.log('Error: ', err.response)
       this.setState({
          failedAuth: true,
          error: err.response.data
       })
    })

    axios.get('https://relax-admin.herokuapp.com/student/', {
        headers: {
          authorization: `Bearer ${authToken}`
        }
    })
    .then(res => {
        this.setState({
          Students: (res.data)
        })
    })
    .catch(err => {
       this.setState({
          error: err.response.data
       })
    })

    axios.get('https://relax-admin.herokuapp.com/staff/', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => {
        this.setState({
          Staffs: (res.data)
        })
    })
    .catch(err => {
       this.setState({
          error: err.response.data
       })
    })


    axios.get('https://relax-admin.herokuapp.com/department/', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => {
        this.setState({
          Departments: (res.data)
        })
    })
    .catch(err => {
       this.setState({
          error: err.response.data
       })
    })

    axios.get('https://relax-admin.herokuapp.com/course/', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => {
        this.setState({
          Courses: (res.data)
        })
    })
    .catch(err => {
       this.setState({
          error: err.response.data
       })
    })

  }

  render(){ 
    return (
      <main className="profile">
        {this.state.failedAuth && (
          <Redirect to="/login-in" />
        )}
        <section className="profile__cards">
            <Card
              number={this.state.Students.length ? this.state.Students.length : 0 }
              title="Students"
              icon={School}
              className="profile__students"
              route={this.routes.students} 
            />


          <Card
            number={this.state.Staffs.length ? this.state.Staffs.length: 0}
            title="Staffs"
            icon={People}
            className="profile__staffs"
            route={this.routes.stuffs}
          />

            <Card
              number={this.state.Departments.length ? this.state.Departments.length : 0}
              title="Departments (Coming soon)"
              icon={HomeWork}
              className="profile__departments"
              // route = {this.routes.department}
            />

          <Card
            number={this.state.Courses.length ? this.state.Courses.length : 0}
            title="Courses (Coming soon)"
            icon={LibraryBooks}
            className="profile__courses"
            // route={this.routes.courses}
          />
        </section>
            {
              this.state.admin && (

            <section className="profile__admin">
            <div className="profile__admin-left">
              <div className="profile__name">
                <div className="profile__name-name">
                  <span className="profile__name-item">{this.state.admin.first_name}</span>
                  <span className="profile__name-item">{this.state.admin.last_name}</span>
                  <span className="profile__title ">
                    Administrator
                  </span>
                </div>
                <div className="profile__name-contact">
                   <span><span className="profile__email">Email:</span>{this.state.admin.email}</span>            
                   <span><span className="profile__phone">Phone:</span>{this.state.admin.phone}</span>
                   <span><span className="profile__phone">Address:</span> {this.state.admin.address}</span>
                </div>
              </div>
            </div>
            <div className="profile__admin-right">
              <div className="profile__adminPhoto-container">
                <img src={adminPhoto} alt="admin" className="profile__adminPhoto" />
              </div>
              <div className="profile__upload">
                <FileUpload className="profile__upload-icon" />
                <Button text="Upload" />
              </div>
            </div>
          </section>
              )
            }


      </main>
    )
  }

}

export default Profile
