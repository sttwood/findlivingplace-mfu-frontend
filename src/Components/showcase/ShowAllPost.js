import React, { useState, useEffect } from "react"

//function
import { listPlaceBy } from "../../Services/Functions/place"

import AllPlaceCard from "../cards/AllPlaceCard"
import LoadingCard from "../cards/LoadingCard"

// Bootstrap
import Container from 'react-bootstrap/Container'
// MUI
import { Pagination } from '@mui/material';
// antd
import { Divider } from "antd";
// icons
import { BiBuildingHouse } from 'react-icons/bi'



const ShowAllPost = () => {
    const [ loading, setLoading ] = useState(false)
    const [ places, setPlaces ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const totalPages = Math.ceil(places.length / 5);
    const indexOfLastPlace = currentPage * 5;
    const indexOfFirstPlace = indexOfLastPlace - 5;
    const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)
        listPlaceBy("createdAt", "desc")
            .then((res) => {
                setLoading(false)
                setPlaces(res.data)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <>
            <Container className='py-5'>
                <Divider orientation="left" plain>
                    <h2>
                        <BiBuildingHouse />All living places
                    </h2>
                </Divider>
                {loading ? (
                    <LoadingCard />
                ) : (
                    <div className="row">
                        {currentPlaces.map((item, index) => (
                            <div key={index} className="row-lg-1 my-3">
                                <AllPlaceCard place={item} />
                            </div>
                        ))}
                    </div>
                )}
                <Pagination
                    style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    showFirstButton 
                    showLastButton
                    variant="outlined"
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Container>
        </>
    )
}

export default ShowAllPost