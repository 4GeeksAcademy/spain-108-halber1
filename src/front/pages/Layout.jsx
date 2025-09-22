// layout

import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Cards } from "./Cards.jsx"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { useEffect } from "react"
import { getContacts } from "../services/contact.js"
import { getPlanets } from "../services/starwars.js"
import {getCharacters} from "../services/starwars.js"
import {getStarships} from "../services/starwars.js"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const {dispatch}= useGlobalReducer()

    
      useEffect(() => {
        const getContact = async () => {
          const contacts = await getContacts()
          dispatch({
            type: "getContacts",
            payload: contacts
          })
        }

        const getPlanet = async () => {
          const planets = await getPlanets()
         dispatch({
            type: "planets",
            payload: planets
          })
        }

        const getChar = async () => {
          const char = await getCharacters()
          

         dispatch({
            type: "characters",
            payload: char
          })
        }

        const getShip = async () => {
          const ship = await getStarships()

  
         dispatch({
            type: "starships",
            payload: ship
          })
        }

        getChar()
        getContact()
        getPlanet()
        getShip()


      }, [])


     
      
    return (
        <ScrollToTop className="scrollToTop flex-fill">
            <div className="containerLayout ">
                <Navbar />
                 <div >
                    <Cards />
                </div> 
                
                <Outlet  />
            </div>
            <Footer />
        </ScrollToTop>
    )

}