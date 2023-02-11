import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// Image Upload
import FileUpload from './FileUpload'

// React Quill
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// Bootstrap
import Container from 'react-bootstrap/Container'

//function
import { createPlace } from '../../../Services/Functions/place'
import { listCategory } from '../../../Services/Functions/category'

// MUI
import {
    TextField,
    Select,
    Card,
    MenuItem,
    InputLabel,
    FormControl,
    FormControlLabel,
    Checkbox,
    FormGroup,
    InputAdornment,
    IconButton
} from '@mui/material'
import { styled } from '@mui/material/styles'
// icon
import { FaCarAlt, FaWifi, FaDumbbell, FaTshirt, FaInfoCircle, FaSnowflake } from 'react-icons/fa'
import { MdPets } from 'react-icons/md'
// antd
import { Divider, Modal } from 'antd'

// Images
import GetMapImageStep1 from '../../../Assets/Images/how-to-get-maps-iframe-1.png'
import GetMapImageStep2 from '../../../Assets/Images/how-to-get-maps-iframe-2.png'

// Stlyes
const StyleInputText = styled(TextField)`
    & .MuiOutlinedInput-notchedOutline {
        height: 100%;
        border-radius: 10px;
        border: 2px solid rgba(0, 0, 0, 0.6);
        transition: 0.5s;
    } &:hover fieldset {
        borderColor: grey;
    }
`

