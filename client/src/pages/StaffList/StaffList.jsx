import { Component } from 'react'
import './StaffList.scss'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import { Link, Redirect } from 'react-router-dom'
import { DeleteOutline} from "@mui/icons-material"
import Button from '../../components/Button/Button'
class StaffList extends Component {

  state = {
    failedAuth: false,
    error: "",
    staffs: []

  }

  componentDidMount() {
    const authToken = sessionStorage.getItem("authToken")
    if(!authToken) {
       this.setState({
          failedAuth: true,
          error: "Please login first"
        })
    }

    
    axios.get('https://relax-admin.herokuapp.com/staff', { headers: {Authorization: `Bearer ${authToken}`}})
         .then(res => {
             this.setState({
                staffs: res.data,
                error: ""
             })
         })
         .catch(err => {
            this.setState({
              failedAuth: true,
               error : err.response.data
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
    
    axios.delete(`https://relax-admin.herokuapp.com/staff/${id}/delete`, { headers: {Authorization: `Bearer ${authToken}`}})
    .then(res => {
       console.log("from delete success: ", res.data)
       this.setState({
        staffs: this.state.staffs.filter(item => item.id !== id)
      })
    })
     .catch(err => {
        console.log(err.data)
        this.setState({ error: err.response.data})
     })
}

  columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
          return (
              <> 
              <Link to={"/admin/Staff/"+params.row.id}>
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
        <Redirect to="/login-in" />
      )}
        <div className="stuff__top">
          <Link to="/admin/newStaff" className='staff__btn link'>
             <Button text="Add New Staff" className="staff__btn" />
          </Link>
        </div>
  
        <DataGrid
        rows={this.state.staffs}
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

export default StaffList