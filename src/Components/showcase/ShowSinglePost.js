import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

//function
import { readPlace } from "../../Services/Functions/place"

// cards
import SinglePlaceCard from '../cards/SinglePlaceCard'

const Place = () => {
    const param = useParams()
    const [ place, setPlace ] = useState([])

    useEffect(() => {
        loadData()
        // eslint-disable-next-line
    }, [])

    const loadData = () => {
        readPlace(param.id)
            .then((res) => {
                setPlace(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SinglePlaceCard place={place} />
            </div>
        </div>
    )
}

export default Place
