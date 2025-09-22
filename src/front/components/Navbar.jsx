import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useParams } from "react-router-dom"



export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const params = useParams()


  const handleCancelFavorite = (item) => {

    dispatch({ type: "favorite", payload: item })
  }

   const handleOnSubmint = (event) => {
    event.preventDefault()
    // mostar el componente login
    navigate('/login')
  }



  return (

    <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3 shadow-sm">
  <div className="container">
    <Link className="navbar-brand mx-auto" to="/">
      <img src="https://lumiere-a.akamaihd.net/v1/images/sw_nav_logo_mobile_659fef1a_1_99c6e87c.png?region=0,0,312,32" alt="Star Wars" height="30" />
    </Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav ms-auto mb-2 mb-md-0">
        <li className="nav-item">
          <Link to="/Characters" className="nav-link">Characters</Link>
        </li>
        <li className="nav-item">
          <Link to="/Planets" className="nav-link">Planets</Link>
        </li>
        <li className="nav-item">
          <Link to="/Starships" className="nav-link">Starships</Link>
        </li>
       
        <li className="nav-item dropdown">
          <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
            Favorites
            <span className="badge bg-danger ms-2">{store.favorites.length}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.map(item => (
              <li key={item.uid} className="dropdown-item d-flex justify-content-between">
                <Link to={`/${item.type}/${item.uid}`} className="text-dark">{item.name}</Link>
                <button onClick={() => handleCancelFavorite(item)} className="btn btn-sm btn-outline-danger ms-2">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </li>
            ))}
          </ul>
          
        </li>
        <Link to='/login'  className="btn btn-outline-success" type="submit">Login</Link>
       
      </ul>
    </div>
  </div>
</nav>
  )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
};


      {/* <Link to="/contact">
<button className="btn btn-primary">Start</button>
</Link> */}