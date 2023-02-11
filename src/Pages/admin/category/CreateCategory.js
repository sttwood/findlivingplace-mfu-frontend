import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

//functions
import { 
  createCategory, 
  listCategory,
  deleteCategory,
} from "../../../Services/Functions/category"

//redux
import { useSelector } from 'react-redux'

const CreateCategory = () => {
  const { user } = useSelector((state)=>({...state}))

  const [values, setValues] = useState({
    name: "",
  })
  const [category, setCategory] = useState([])

  useEffect(() => {
    loadData(user.token)
    // eslint-disable-next-line
  }, [])

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data)
      })
      .catch((err) => {})
  }

  const handleRemove = (id) => {
    if (window.confirm('Are you sure to delete?')){
    deleteCategory(user.token,id)
    .then((res)=>{
        loadData(user.token)
        alert("Remove category "+ res.data.name + " successfull")
    }).catch((err)=>{
        console.log(err)
        alert('Error!!!')
    })
    }
  }

  const handleChangeCategory = (e) => {
    console.log(values.name)
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    createCategory(user.token,values)
      .then((res) => {
        console.log(res)
        alert("Create category "+ res.data.name + " successfull")
        loadData(user.token)
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data)
      })
  }

  return (
    <div 
      className="container fluid py-5"
      style={{
        height: '100vh',
      }}
    >
      <div className="row">
        <div className="col">
          <h2>Manage Category</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group" >
              <label>Add Category</label>
              <div style={{ display: 'flex'}}>
                <input
                type="text"
                name="name"
                value={values.name}
                className="form-control"
                onChange={handleChangeCategory}
                />

                <button className="btn btn-outline-primary">Add</button>
              </div>

              

            </div>
          </form>
          <hr />

          <h2>Category data</h2>
          <ul className="list-group">
            {category.map((item) => (
                <li className="list-group-item">
                    {item.name}

                    <DeleteOutlined 
                    style={{float:"right"}}
                    onClick={()=>handleRemove(item._id)}/>

                    <Link to={`/admin/update-category/${item._id}`}>
                    <EditOutlined
                    style={{float:"right", marginRight: '10px'}}/>
                    </Link>
              

                    
                </li>
                
            ))}
            
            
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CreateCategory
