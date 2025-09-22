// SERVICE CONTACT.JS
export const getContacts = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/Federico/contacts");
      if (!response.ok && response.status == 404) {
  
        
        return AddUser()
      } 
      const data = await response.json();

      return data.contacts;

    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  // agrego usuario
  export const AddUser = async () =>{
    const user = "Federico"
    try {
      const response = await fetch (`https://playground.4geeks.com/contact/agendas/${user}`,
        {
          method: "POST",
          body: JSON.stringify({

          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
    
      if (response.ok) {
       return await getContacts()
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }}
  
  

  export const postContact = async (contact) => {

  try {
    const response = await fetch("https://playground.4geeks.com/contact/agendas/Federico/contacts", {
      method: "POST",
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
      if (response.ok) {
      return await getContacts()
      }

    } catch (error) {
      console.error("Error al crear Lista:", error);
    }}


  export const deleteContact = async (contact, dispatch) => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Federico/contacts/${contact.id}`, {
      method: "DELETE"
    });

    if (!response.ok) {

      return;
    }

    // Volvemos a cargar todos los contactos actualizados
    const updatedContacts = await getContacts();

    // Actualizamos el store con la lista nueva
    dispatch({
      type: "getContacts",
      payload: updatedContacts
    });


  } catch (error) {
    console.error("Error eliminando Contacto:", error);
  }
}

 export const putContact = async (id, contact) => {
    try {
     const response =  await fetch(`https://playground.4geeks.com/contact/agendas/Federico/contacts/${id}`,
         {
        method: "PUT",
        body: JSON.stringify(contact),
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok){
        throw new error;
      } return await response.json();
  
    } catch (error) {
      console.error("Error modificando Contacto:", error);
    }
  };

  export const addFavorite = () => {
    

  }