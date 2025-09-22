import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


import { Link, useNavigate } from "react-router-dom";

export const Users = () => {
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate();
  // const users = store.users

  const handleErrorImg = (event) => {
    event.target.src = 'https://randomuser.me/api/portraits/women/10.jpg'
  }

  const handlePerfil = (user) => {
    dispatch({type: 'currentUser', payload: user})
    navigate(`/users/${user.id}`);
  }

  const handleFavorites = (favorite) => {
    const arrayFavorites = store.favorites
    const newFavorites = [...store.favorites, favorite]
    console.log(newFavorites);
    dispatch({type: 'favorites', payload: newFavorites})

    
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const dataUsers = await getUsers()
      dispatch({ type: 'users', payload: dataUsers })
      localStorage.setItem('users', JSON.stringify(dataUsers))
    }


    const localUsers = JSON.parse(localStorage.getItem('users'))
    
    if (localUsers) {
      dispatch({ type: 'users', payload: localUsers})
    } else {
      // tengo que traerlo de api
      fetchUsers()
    }
  }, [])

  return (
    <div className="container">
      <h1 className="text-center">Users</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {store.users.map(item =>
          <div className="col" key={item.id}>
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={`https://randomuser.me/api/portraits/women/7${item.id}.jpg`} 
                    onError={handleErrorImg}
                    className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.username}</p>
                    <p className="card-text"><small className="text-body-secondary">{item.website}</small></p>
                    <span className="btn btn-info" onClick={() => handlePerfil(item)}>Perfil</span>
                    <span className="btn btn-success" onClick={() => handleFavorites(item.name)}>Fav</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}