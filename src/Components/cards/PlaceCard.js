/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

// css
import '../../Assets/Styles/components/PlaceCard.css'
// antd
import { Divider } from "antd";
// icons
import { IoWater } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";




const PlaceCard = ({ place }) => {
    const { _id, title, price, description, water_bill, electricity_bill, images } = place;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/place/' + _id)
    }

    return (
        <>
            <div className="wrapper" onClick={handleClick}>
                <img
                    position="relative"
                    style={{
                        height: "200px",
                        objectFit: "cover",
                        width: "100%",
                        borderTopLeftRadius: '5px',
                        borderTopRightRadius: '5px',
                    }}
                    alt="example"
                    src={images && images.length ? images[ 0 ].url : ""}
                />
                <div className="mt-2">
                    <h4>{title}</h4>
                    <p
                        style={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            display: 'block'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: `${description.replace(/(&nbsp;|<([^>]+)>)/ig, '').substring(0, 140)}`
                        }}
                    />
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
                            <h5>฿{price} /Month</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PlaceCard;
