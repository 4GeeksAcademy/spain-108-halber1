const host = 'https://www.swapi.tech/api'

export const getCharacters = async () => {
  
const cached = localStorage.getItem("characters");
  if (cached) {
    return JSON.parse(cached);

  }
  try {
    const response = await fetch(`${host}/people`);

    if (!response.ok && response.status === 404) {
   
    }
    const data = await response.json();
    localStorage.setItem("characters", JSON.stringify(data.results));

    return data.results;
  } catch (error) {
    console.error("Error al cargar personajes:", error);
  }
};


export const getPlanets = async () => {
  
  const cached = localStorage.getItem("planets");
  if (cached) {
    return JSON.parse(cached);
  }
  
  try {
    const response = await fetch(`${host}/planets`);
    if (!response.ok && response.status == 404) {
      console.log("NO ENCONTRÈ LA LISTA DE PLANETAS")
    } 
    const data = await response.json();
    localStorage.setItem("planets", JSON.stringify(data.results));
    
    

    return data.results
  } catch (error) {
    console.error("Error al cargar Planetas:", error);
  }
};


export const getStarships = async () => {
  
const cached = localStorage.getItem("starships");
  if (cached) {
    // return JSON.parse(cached);

  }
  try {
    const response = await fetch(`${host}/starships`);
   
    if (!response.ok && response.status === 404) {
      console.log("NO ENCONTRÉ LA LISTA DE PERSONAJES");
    }
    const data = await response.json();
    localStorage.setItem("starships", JSON.stringify(data.results));

    return data.results;
  } catch (error) {
    console.error("Error al cargar personajes:", error);
  }
};



export const getCharacterDetails = async (uid) => {

  try {
    const response = await fetch(`${host}/people/${uid}`);
    if (!response.ok && response.status === 404) {
      console.log("NO ENCONTRÉ EL PERSONAJE");
    }
    const data = await response.json();

    return data.result.properties;
  } catch (error) {
    console.error("Error al cargar detalle del personaje:", error);
  }
};

  export const getPlanetsDetails = async (uid) => {
    try {
      const response = await fetch (`${host}/planets/${uid}`);
      if (!response.ok && response.status == 404) {

      }
        const data = await response.json();



    return data.result.properties
   }
      catch(error){
        console.error("NO ENCONTRE EL PLANETA")

    }
  }


  export const getStarshipDetails = async (uid) => {
    try {
      const response = await fetch (`${host}/starships/${uid}`);
      if (!response.ok && response.status == 404) {

      }
        const data = await response.json();



    return data.result.properties
   }
      catch(error){
        console.error("NO ENCONTRE LA NAVE")

    }
  }