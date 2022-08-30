import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Sidebar from './components/Sidebar/Sidebar'
import Profile from './pages/Profile/Profile'

import AddStudent from './pages/AddStudent/AddStudent'
import EditStudent from './pages/EditStudent/EditStudent'
import Students from './pages/Students/Students'

import AddCourse from './pages/AddCourse/AddCourse'
import EditCourse from './pages/EditCourse/EditCourse'
import Courses from './pages/Courses/Courses'

import AddStaff from './pages/AddStaff/AddStaff'
import EditStaff from './pages/EditStaff/EditStaff'
import StaffList from './pages/StaffList/StaffList'

import SignUpPage from './pages/SignUpPage/SignUpPage'
import LoginPage from './pages/LoginPage/LoginPage'
import Home from './pages/Home/Home'
import NotFound from './components/NotFound/NotFound'

import './App.scss'


function App() {
  return (
    <BrowserRouter className="app">
        <Switch>
          
           <Route path="/" component={Home}  exact/>
           <Route path="/sign-up" component={SignUpPage} />
           <Route path="/login-in" component={LoginPage} />
         
           
           <Switch>
            <>
            <div className="admin-others-container"> 
              <Sidebar />
              <Route path="/admin/dashboard" component={Dashboard} />
              <Route path="/admin/profile" component={Profile} />

              <Route path="/admin/newStaff" component={AddStaff} />
              <Route path="/admin/Staff/:id" component={EditStaff} />

              <Route path="/admin/staffs"  component={StaffList} />

              <Route path="/admin/students/:id" component={EditStudent} />
              <Route path="/admin/students" exact  component={Students} />
              <Route path="/admin/newStudent" component={AddStudent} />

              <Route path="/admin/newCourse" component={AddCourse} />
              <Route path="/admin/edit-course" component={EditCourse} />
              <Route path="/admin/courses" component={Courses} />

            </div>
            </>
           </Switch>
           <Route component={NotFound} /> 
        </Switch>
    </BrowserRouter>
  );
}

export default App;