const CreatePlace = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [ values, setValues ] = useState({
        title: '',
        description: '',
        water_bill: '',
        electricity_bill: '',
        categories: [],
        category: '',
        price: '',
        carpark: false,
        free_wifi: false,
        pet: false,
        gym: false,
        washing_machine: false,
        airconditioner: false,
        telephone: '',
        facebook: '',
        line: '',
        location: '',
        images: [],
        email: user.email
    })
    const [ loading, setLoading ] = useState(false)
    //Map Modal
    const [isModalMapOpen, setIsModalMapOpen] = useState(false)
    const showModalMap = () => {
        setIsModalMapOpen(true)
    }
    const handleOkMap = () => {
        setIsModalMapOpen(false)
    }
    const handleCancelMap = () => {
        setIsModalMapOpen(false)
    }


    useEffect(() => {
        loadData(user.token)
        // eslint-disable-next-line
    }, [])

    const loadData = (authtoken) => {
        listCategory(authtoken)
            .then(res => {
                console.log(res.data)
                setValues({ ...values, categories: res.data })
            }).catch(err => {
                console.log(err)
            })
    }
    console.log('values', values)

    const handleChange = (e) => {
        setValues({ ...values, [ e.target.name ]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createPlace(user.token, values)
            .then(res => {
                console.log(res)
                window.location.reload()
                alert('Create Post ' + res.data.title + ' succesfully!')
            }).catch(err => {
                console.log(err.response)
                alert(err.response.data)
            })
    }

    return (
        <Container className='container-fluid'>
            <div className='row'>
                <div className='col'>

                    <Divider orientation='left'>
                        <h1>Create Post</h1>
                    </Divider>
                    <form onSubmit={handleSubmit}>
                        {/* [Image upload] */}
                        <Divider orientation='left' orientationMargin='0'>
                            <h4>Images</h4>
                        </Divider>
                        <FileUpload
                            loading={loading}
                            setLoading={setLoading}
                            values={values}
                            setValues={setValues}
                        />

                        {/* [Title & Category] */}
                        <Divider orientation='left' orientationMargin='0'>
                            <h4>Name</h4>
                        </Divider>
                        <div className='form-group'>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                {/* [Living place Name] */}
                                <div style={{ width: '75%' }}>
                                    <StyleInputText
                                        label='Title'
                                        variant='outlined'
                                        type='text'
                                        name='title'
                                        sx={{ width: '100%' }}
                                        value={values.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* [Category] */}
                                <FormControl sx={{ width: '23%' }} required>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        label='Category'
                                        name='category'
                                        onChange={handleChange}
                                        required
                                        sx={{
                                            '.MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(228, 219, 233, 0)',
                                                height: '100%',
                                                borderRadius: '10px',
                                                border: '2px solid rgba(0, 0, 0, 0.6)',
                                                transition: '0.5s',
                                                outline: 'none',
                                            },
                                            // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            //     borderColor: 'rgba(228, 219, 233, 0.25)',
                                            // },
                                            // '&:hover .MuiOutlinedInput-notchedOutline': {
                                            //     borderColor: 'rgba(228, 219, 233, 0.25)',
                                            // },
                                            // '.MuiSvgIcon-root ': {
                                            //     fill: 'white !important',
                                            // }
                                        }}
                                    >
                                        {values.categories.length > 0 &&
                                            values.categories.map((item) =>
                                                <MenuItem
                                                    key={item._id}
                                                    value={item._id}
                                                >{item.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        {/* [Utility & Cost] */}
                        <Divider orientation='left' orientationMargin='0'>
                            <h4>Utility & Cost</h4>
                        </Divider>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            {/* [Price rental] */}
                            <div style={{ width: '32%' }}>
                                <StyleInputText
                                    label='Price'
                                    variant='outlined'
                                    type='number'
                                    name='price'
                                    sx={{ width: '100%' }}
                                    value={values.price}
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">฿ / Month</InputAdornment>,
                                    }}
                                />
                            </div>

                            {/* [Water bill] */}
                            <div style={{ width: '32%' }}>
                                <StyleInputText
                                    label='Water bill'
                                    variant='outlined'
                                    type='number'
                                    name='water_bill'
                                    sx={{ width: '100%' }}
                                    value={values.water_bill}
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">฿ / Month</InputAdornment>,
                                    }}
                                />
                            </div>

                            {/* [Electric bill] */}
                            <div style={{ width: '32%' }}>
                                <StyleInputText
                                    label='Electricity Bill'
                                    variant='outlined'
                                    type='number'
                                    name='electricity_bill'
                                    sx={{ width: '100%' }}
                                    value={values.electricity_bill}
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">฿ / Unit</InputAdornment>,
                                    }}
                                />
                            </div>
                        </div>

                        {/* [Facilitiy] */}
                        <Divider orientation="left" orientationMargin="0">
                            <h4>Facility</h4>
                        </Divider>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                            {/* [Facilities] */}
                            <div className='col-4'>
                                <FormGroup>
                                    {/* carpark */}
                                    <FormControlLabel
                                        control={
                                            <>
                                                <Checkbox
                                                    type='checkbox'
                                                    name='carpark'
                                                    value={values.carpark}
                                                    onChange={() => setValues(prev => ({ ...prev, carpark: !prev.carpark }))}
                                                />
                                            </>
                                        }
                                        label={
                                            <>
                                                <FaCarAlt />
                                                {" "}Carpark 
                                            </>
                                        }
                                    />

                                    {/* free wifi */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                type='checkbox'
                                                name='free_wifi'
                                                value={values.free_wifi}
                                                onChange={() => setValues(prev => ({ ...prev, free_wifi: !prev.free_wifi }))}
                                            />
                                        }
                                        label={
                                            <>
                                                <FaWifi />
                                                {" "}Free Wifi 
                                            </>
                                        }
                                    />
                                </FormGroup>
                            </div>

                            <div className='col-4'>
                                <FormGroup>
                                    {/* pet */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                type='checkbox'
                                                name='pet'
                                                value={values.pet}
                                                onChange={() => setValues(prev => ({ ...prev, pet: !prev.pet }))}
                                            />
                                        }
                                        label={
                                            <>
                                                <MdPets />
                                                {" "}Pet 
                                            </>
                                        }
                                    />

                                    {/* gym */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                type='checkbox'
                                                name='gym'
                                                value={values.gym}
                                                onChange={() => setValues(prev => ({ ...prev, gym: !prev.gym }))}
                                            />
                                        }
                                        label={
                                            <>
                                                <FaDumbbell />
                                                {" "}Gym 
                                            </>
                                        }
                                    />
                                </FormGroup>
                            </div>

                            <div className='col-4'>
                                <FormGroup>
                                    {/* washing machine */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                type='checkbox'
                                                name='washing_machine'
                                                value={values.washing_machine}
                                                onChange={() => setValues(prev => ({ ...prev, washing_machine: !prev.washing_machine }))}
                                            />
                                        }
                                        label={
                                            <>
                                                <FaTshirt />
                                                {" "}Washing Machine 
                                            </>
                                        }
                                    />

                                    {/* air Conditioner */}
                                    <FormControlLabel
                                        control={
                                            <>
                                                <Checkbox
                                                    type='checkbox'
                                                    name='airconditioner'
                                                    label='Air Conditioner'
                                                    value={values.airconditioner}
                                                    onChange={() => setValues(prev => ({ ...prev, airconditioner: !prev.airconditioner }))}
                                                />
                                            </>
                                            
                                        }
                                        label={
                                            <>
                                                <FaSnowflake />
                                                {" "}Air Conditioner 
                                            </>
                                        }
                                    />
                                </FormGroup>
                            </div>
                        </div>

                        {/* [Contact] */}
                        <Divider orientation="left" orientationMargin="0">
                            <h4>Contact</h4>
                        </Divider>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <div style={{ width: '32%' }}>
                                <StyleInputText
                                    label="Phone Number"
                                    variant="outlined"
                                    type="text"
                                    name="telephone"
                                    sx={{ width: '100%' }}
                                    value={values.telephone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div style={{ width: '32%' }}>
                                <StyleInputText
                                    label="Facebook"
                                    variant="outlined"
                                    type="text"
                                    name="facebook"
                                    sx={{ width: '100%' }}
                                    value={values.facebook}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div style={{ width: '32%' }}>
                                <StyleInputText
                                    label="Line id"
                                    variant="outlined"
                                    type="text"
                                    name="line"
                                    sx={{ width: '100%' }}
                                    value={values.line}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* [Living place Detail] */}
                        <Divider orientation="left" orientationMargin="0">
                            <h4>Detail</h4>
                        </Divider>
                        <div className='form-group'>
                            <ReactQuill
                                placeholder='type your living place infomation...'
                                name='description'
                                theme='snow'
                                value={values.description}
                                onChange={(value) => setValues({ ...values, description: value })}
                            />
                        </div>

                        {/* [Living place Map] */}
                        <Divider orientation='left' orientationMargin='0'>
                            <h4>
                                Google Map
                                <IconButton
                                    size="large"
                                    aria-label="edit email"
                                    sx={{ color: '#E4AD35FF', marginLeft: '5px' }}
                                    onClick={showModalMap}
                                >
                                    <FaInfoCircle />
                                </IconButton>
                            </h4>
                        </Divider>
                        <div className='form-group'>
                            <StyleInputText
                                label='Place you Google Map code'
                                variant='outlined'
                                type='text'
                                name='location'
                                sx={{ width: '100%' }}
                                value={values.location}
                                onChange={handleChange}
                                required
                            />
                            <Card title="Map">
                                <div dangerouslySetInnerHTML={{ __html: `${values.location}` }} />
                            </Card>
                        </div>

                        <br />
                        <button
                            className='btn btn-primary'
                            style={{ float: 'right' }}
                        >Submit</button>
                    </form>
                </div>
            </div>

            {/* [MODAL] */}
            <Modal 
                title={<h4>How to get Google Maps Iframe Code</h4>}
                open={isModalMapOpen} 
                onOk={handleOkMap} 
                onCancel={handleCancelMap}
                width={1000}
            >
                <h5>STEP 1:</h5>
                <img src={GetMapImageStep1} alt='how-to-get-map-1' width={800} />
                <h5>STEP 2:</h5>
                <img src={GetMapImageStep2} alt='how-to-get-map-2' width={800} />
            </Modal>
        </Container>
    )
}

export default CreatePlace