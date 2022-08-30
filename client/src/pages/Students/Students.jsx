import './Students.scss'
import { Component } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import { Link, Redirect } from 'react-router-dom'
import { DeleteOutline} from "@mui/icons-material"
import Button from '../../components/Button/Button'

class Students extends Component {
   state ={
      students : [],
      failedAuth: false,
      error: '',
      // success: ''
   }


  componentDidMount() {
    const authToken = sessionStorage.getItem('authToken')

    if(!authToken) {
       this.setState({ failedAuth: true})
    }
    axios.get('https://relax-admin.herokuapp.com/student/', {
      headers: {
        authorization: `Bearer ${authToken}`
      }
  })
  .then(res => {
      this.setState({
        failedAuth: false,
        students: res.data,

      })
  })
  .catch(err => {
    console.log('students Error: ', err)
     this.setState({
        failedAuth: true,
        error:err.response.data
     })
  })
} 

  handleDelete =(id) => {

    const authToken = sessionStorage.getItem("authToken")
    if(!authToken) {
       this.setState({
          failedAuth: true,
          error: "Please login first"
        })
    }
    
    axios.delete(`https://relax-admin.herokuapp.com/student/${id}`, { headers: {Authorization: `Bearer ${authToken}`}})
    .then(res => {
       this.setState({
        students: this.state.students.filter(item => item.id !== id)
      })
    })
     .catch(err => {
        console.log(err.data)
     })

  
}



columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'first_name', headerName: 'First Name', width: 150 },
  { field: 'last_name', headerName: 'Last Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'parent_email', headerName: 'Parent Email', width: 150 },
  { field: 'parent_phone', headerName: 'Parent Phone', width: 150 },
  { field: 'address', headerName: 'Address', width: 150 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
        return (
            <> 
            <Link to={"/admin/students/"+params.row.id}>
               <button className="staff__btn--edit">Edit</button>
            </Link>
               <DeleteOutline className="staff__icon--delete" onClick={()=>this.handleDelete(params.row.id)} />
            </>
        )
    }
  },


];


  render(){
    return (
      <main className='staff'>
        {this.state.failedAuth && (
          <Redirect to ="/login-in" />
        )}
          <div className="stuff__top">
            <Link to="/admin/newStudent" className='staff__btn link'>
               <Button text="Add New Student" className="staff__btn" />
            </Link>
          </div>
    
          <DataGrid
          rows={this.state.students}
          columns={this.columns}
          pageSize={7}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          className='staff__dataDrid'
        />
      </main>
    )
  }
}

export default Students