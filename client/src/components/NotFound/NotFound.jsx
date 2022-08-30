import './NotFound.scss'
import { Link } from 'react-router-dom'
import Topbar from '../Topbar/Topbar'
import Footer from '../Footer/Footer'
import Button from '../Button/Button'

import React from 'react'

const NotFound = () => {
  return (
    <main className='not-found'>
        <Topbar className='not-found__topbar' />
        <section className="not-found__main">
            <div className="not-found__text">
                <p>
                    404 PAGE NOT FOUND
                    </p>
                    <Link to ="/" className='link' >
                    <Button text="BACK HOME" />
                    </Link>
            </div>
        </section>
        <Footer />        
    </main>
  )
}

export default NotFound