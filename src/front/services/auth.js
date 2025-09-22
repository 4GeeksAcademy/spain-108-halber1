let host = import.meta.env.VITE_BACKEND_URL

export const login = async (dataToSend) => {
    console.log(dataToSend)
    const uri = `${host}/api/login`
 
    const options = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(dataToSend)
    }
    const response = await fetch(uri,options);
    if (!response.ok){
        console.log('Error', response.status, response.statusText)
    
    }
    const data = await response.json();
    return data
}

export const register = async (dataToSend) => {
  const uri = `${host}/api/register`
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(dataToSend)
  }
  const response = await fetch(uri, options);
  if (!response.ok) {
    // Tratramos el error
    console.log('Error', response.status, response.statusText)
    return false
  }
  const data = await response.json();
  return data

}