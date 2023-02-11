/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { useSelector } from "react-redux"

// MUI
import {
    Grid,
    Paper,
    Box,
    Button,
    IconButton
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { Container } from '@mui/system'

// antd
import { Card, Badge, Divider  } from "antd"
// CSS
import '../../Assets/Styles/components/SinglePlaceCard.css'
//icons
import { IoWater } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { FaSnowflake, FaTshirt, FaDumbbell, FaWifi, FaCar } from "react-icons/fa";
import { BsLine, BsFacebook, BsTelephoneFill, BsClock } from "react-icons/bs"
import BookmarkIcon from '@mui/icons-material/Bookmark'

// gallery
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

// functions
import { addToFavorite } from "../../Services/Functions/users"




const SinglePlaceCard = ({ place }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const {
        _id,
        title,
        description,
        category,
        price,
        water_bill,
        electricity_bill,
        line,
        facebook,
        telephone,
        images,
        carpark,
        pet,
        free_wifi,
        airconditioner,
        gym,
        washing_machine,
        location
    } = place

    // Add to Favorite
    const handleAddtoFavorite = (e) => {
        if (user) {
            addToFavorite(user.token, _id)
                .then((res) => {
                    alert('Add to favorite place success!')
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert('Please Login first!!!')
            return
        }
    }


    return (
        <Container className="pb-5 pt-4">
            {/* [Carousel] */}
            <div className='mb-2'>
                <Carousel>
                    {images && images.map((item) =>
                        <img
                            src={item.url}
                            key={item.public_id}
                            alt={item.url}
                            style={{ height: '300px', borderRadius: '5px' }}
                        />
                    )}
                </Carousel>
            </div>

            {/* [Price] */}
            <Badge.Ribbon placement="start" color="red" text="HOT">
                <div
                    className='mb-3'
                    style={{
                        border: '1px solid #DDDDDDFF',
                        borderRadius: '5px',
                        padding: '5px',
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <p 
                            style={{ 
                                backgroundColor: '#FEEAEAFF', 
                                borderRadius: '3px', 
                                margin: '5px',
                                marginLeft: '15%', 
                                padding: '5px', 
                                color: '#F82727FF',
                                width: '100%'
                            }}
                        >
                            <BsClock /><strong> Hurry up!</strong> This property is in high demand!
                        </p>
                    </div>
                    <div>
                        <p 
                            style={{ 
                                margin: '5px', 
                                fontSize: '22px', 
                                color: '#DE4436FF', 
                                fontWeight: "500" 
                            }}
                        >
                            ฿ {price} /Month
                        </p>
                    </div>

                </div>
            </Badge.Ribbon>
            

            {/* Left Column */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '66.25%',
                        gap: '10px',
                    }}
                >
                    {/* [Title] */}
                    <div
                        className='mb-2'
                        style={{
                            border: '1px solid #DDDDDDFF',
                            borderRadius: '5px',
                            padding: '5px',
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <p style={{ fontSize: '2rem', color: "black", margin: '5px' }}>{title}</p>
                    </div>

                    {/* [Utils] */}
                    <div style={{ display: 'flex', justifyContent: "space-between", }}>
                        <div
                            className='mb-2'
                            style={{
                                border: '1px solid #DDDDDDFF',
                                borderRadius: '5px',
                                padding: '10px',
                                width: '49%'
                            }}
                        >
                            <Divider orientationMargin="0" orientation="left">
                                <h4 style={{ color: "black" }}>Utility</h4>
                            </Divider>
                            <div className="p-1">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", }}>
                                    <p style={{ color: 'black' }}>
                                        <IoWater style={{ color: '#2D76DDFF' }} />
                                        Water bill
                                    </p>
                                    <p style={{ color: 'black' }}>{water_bill} ฿ /Month</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", }}>
                                    <p style={{ color: 'black' }}>
                                        <AiFillThunderbolt style={{ color: '#EBB145FF' }} />
                                        Electricity bill 
                                    </p>
                                    <p style={{ color: 'black' }}>{electricity_bill} ฿ /Unit</p>
                                </div>
                                
                            </div>
                        </div>

                        <div
                            className='mb-2'
                            style={{
                                border: '1px solid #FFFFFF',
                                borderRadius: '5px',
                                backgroundColor: '#E3F2D6FF',
                                padding: '10px',
                                width: '49%'
                            }}
                        >
                            <Divider orientationMargin="0" orientation="left">
                                <h4 style={{ color: "black" }}>Hygiene Plus</h4>
                            </Divider>
                            <div className="p-1">
                                <p style={{ color: '#1F1F1FFF' }}>
                                <img alt="safe" src="//cdn6.agoda.net/images/default/SafetyFeatures.svg" width="36px" height="36px" />
                                    This property has self-selected and self-certified the following hygiene measures.
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* [Facility] */}
                    <div
                        className='mb-2'
                        style={{
                            border: '1px solid #DDDDDDFF',
                            borderRadius: '5px',
                            padding: '10px',
                        }}
                    >
                        <Divider orientationMargin="0" orientation="left">
                            <h4 style={{ color: "black" }}>Facility</h4>
                        </Divider>
                        <div className="row p-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="col-md-4 pb-2">
                                {carpark == true ? (
                                    <p style={{ color: 'green' }}>
                                        <FaCar /> Car Parking
                                    </p>
                                ) : (
                                    <p className="text-muted">
                                        <FaCar /> Car Parking
                                    </p>
                                )}
                            </div>
                            <div className="col-md-4 pb-2">
                                {pet == true ? (
                                    <p style={{ color: 'green' }}>
                                        <MdPets /> Pets
                                    </p>
                                ) : (
                                    <p className="text-muted">
                                        <MdPets disabled /> Pets
                                    </p>
                                )}
                            </div>
                            <div className="col-md-4 pb-2">
                                {free_wifi == true ? (
                                    <p style={{ color: 'green' }}>
                                        <FaWifi /> Free WIFI
                                    </p>
                                ) : (
                                    <p className="text-muted">
                                        <FaWifi /> Free WIFI
                                    </p>
                                )}
                            </div>
                            <div className="col-md-4 pb-2">
                                {airconditioner == true ? (
                                    <p style={{ color: 'green' }}>
                                        <FaSnowflake /> Air Condition
                                    </p>
                                ) : (
                                    <p className="text-muted">
                                        <FaSnowflake /> Air Condition
                                    </p>
                                )}
                            </div>
                            <div className="col-md-4 pb-2">
                                {gym == true ? (
                                    <p style={{ color: 'green' }}>
                                        <FaDumbbell /> Fitness
                                    </p>
                                ) : (
                                    <p className="text-muted">
                                        <FaDumbbell /> Fitness
                                    </p>
                                )}
                            </div>
                            <div className="col-md-4 pb-2">
                                {washing_machine == true ? (
                                    <p style={{ color: 'green' }}>
                                        <FaTshirt /> Washing Machine
                                    </p>
                                ) : (
                                    <p className="text-muted">
                                        <FaTshirt /> Washing Machine
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* [Description] */}
                    <div
                        style={{
                            border: '1px solid #DDDDDDFF',
                            borderRadius: '5px',
                            padding: '10px',
                        }}
                    >
                        <Divider orientationMargin="0" orientation="left">
                            <h4 style={{ color: "black" }}>Description</h4>
                        </Divider>
                        <div className="p-2" dangerouslySetInnerHTML={{ __html: `${description}` }} />
                    </div>
                </div>

                {/* Right Column */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '32%',
                    gap: '10px'
                }}>
                    {/* [Contact] */}
                    <div
                        className='mb-2'
                        style={{
                            border: '1px solid #DDDDDDFF',
                            borderRadius: '5px',
                            padding: '10px',
                        }}
                    >
                        <Divider orientationMargin="0" orientation="left">
                            <h4 style={{ color: "black" }}>Contact</h4>
                        </Divider>
                        
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", }}>
                            <p style={{ color: 'black' }}><BsLine style={{ color: 'green' }} /> Line ID:</p>
                            <p style={{ color: 'black' }}>{line}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", }}>
                            <p style={{ color: 'black' }}><BsFacebook style={{ color: '#2D76DDFF' }} /> Facebook:</p>
                            <p style={{ color: 'black' }}>{facebook}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", }}>
                            <p style={{ color: 'black' }}><BsTelephoneFill /> Phone Number:</p>
                            <p style={{ color: 'black' }}>{telephone}</p>
                        </div>
                    </div>

                    {/* [Favorite] */}
                    <div
                        style={{
                            border: '1px solid #DDDDDDFF',
                            borderRadius: '5px',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <IconButton
                            size="medium"
                            aria-label="view post"
                            sx={{ color: '#5876FBFF' }}
                            onClick={handleAddtoFavorite}
                        >
                            <BookmarkIcon style={{ color: "#FFBD2EFF", fontSize: '150%' }} />
                        </IconButton>
                        <p>Add to favorite place</p>
                    </div>

                    {/* [Map] */}
                    <div
                        style={{
                            border: '1px solid #DDDDDDFF',
                            borderRadius: '5px',
                            padding: '10px',
                        }}
                    >
                        <Divider orientationMargin="0" orientation="left">
                            <h4 style={{ color: "black" }}>Map</h4>
                        </Divider>
                        <div dangerouslySetInnerHTML={{ __html: `${location}` }} />
                    </div>
                </div>
            </Box>

        </Container>
    )
}

export default SinglePlaceCard
