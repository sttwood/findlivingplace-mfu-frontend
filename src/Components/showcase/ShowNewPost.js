import React, { useState, useEffect } from "react"

//function
import { listPlaceBy } from "../../Services/Functions/place"

import PlaceCard from "../cards/PlaceCard"
import LoadingCard from "../cards/LoadingCard"

const ShowNewPost = () => {
    const [ loading, setLoading ] = useState(false)
    const [ places, setPlaces ] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(false)
        listPlaceBy("createdAt", "desc", 8)
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
            <div className="container">
                {loading ? (
                    <LoadingCard />
                ) : (
                    <div className="row">
                        {places.map((item, index) => (
                            <div key={index} className="col-lg-3 my-3">
                                <PlaceCard place={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ShowNewPost
