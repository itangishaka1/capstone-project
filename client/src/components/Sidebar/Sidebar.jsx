import { Component } from "react"
import "./Sidebar.scss"
import { Link } from "react-router-dom"
import MenuItem from "../MenuItem/MenuItem"
import {
  AccountBox,
  Class,
  Home,
  HomeWork,
  LibraryBooks,
  Logout,
  ManageAccounts,
  People,
  School,
} from "@mui/icons-material"

import React from "react"
class Sidebar extends Component {
  componentDidMount() {
    const authToken = sessionStorage.getItem("authToken")
  }

  handleLogout = () => {
    sessionStorage.removeItem("authToken")
  }

  render() {
    return (
      <aside className="sidebar">
        <Link to="/" className="link">
          <h1 className="sidebar__title">RELAX &nbsp;&nbsp;ADMIN</h1>
        </Link>

        <Link to="/admin/dashboard" className="link">
          <MenuItem title="Overview" icon={Home} />
        </Link>

        <Link to="/admin/profile" className="link">
          <MenuItem title="Profile" icon={AccountBox} />
        </Link>

        <Link to="/admin/Staffs" className="link">
          <MenuItem title="Staffs" icon={People} />
        </Link>

        <Link to="/admin/students" className="link">
          <MenuItem title="Students" icon={School} />
        </Link>

        <Link to="/admin/courses" className="link">
          <MenuItem title="Courses" icon={LibraryBooks} />
        </Link>

        <MenuItem title="Classes" icon={Class} />
        <MenuItem title="Dept" icon={HomeWork} className="sidebar__dept" />
        <MenuItem title="Settings" icon={ManageAccounts} />

        <Link to="/" className="link" onClick={this.handleLogout}>
          <MenuItem title="Logout" icon={Logout} />
        </Link>
      </aside>
    )
  }
}

export default Sidebar
