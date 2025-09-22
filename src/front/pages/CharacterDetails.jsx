import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCharacterDetails } from "../services/starwars";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharacterDetails = () => {
  const params = useParams();
  const { store, dispatch } = useGlobalReducer();
  const characterDetail = store.characterDetail;

  const fallbackImg = "https://starwars.chocobar.net/img/big-placeholder.jpg";

  useEffect(() => {
    const getCharacter = async () => {
      const characterDetail = await getCharacterDetails(params.uid);
      dispatch({ type: "characterDetail", payload: characterDetail });
    };
    getCharacter();
  }, [params.uid]);

return (
  <div className="containerDetail container py-4 d-flex justify-content-center">
    <div className="row g-4 align-items-center w-100">
      <div className="col-md-6 d-flex justify-content-center">
        <img
          src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${params.uid}.jpg`}
          className="img-fluid rounded border border-light"
          onError={(e) => {
            e.target.src = fallbackImg;
          }}
          alt="..."
        />
      </div>
      <div className="col-md-6 text-light">
        <h5 className="mb-4 text-center text-md-start fw-bold">
          Name: {characterDetail.name}
        </h5>
        <div className="px-3">
          <p className="mb-3">
            <strong>Height:</strong> {characterDetail.height}
          </p>
          <p className="mb-3">
            <strong>Birth year:</strong> {characterDetail.birth_year}
          </p>
          <p className="mb-3">
            <strong>Gender:</strong> {characterDetail.gender}
          </p>
        </div>
      </div>
    </div>
  </div>
);


};
