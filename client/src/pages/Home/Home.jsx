import './Home.scss'
import Topbar from '../../components/Topbar/Topbar'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import HomeImg from '../../assets/images/back-home.jpg'
import Footer from '../../components/Footer/Footer'


const Home = () => {
  return (
    <div className='home'>
      <Topbar   />
        <main className="home__main">
          <div className="home__left">
            <h1 className="home__title">WELCOME TO RELAX ADMIN</h1>
            <p className="home__desc">
              Relax Admin site frees you from stress and gives you the complete functionality to manage staffs, students,and all related administration tasks.
            </p>
            <Link to ="/login-in" className="home__btn">
               <Button text="Enter"  />
            </Link>
          </div>
          <div className="home__right">
            <img src={HomeImg} alt="college" className='home__img' />
          </div>
        </main>
        <Footer />
    </div>
  )
}

export default Home