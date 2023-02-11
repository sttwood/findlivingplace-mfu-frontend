/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

// css
import '../../Assets/Styles/components/AllPlaceCard.css'
// antd
import { Divider } from "antd";
// MUI
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// icons
import { IoWater } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { FaSnowflake, FaTshirt, FaDumbbell, FaWifi, FaCar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import FaceIcon from '@mui/icons-material/Face';



const AllPlaceCard = ({ place }) => {
    const { 
        _id, 
        title, 
        price, 
        description, 
        water_bill, 
        electricity_bill, 
        carpark,
        pet,
        free_wifi,
        airconditioner,
        gym,
        washing_machine,
        images 
    } = place;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/place/' + _id)
    }

    return (
        <>
            <div 
                className="wrapper" 
                onClick={handleClick}
                style={{ display: 'flex', flexDirection: 'row' }}
            >
                <img
                    position="relative"
                    style={{
                        height: "200px",
                        objectFit: "cover",
                        width: "250px",
                        borderTopLeftRadius: '5px',
                        borderBottomLeftRadius: '5px',
                        marginRight: '15px'
                    }}
                    alt="example"
                    src={images && images.length ? images[ 0 ].url : ""}
                />
                <div style={{ width: '80%', marginRight: '15px' }}>
                    <Stack direction="row" spacing={1} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <div>
                            <h4>{title}</h4>
                            <p
                                style={{
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    display: 'block'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: `${description.replace(/(&nbsp;|<([^>]+)>)/ig, '').substring(0, 120)}`
                                }}
                            />
                        </div>
                        
                        <div>
                            <IoIosArrowForward fontSize={30} />
                        </div>
                    </Stack>
                    
                    <Divider />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <div>
                            <p style={{ color: 'black' }}>
                                <IoWater style={{ color: '#2D76DDFF' }} />
                                ฿ {water_bill} /Month
                            </p>
                            <p style={{ color: 'black' }}>
                                <AiFillThunderbolt style={{ color: '#EBB145FF' }} />
                                ฿ {electricity_bill} /Unit
                            </p>
                        </div>

                        <div>
                            <Stack direction="row" spacing={1} className="mb-2">
                                {carpark == true 
                                    ? <Chip icon={<FaCar style={{ color: 'white' }} />} label="Car parking" color="success" />
                                    : <Chip icon={<FaCar />} label="Car parking" variant="outlined" />
                                }
                                {pet == true 
                                    ? <Chip icon={<MdPets style={{ color: 'white' }} />} label="Pets" color="success" />
                                    : <Chip icon={<MdPets />} label="Pets" variant="outlined" />
                                }
                                {free_wifi == true 
                                    ? <Chip icon={<FaWifi style={{ color: 'white' }} />} label="Free WIFI" color="success" />
                                    : <Chip icon={<FaWifi />} label="With Icon" variant="outlined" />
                                }
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                {airconditioner == true 
                                    ? <Chip icon={<FaSnowflake style={{ color: 'white' }} />} label="Air Condition" color="success" />
                                    : <Chip icon={<FaSnowflake />} label="Air Condition" variant="outlined" />
                                }
                                {gym == true 
                                    ? <Chip icon={<FaDumbbell style={{ color: 'white' }} />} label="Fitness" color="success" />
                                    : <Chip icon={<FaDumbbell />} label="Fitness" variant="outlined" />
                                }
                                {washing_machine == true 
                                    ? <Chip icon={<FaTshirt style={{ color: 'white' }} />} label="Washing Machine" color="success" />
                                    : <Chip icon={<FaTshirt />} label="Washing Machine" variant="outlined" />
                                }
                            </Stack>
                        </div>

                        <div>
                            <h5 style={{ fontWeight: '600' }}>฿{price} /Month</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AllPlaceCard;
