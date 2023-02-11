import React, { useState } from "react"
import { useSelector } from "react-redux"

// Functions
import { 
  changeFirstname, 
  changeLastname, 
  changeTelephone, 
  changePassword 
} from "../../Services/Functions/users"

// antd
import { Modal } from "antd"
import { Divider } from 'antd'
// bootstrap
import { Container } from "react-bootstrap"

// MUI
import { Box, TextField, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
// icons
import { BiEdit } from 'react-icons/bi'

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


const MyAccount = () => {
  const { user } = useSelector((state) => ({ ...state }))



  // [VARIABLE]
  // password
  const [ modalPasswordOpen, setModalPasswordOpen ] = useState(false)
  const [ Passwordvalues, setPasswordValues ] = useState({
    id: "",
    password: "",
  })
  // firstname
  const [ modalFirstNameOpen, setModalFirstNameOpen ] = useState(false)
  const [ FirstNamevalues, setFirstNamevalues ] = useState({
    id: "",
    firstname: "",
  })
  // lastname
  const [ modalLastNameOpen, setModalLastNameOpen ] = useState(false)
  const [ LastNamevalues, setLastNamevalues ] = useState({
    id: "",
    lastname: "",
  })
  // telephone
  const [ modalTelephoneOpen, setModalTelephoneOpen ] = useState(false)
  const [ Telephonevalues, setTelephonevalues ] = useState({
    id: "",
    telephone: "",
  })

  // [HANDLE FUNCTION]
  // firstname
  const handleChangeFirstname = (e) => {
    setFirstNamevalues({ ...FirstNamevalues, [ e.target.name ]: e.target.value })
    console.log(FirstNamevalues)
  }
  const handleOkfirstname = () => {
    setFirstNamevalues(false)
    changeFirstname(user.token, FirstNamevalues.id, { FirstNamevalues })
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  // lastname
  const handleChangeLastname = (e) => {
    setLastNamevalues({ ...LastNamevalues, [ e.target.name ]: e.target.value })
    console.log(LastNamevalues)
  }
  const handleOklastname = () => {
    setLastNamevalues(false)
    changeLastname(user.token, LastNamevalues.id, { LastNamevalues })
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  // telephone
  const handleChangeTelephone = (e) => {
    setTelephonevalues({ ...Telephonevalues, [ e.target.name ]: e.target.value })
    console.log(Telephonevalues)
  }
  const handleOktelephone = () => {
    setTelephonevalues(false)
    changeTelephone(user.token, Telephonevalues.id, { Telephonevalues })
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  //password
  const handleChangePassword = (e) => {
    setPasswordValues({ ...Passwordvalues, [ e.target.name ]: e.target.value })
    console.log(Passwordvalues)
  }
  const handleOkPassword = () => {
    setModalPasswordOpen(false)
    changePassword(user.token, Passwordvalues.id, { Passwordvalues })
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  // [MODAL]
  // open
  const showModalFirstName = (id) => {
    setModalFirstNameOpen(true)
    setFirstNamevalues({ ...FirstNamevalues, id: id })
  }
  const showModalLastName = (id) => {
    setModalLastNameOpen(true)
    setLastNamevalues({ ...LastNamevalues, id: id })
  }
  const showModalTelephone = (id) => {
    setModalTelephoneOpen(true)
    setTelephonevalues({ ...Telephonevalues, id: id })
  }
  const showModalPassword = (id) => {
    setModalPasswordOpen(true)
    setPasswordValues({ ...Passwordvalues, id: id })
  }
  // close
  const handleCancelFirstName = () => {
    setModalFirstNameOpen(false)
  }
  const handleCancelLastName = () => {
    setModalLastNameOpen(false)
  }
  const handleCancelTelephone = () => {
    setModalTelephoneOpen(false)
  }
  const handleCancelPassword = () => {
    setModalPasswordOpen(false)
  }


  return (
    <Container className="container-fluid" style={{ height: '100vh' }}>
      <div className="row">
        <div className="col">
          <Divider orientation='left'>
            <h1>My Account</h1>
          </Divider>
          <form>
            {/* [Email] */}
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>
              <StyleInputText
                label='Email'
                variant='outlined'
                type='text'
                sx={{ width: '100%' }}
                value={user.email}
                disabled
              />
              <IconButton
                size="large"
                aria-label="edit email"
                sx={{ margin: '5px' }}
                disabled
              >
                <BiEdit sx={{ fontSize: '36px'}} />
              </IconButton>
            </Box>
            {/* [First Name] */}
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>
              <StyleInputText
                label='First Name'
                variant='outlined'
                type='text'
                sx={{ width: '100%' }}
                value={user.firstname}
                disabled
              />
              <IconButton
                size="large"
                aria-label="edit first name"
                onClick={() => showModalFirstName(user._id)}
                sx={{  color: '#E4AD35FF', margin: '5px' }}
              >
                <BiEdit sx={{ fontSize: '36px'}} />
              </IconButton>
            </Box>
            
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>
              <StyleInputText
                label='Last Name'
                variant='outlined'
                type='text'
                sx={{ width: '100%' }}
                value={user.lastname}
                disabled
              />
              <IconButton
                size="large"
                aria-label="edit last name"
                onClick={() => showModalLastName(user._id)}
                sx={{  color: '#E4AD35FF', margin: '5px' }}
              >
                <BiEdit sx={{ fontSize: '36px'}} />
              </IconButton>
            </Box>

            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>
              <StyleInputText
                label='Phone Number'
                variant='outlined'
                type='text'
                sx={{ width: '100%' }}
                value={user.telephone}
                disabled
              />
              <IconButton
                size="large"
                aria-label="edit phone number"
                onClick={() => showModalTelephone(user._id)}
                sx={{  color: '#E4AD35FF', margin: '5px' }}
              >
                <BiEdit sx={{ fontSize: '36px'}} />
              </IconButton>
            </Box>

          </form>  
          <form>
            <Divider orientation='left'>
              <h1>Change Password</h1>
            </Divider>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>
              <StyleInputText
                label='Password'
                variant='outlined'
                type='password'
                sx={{ width: '100%' }}
                value={user.password}
                disabled
              />
              <IconButton
                size="large"
                aria-label="edit phone number"
                onClick={() => showModalPassword(user._id)}
                sx={{  color: '#E4AD35FF', margin: '5px' }}
              >
                <BiEdit sx={{ fontSize: '36px'}} />
              </IconButton>
            </Box>
          </form>
        </div>
      </div>

      {/* [MODAL] */}
      {/* password */}
      <Modal
        title="Change Password"
        open={modalPasswordOpen}
        onOk={handleOkPassword}
        onCancel={handleCancelPassword}
      >
        <form>
          <label>Enter new password</label>
          <input
            className="form-control"
            onChange={handleChangePassword}
            type='password'
            name="password"
          />
        </form>
        <br />
      </Modal>
      {/* firstname */}
      <Modal
        title="Change First Name"
        open={modalFirstNameOpen}
        onOk={handleOkfirstname}
        onCancel={handleCancelFirstName}
      >
        <form>
          <label>Enter new First Name</label>{" "}
          <input
            className="form-control"
            placeholder={user.firstname}
            onChange={handleChangeFirstname}
            type="text"
            name="firstname"
          />
        </form>
      </Modal>
      {/* lastname */}
      <Modal
        title="Change Last Name"
        open={modalLastNameOpen}
        onOk={handleOklastname}
        onCancel={handleCancelLastName}
      >
        <form>
          <label>Enter new Last Name</label>{" "}
          <input
            className="form-control"
            placeholder={user.lastname}
            onChange={handleChangeLastname}
            type="text"
            name="lastname"
          />
        </form>
      </Modal>
      {/* telephone */}
      <Modal
        title="Change Phone Number"
        open={modalTelephoneOpen}
        onOk={handleOktelephone}
        onCancel={handleCancelTelephone}
      >
        <form>
          <label>Enter new Phone Number</label>{" "}
          <input
            className="form-control"
            placeholder={user.telephone}
            onChange={handleChangeTelephone}
            type="text"
            name="telephone"
          />
        </form>
      </Modal>

    </Container>
  )
}

export default MyAccount