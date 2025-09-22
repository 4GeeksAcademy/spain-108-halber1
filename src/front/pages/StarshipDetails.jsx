import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStarshipDetails } from "../services/starwars";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const StarshipDetails = () => {
const params = useParams();
  const { store, dispatch } = useGlobalReducer();
  const starshipDetail = store.starshipDetail;

const fallbackImg = "https://starwars.chocobar.net/img/big-placeholder.jpg";

useEffect(() => {
    const getStarship = async () => {
      const starshipDetail = await getStarshipDetails(params.uid);
      dispatch({ type: "starshipDetail", payload: starshipDetail });
    };
    getStarship();
  }, [params.uid]);

return (
  <div className="containerDetail container py-4 d-flex justify-content-center">
    <div className="row g-4 align-items-center w-100">
      <div className="col-md-6 d-flex justify-content-center">
        <img
          src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/${params.uid}.jpg`}
          className="img-fluid rounded border border-light"
          onError={(e) => {
            e.target.src = fallbackImg;
          }}
          alt="..."
        />
      </div>
      <div className="col-md-6 text-light">
        <h5 className="mb-4 text-center text-md-start fw-bold">
          Name: {starshipDetail.name}
        </h5>
        <div className="px-3">
          <p className="mb-3">
            <strong>Passengers:</strong> {starshipDetail.passengers}
          </p>
          <p className="mb-3">
            <strong>Starship class:</strong> {starshipDetail.starship_class}
          </p>
          <p className="mb-3">
            <strong>Manufacturer:</strong> {starshipDetail.manufacturer}
          </p>
        </div>
      </div>
    </div>
  </div>
);
}