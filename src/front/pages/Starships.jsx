import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Starships = () => {
  const { store, dispatch } = useGlobalReducer();
  const starships = store.starships;

  const isFavorite = (item) => {
    return store.favorites.find((favorite) => favorite.name === item.name);
  }
  const handleFavorite = (item) => {
    dispatch({ type: "favorite", payload: { name: item.name, uid: item.uid, type: "starships" } });
  }
  const fallbackImg = "https://starwars.chocobar.net/img/big-placeholder.jpg";

  return (
    <div className="containerStarships row d-flex justify-content-around  mb-5">
      {starships.map((item) => {

        return (
          <div className="card  m-1 mb-3" key={item.uid} >
            <img src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/${item.uid}.jpg`}
              onError={(e) => {
                e.target.src = fallbackImg;
              }}
              className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>

              <div className="botones d-flex justify-content-between">
                <Link to={`/starships/${item.uid}`} className="btn btn-primary ">
                  Learn more
                </Link>
                <span className="btn btn-outline-danger" onClick={() => handleFavorite(item)
                }>
                  {isFavorite(item)
                    ? <i class="fa-solid fa-heart-crack"></i>
                    : <i class="fa-solid fa-heart"></i>}
                </span>

              </div>
            </div>

          </div>
        )
      })}
    </div>

  )
} //FINAL