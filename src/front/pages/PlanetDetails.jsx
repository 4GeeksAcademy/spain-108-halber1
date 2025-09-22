import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPlanets, getPlanetsDetails } from "../services/starwars"
import useGlobalReducer from "../hooks/useGlobalReducer"




export const PlanetDetails = () => {

    const params = useParams()

    const { store, dispatch } = useGlobalReducer()
    const planetDetail = store.planetDetail


    const fallbackImg = "https://starwars.chocobar.net/img/big-placeholder.jpg";


    useEffect(() => {
        const getPlanet = async () => {
            const planetDetail = await getPlanetsDetails(params.uid)
  
            dispatch({
                type: "planetDetail",
                payload: planetDetail
            })
        }
        getPlanet();
    }, [params.uid])




   return (
  <div className="containerDetail container py-4 d-flex justify-content-center">
    <div className="row g-4 align-items-center w-100">
      <div className="col-md-6 d-flex justify-content-center">
        <img
          src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${params.uid}.jpg`}
          className="img-fluid rounded border border-light"
          onError={(e) => {
            e.target.src = fallbackImg;
          }}
          alt="..."
        />
      </div>
      <div className="col-md-6 text-light">
        <h5 className="mb-4 text-center text-md-start fw-bold">
          Name: {planetDetail.name}
        </h5>
        <div className="px-3">
          <p className="mb-3">
            <strong>Population:</strong> {planetDetail.population}
          </p>
          <p className="mb-3">
            <strong>Terrain:</strong> {planetDetail.terrain}
          </p>
        </div>
      </div>
    </div>
  </div>
);

}