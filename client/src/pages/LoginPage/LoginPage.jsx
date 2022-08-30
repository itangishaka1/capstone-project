import { Component } from 'react'
import './LoginPage.scss'
import Topbar from '../../components/Topbar/Topbar'
import Footer from '../../components/Footer/Footer'
import { Login } from '@mui/icons-material';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const URL = process.env.REACT_APP_URL
// console.log(URL)
class LoginPage extends Component {
     state = {
        success: false,
        error: ""
     }

     handleSubmit = event => {
        event.preventDefault()
        const form = event.target
        const adminCredentials = {
          email: form.email.value,
          password: form.password.value
        }
        
        axios.post('https://relax-admin.herokuapp.com/admin/login', adminCredentials)
             .then(res => {
                sessionStorage.setItem('authToken', res.data.token);
                this.setState({
                   success: true,
                   error: ""
                })
             })
             .catch(err => {
                 console.log('Login error: ',err.response)
                 this.setState({
                  success: false,
                   error: err.response.data.error
                 })
             })


     }

     render() {
       return (
         <div className='login-page'>
           <Topbar  className="login-page__topbar" />
           <main className="login-page__main">
             <h1 className="login-page__title">ADMIN <span>LOGIN</span></h1>
             <form className="login-page__form" onSubmit={this.handleSubmit}>
               <div className="login-page__subTitle-container">
                  <Login className="login-page__icon" />
                  <h2 className="login-page__subTitle">Login</h2>
               </div>
               <Input  type="email" name="email" label="Email" />
               <Input  type="password" name="password" label="Password" />
               {
                this.state.success && (
                   <div className="login-page__success">
                       Login Success 🤝
                       <Redirect to="/admin/dashboard" />
                   </div>
                )
               }
               {
                this.state.error && (
                   <div className="login-page__error">
                       {this.state.error}
                   </div>
                )
               }
               <Button text="Login"  className="login-page__btn" />
               <p className="login-page__register">
                 New Admin? <span className="login-page__go-register">
                   <Link to="/sign-up" className="link">
                      Start Here
                   </Link>
                   </span>
               </p>
             </form>
           </main>
           <Footer />
         </div>
       )
     }
}

export default LoginPage