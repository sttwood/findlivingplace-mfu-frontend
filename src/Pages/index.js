import React from "react"
import { Link } from 'react-router-dom'

import ShowNewPost from "../Components/showcase/ShowNewPost"

// MUI
import { Button } from '@mui/material'

// antd
import { Divider } from "antd";
// images
import Banner from '../Assets/Images/banner-index.png'
import { ImFire } from 'react-icons/im'
// Styles
import Container from 'react-bootstrap/Container'


const index = () => {

  return (
    <>
      <img src={Banner} alt='banner' style={{ width: '100%', height: '350px' }} />
      <Container className='py-5'>
        <Divider orientation="left" plain>
          <h2>
            <ImFire color='#FF2525FF' />New Place Suggestion!!
          </h2>
        </Divider>
        <ShowNewPost />
        <Button
          className="mt-2"
          style={{ display: 'block', margin: '0 auto', width: '10%' }}
          variant="contained"
          component={Link}
          to='/places'
        >
          See more...
        </Button>
      </Container>
    </>
  )
}

export default index
