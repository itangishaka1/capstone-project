import { Component } from 'react'
import './Dashboard.scss'
// import Button from '../../components/AddButton/AddButton'
import Staff from '../../assets/images/staffs.jpg'
import Students from '../../assets/images/students.jpg'
import Books from '../../assets/images/books.jpg'
import Task from '../../components/Task/Task'
import { Redirect } from 'react-router-dom'
import axios from 'axios'


class Dashboard extends Component {
    state = {
       failedAuth: false,
       user: null
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
            user: (res.data)[0]
          })
      })
      .catch(err => {
        console.log('Error: ', err.response)
         this.setState({
            failedAuth: true
         })
      })

    }

   routes = {
     addStaff: "/admin/newStaff",
     editStaff: "/admin/staffs",
     addStudent: "/admin/newStudent",
     editStudent: "/admin/students",
     addCourse: "/admin/newCourse",
     editCourse: "/admin/edit-course",
  }


  
  render(){
    if(this.state.failedAuth){
      return (<div>
        <Redirect to="/login-in"  />
      </div> )
    }

    if(!this.state.user){
      return (
        <div className='dashboard__loading'>
          <p>Loading...</p>
        </div>
      )
    }

    const { first_name, last_name } = this.state.user
  return (
    <main className='dashboard'>
          <h1 className="dashboard__heading">Welcome 😃 <br></br>{first_name} {last_name}</h1>
        <section className="dashboard__tasks">
          <Task image={Staff} addRoute={this.routes.addStaff} editRoute={this.routes.editStaff} heading="Manage Staff" desc="Manage your staff here.  
            Here, you can add new staff, edit or delete one of the current stuffs. " />
          <Task image={Students} addRoute={this.routes.addStudent} editRoute={this.routes.editStudent} heading="Manage Student" desc="Manage student here.  
            Here, you can add new student, edit or delete one of the current student." />
          <Task image={Books} addRoute={this.routes.addCourse} editRoute={this.routes.editCourse} heading="Manage Courses" desc="Manage courses here.  
            Here, you can add new course, edit or delete one of the existing courses. " />
        </section>
    </main>
  )
  }
}

export default Dashboard