/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Functions
import { listPlace } from '../../Services/Functions/place'

// Styles
import { styled, alpha } from "@mui/material/styles"
// MUI
import {
    Toolbar,
    Button,
    InputBase,
    ListItem,
    ListItemText
} from "@mui/material"
// Icons
import SearchClearText from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import TuneIcon from '@mui/icons-material/Tune'


// ----------------------------------------- MUI CSS Styles -----------------------------------------
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
    [ theme.breakpoints.up('sm') ]: {
        width: 'auto',
    },
}))
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 10, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [ theme.breakpoints.up('md') ]: {
            width: '20ch',
        },
    },
}))
const Listbox = styled('ul')(() => ({
    width: '100%',
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: '#E3E3E3FF',
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
}));
const ListItemSearch = {
    color: '#000000',
    "&:hover": {
        backgroundColor: '#EEEEEEFF',
        color: '#595959FF'
    },
}


const AdvanceSearch = styled(TuneIcon)(() => ({
    color: '#ffffff',
    height: '100%',
    fontSize: '2rem',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '5px',
    '&:hover': {
        color: 'rgba(255, 255, 255, 0.9)',
        border: '2px solid rgba(255, 255, 255, 0.7)',
    }
}))



const SearchBar = () => {
    // [Search Bar]
    // Fetch data
    const [ place, setPlace ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ filteredData, setFilteredData ] = useState([])
    const [ wordInput, setWordInput ] = useState("")

    useEffect(() => {
        loadData()
    }, [])
    
    const loadData = (count) => {
        setLoading(true)
        listPlace(count)
            .then(res => {
                setLoading(false)
                setPlace(res.data)
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

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

    const clearInput = () => {
        setFilteredData([])
        setWordInput("")
    }

    return (
        <>
            <Toolbar
                variant="h5"
                nowrap="true"
                component="div"
                href=""
                sx={{
                    mr: 2,
                    display: { xs: "none", lg: "flex" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none"
                }}
            >
                <div>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        {/* Search Input */}
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            value={wordInput}
                            onChange={handleFilter}
                        />
                        {/* Data Result */}
                        {filteredData.length !== 0 && (
                            <Listbox>
                                {filteredData.slice(0, 10).map((value, key) => {
                                    return (
                                        <ListItem  component={Link} to={'/place/' + value._id} sx={ListItemSearch} target="_blank">
                                            <ListItemText sx={ListItemSearch} primary={value.title} />
                                        </ListItem> 
                                    )
                                })}
                            </Listbox>
                        )}
                        
                        {wordInput.length !== 0 &&
                            <SearchClearText cursor='pointer' onClick={clearInput} />
                        }
                    </Search>


                    
                </div>


                <Button component={Link} to='/advance-search'>
                    <AdvanceSearch />
                </Button>
            </Toolbar>
        </>
    )
}

export default SearchBar