import React, { useState, useEffect } from 'react'

//function
import { ReadCategory, EditCategory } from "../../../Services/Functions/category"
import { useParams, useNavigate } from 'react-router-dom'

//redux
import { useSelector } from 'react-redux'

const UpdateCategory = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const navigate = useNavigate();
    const param = useParams();

    const [ name, setName ] = useState('')

    useEffect(() => {
        loadData(user.token, param.id)
        // eslint-disable-next-line
    }, []);

    const loadData = (authtoken, id) => {
        ReadCategory(authtoken, id)
            .then((res) => {
                setName(res.data.name);
            }).catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        EditCategory(user.token, param.id, { name })
            .then((res) => {
                navigate('/admin/create-category')
                alert('Update ' + res.data.name + ' success!')
            })
            .catch(err => console.log(err));
    };
    
    const handleCancel = (e) => {
        e.preventDefault()
        navigate('/admin/create-category')
    }

    return (
        <div 
            className="container fluid py-5"
            style={{
                height: '100vh',
            }}
        >
            <div className='row'>
                <div className='col'>
                    <h1>Update Page</h1>

                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Update Category</label>
                            <input
                                className='form-control'
                                value={name}
                                autoFocus
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button className='btn btn-outline-primary'>Submit</button>
                            <button className='btn btn-outline-danger' onClick={handleCancel}>Cancel</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default UpdateCategory
