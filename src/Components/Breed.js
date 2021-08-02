import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Breed.css";

const useFetchBreedImages = (breedName) => {
  const [breedImages, setBreedImages] = useState([]);
  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${breedName}/images/random/4`)
      .then((resp) => resp.json())
      .then((breedsResp) => {
        if (breedsResp.code === 404) return setBreedImages([]);
        setBreedImages(breedsResp.message);
      });
  }, [breedName]);

  return breedImages;
};

const Breed = (props) => {
  const breedName = props.match.params.breedName;
  const breeds = useFetchBreedImages(breedName);
  return (
    <div className="breed-container">
      <h1>{breedName}</h1>
      <Link to="/">See all breeds</Link>
      <div className="image-display">
        {breeds && breeds.length > 0 ? (
          breeds.map((breed, i) => {
            return <img key={`${breed}${i}`} src={breed} alt={breedName} />;
          })
        ) : (
          <p>No Results</p>
        )}
      </div>
    </div>
  );
};

export default Breed;
