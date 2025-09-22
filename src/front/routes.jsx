
// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Contact } from "./pages/Contact";
import { AddContacts } from "./pages/AddContacts";
import {Characters} from "./pages/Characters"
import {CharacterDetails} from "./pages/CharacterDetails"
import {Planets} from "./pages/Planets"
import { PlanetDetails } from "./pages/PlanetDetails";
import {Starships} from "./pages/Starships"
import {StarshipDetails} from "./pages/StarshipDetails"
import {Login} from "./pages/Login";


// import { Users } from "./pages/Users.jsx";
// import { UsersDetails } from "./pages/UsersDetails.jsx";
import { Register } from "./pages/Register.jsx";
// import { EditProfile } from "./pages/EditProfile.jsx";


export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addcontacts" element={<AddContacts />} />
        <Route path="/addcontacts/:id" element={<AddContacts />} />
        <Route path="/characters" element={<Characters/>}/>
        <Route path="/characters/:uid" element={<CharacterDetails/>}/>
        <Route path="/planets" element={<Planets/>}/>
        <Route path="/planets/:uid" element={<PlanetDetails/>}/>
        <Route path="/starships" element={<Starships/>}/>
        <Route path="/starships/:uid" element={<StarshipDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<Register />} />
        {/* <Route path='/edit-profile' element={<EditProfile />} /> */}
        {/* <Route path='/users' element={<Users />} /> */}
        {/* <Route path='/users/:id' element={<UsersDetails />} /> */}

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        {/* <Route path="/Cards" element={<Cards />} /> */}
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />
      </Route>
    )
);