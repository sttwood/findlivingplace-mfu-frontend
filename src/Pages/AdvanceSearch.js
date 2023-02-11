/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

// cards
import PlaceCard from "../Components/cards/PlaceCard"

//function
import { listCategory } from "../Services/Functions/category"
import { listPlace, searchFilters } from "../Services/Functions/place"

// antd
import { Slider, Checkbox, Divider, } from "antd"
// MUI
import { FormGroup, FormControlLabel } from '@mui/material'
// icon
import { FaCarAlt, FaWifi, FaDumbbell, FaTshirt, FaInfoCircle, FaSnowflake } from 'react-icons/fa'
import { MdPets} from 'react-icons/md'



const Allplace = () => {
    const [ place, setPlace ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ price, setPrice ] = useState([ 0, 0 ])
    const [ ok, setOk ] = useState(false)
    const [ value, setValue ] = useState("")

    //category
    const [ category, setCategory ] = useState([])
    const [ categorySelect, setCategorySelect ] = useState([])

    //facilities
    const [ carpark, setCarpark ] = useState([])
    const [ carparkSelect, setCarparkSelect ] = useState([])

    const [ pet, setPet ] = useState([])
    const [ petSelect, setPetSelect ] = useState([])

    const [ freewifi, setFreeWifi ] = useState([])
    const [ freewifiSelect, setFreeWifiSelect ] = useState([])

    const [ airconditioner, setAirconditioner ] = useState([])
    const [ airconditionerSelect, setAirconditionerSelect ] = useState([])

    const [ gym, setGym ] = useState([])
    const [ gymSelect, setGymSelect ] = useState([])

    const [ washingmachine, setWashingMachine ] = useState([])
    const [ washingmachineSelect, setWashingMachineSelect ] = useState([])

    //search
    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search
    const [ filteredData, setFilteredData ] = useState([])
    const [ wordInput, setWordInput ] = useState("")

    // Load all data
    useEffect(() => {
        loadData()
        listCategory().then((res) => setCategory(res.data))
    }, [])

    const loadData = (count) => {
        setLoading(true)
        listPlace(count)
            .then((res) => {
                setPlace(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    // Search Bar
    const handleFilter = (e) => {
        const searchWord = e.target.value
        setWordInput(searchWord)
        const newFilter = place.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase())
        })
        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

    //load data when text filter
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchDataFilter({ query: text })
            if (!text) {
                loadData()
            }
        }, 300)
        return () => clearTimeout(delay)
    }, [ text ])

    //Filter
    const fetchDataFilter = (arg) => {
        searchFilters(arg)
            .then((res) => {
                setPlace(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //Load on slider
    useEffect(() => {
        fetchDataFilter({ price });
        console.log(price)
        // eslint-disable-next-line
        if (price[ 1 ] == 0) {
            loadData();
        }
    }, [ price ]);

    const handleCheckPrice = (value) => {
        setPrice(value)

        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    // check CATEGORY
    const handleCheckCategory = (e) => {
        //ค่าปัจจุบันที่ check
        let inCheck = e.target.value
        //ค่าเดิมของ check
        let inState = [ ...categorySelect ]
        let findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setCategorySelect(inState)
        fetchDataFilter({ category: inState })
        if (inState.length < 1) {
            loadData()
        }
    }

    //Check [facility]
    // check CARPARK
    const handleCheckCarpark = (e) => {
        //ค่าปัจจุบันที่ check
        let inCheck = e.target.value
        //ค่าเดิมของ check
        let inState = [ ...carparkSelect ]
        let findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setCarparkSelect(inState)
        fetchDataFilter({ carpark: true })
        if (inState.length < 1) {
            loadData()
        }
    }
    // check PET
    const handleCheckPet = (e) => {
        //ค่าปัจจุบันที่ check
        let inCheck = e.target.value
        //ค่าเดิมของ check
        let inState = [ ...petSelect ]
        let findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setPetSelect(inState)
        fetchDataFilter({ pet: true })
        if (inState.length < 1) {
            loadData()
        }
    }
    // check FREE WIFI
    const handleCheckFreeWifi = (e) => {
        //ค่าปัจจุบันที่ check
        let inCheck = e.target.value
        //ค่าเดิมของ check
        let inState = [ ...freewifiSelect ]
        let findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setFreeWifiSelect(inState)
        fetchDataFilter({ free_wifi: true })
        if (inState.length < 1) {
            loadData()
        }
    }
    // check AIR CONDITIONER
    const handleCheckAirConditioner = (e) => {
        //ค่าปัจจุบันที่ check
        let inCheck = e.target.value
        //ค่าเดิมของ check
        let inState = [ ...airconditionerSelect ]
        let findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setAirconditionerSelect(inState)
        fetchDataFilter({ airconditioner: true })
        if (inState.length < 1) {
            loadData()
        }
    }
    // check GYM
    const handleCheckGym = (e) => {
        //ค่าปัจจุบันที่ check
        let inCheck = e.target.value
        //ค่าเดิมของ check
        let inState = [ ...gymSelect ]
        let findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setGymSelect(inState)
        fetchDataFilter({ gym: true })
        if (inState.length < 1) {
            loadData()
        }
    }
    // check Washing Machine
    const handleCheckWashingMachine = (e) => {
        //ค่าปัจจุบันที่ check
        let inCheck = e.target.value
        //ค่าเดิมของ check
        let inState = [ ...washingmachineSelect ]

        let findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setWashingMachineSelect(inState)
        fetchDataFilter({ washing_machine: true })
        if (inState.length < 1) {
            loadData()
        }
    }


    const onChange = (event) => {
        console.log(event.target.value)
        setValue(event.target.value)
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 py-5" style={{ backgroundColor: "#e0e0eb" }}>
                        <Divider>
                            <h4 style={{ fontWeight: '600'}}>
                                Filter
                            </h4>
                        </Divider>

                        {/* Search by PRICE */}
                        <h5 style={{ color: "#1e90ff" }}>Search by price</h5>
                        <Slider value={price} onChange={handleCheckPrice} range max={10000} />
                        
                        <Divider />
                        {/* Search by CATEGORY */}
                        <h5 style={{ color: "#1e90ff" }}>Search by category</h5>
                        <div>
                            {category.map((item, index) => (
                                <Checkbox
                                    onChange={handleCheckCategory}
                                    value={item._id}
                                    style={{ fontSize: "16px" }}
                                >
                                    {item.name}
                                </Checkbox>
                            ))}
                        </div>
                        

                        <Divider />
                        {/* Search by FACILITIES */}
                        <h5 style={{ color: "#1e90ff" }}>Search by facilities</h5>
                        <div>
                            <FormGroup>
                                <Checkbox
                                    disabled
                                    style={{ fontSize: "16px", opacity: '0' }}
                                >
                                    Have Car parking
                                </Checkbox>

                                <Checkbox
                                    onChange={handleCheckCarpark}
                                    value={carpark}
                                    style={{ fontSize: "16px" }}
                                >
                                    Have Car parking
                                </Checkbox>
                                <Checkbox
                                    onChange={handleCheckPet}
                                    value={pet}
                                    style={{ fontSize: "16px" }}
                                >
                                    Allow Pets
                                </Checkbox>
                                <Checkbox
                                    onChange={handleCheckFreeWifi}
                                    value={freewifi}
                                    style={{ fontSize: "16px" }}
                                >
                                    have Free Wifi
                                </Checkbox>

                                <Checkbox
                                    onChange={handleCheckAirConditioner}
                                    value={airconditioner}
                                    style={{ fontSize: "16px" }}
                                >
                                    have Air Conditioner
                                </Checkbox>

                                <Checkbox
                                    onChange={handleCheckGym}
                                    value={gym}
                                    style={{ fontSize: "16px" }}
                                >
                                    have Fitness
                                </Checkbox>

                                <Checkbox
                                    onChange={handleCheckWashingMachine}
                                    value={washingmachine}
                                    style={{ fontSize: "16px" }}
                                >
                                    have washing Machine
                                </Checkbox>
                            </FormGroup>
                            
                        </div>
                    </div>

                    <div className="col-md-10">
                        <br />
                        <form className="form">
                            <input
                                type="text"
                                placeholder="Search places by name..."
                                value={wordInput}
                                onChange={handleFilter}
                                className="form-control"
                            />
                        </form>
                        {/* Data Result */}
                        {filteredData.length !== 0 ? (
                            <div className="row pb-5">
                                {filteredData.slice(0, 10).map((value, key) => {
                                    return (
                                        <div key={key} className="col-md-4 mt-3">
                                            <PlaceCard place={value} />
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="row pb-5">
                            {place.map((item, index) => (
                                <div key={index} className="col-md-4 mt-3">
                                    <PlaceCard place={item} />
                                </div>
                            ))}
                        </div>
                        )}
                        

                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default Allplace
