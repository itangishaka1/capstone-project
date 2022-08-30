import { Component } from 'react'
import './SignUpPage.scss'
import Topbar from '../../components/Topbar/Topbar'
import Footer from '../../components/Footer/Footer'
import { Login } from '@mui/icons-material';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class SignUpPage extends Component {
    state = {
      error: "",
      success: false
    }

    handleSubmit = (event) => {
      event.preventDefault()

      const form = event.target

      const newAdmin = {
        first_name : form.first_name.value,
        last_name : form.last_name.value,
        address: form.address.value,
        phone: form.phone.value,
        email: form.email.value,
        password: form.password.value
      }
      // console.log('Admin Sign Up',newAdmin)
      axios.post('https://relax-admin.herokuapp.com/admin/register', newAdmin)
           .then((response) => {
            console.log(response)
              this.setState({
                 success: true
              })
           })
           .catch((err) => {
            console.log(err.response.data)
              this.setState({
                 error : err.response.data.error
              })
           })
    }

  render(){
    return (
      <div className='signUp'>
        <Topbar  className="signUp__topbar" />
        <main className="signUp__main">
          <h1 className="signUp__title">ADMIN <span>SIGN UP</span></h1>
          <form className="signUp__form" onSubmit={this.handleSubmit}>
            <div className="signUp__subTitle-container">
               <Login className="signUp__icon" />
               <h2 className="signUp__subTitle">Sign Up</h2>
            </div>
            <Input  type="first_name" name="first_name" label="First Name" />
            <Input  type="last_name" name="last_name" label="Last Name" />
            <Input  type="address" name="address" label="Address" />
            <Input  type="phone" name="phone" label="Phone" />
            <Input  type="email" name="email" label="Email" />
            <Input  type="password" name="password" label="Password" />
            {
              this.state.error && (
                <div className="signUp__error">
                   {this.state.error}
                 </div>
              )
            }
            {
              this.state.success && (
                <div className="signUp__success">
                   Account created successfully ! 👌👌
                   <Redirect to="/login-in" />
                 </div>
              )
            }
            <Button text="Sign Up"  className="signUp__btn" />
            <p className="signUp__register">
              Already have an account? <span className="signUp__go-login">
                <Link to="/login-in" className="link">
                   Login
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





export default SignUpPage