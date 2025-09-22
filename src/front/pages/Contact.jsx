// Contact.jsx

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { addFavorite, AddUser, deleteContact, getContacts, putContact } from "../services/contact"
import useGlobalReducer from "../hooks/useGlobalReducer"

// 5 CREAMOS FUNCION ASINCRONA HANDLEDELETE QUE LLAMA AL SERVICIO DELETECONTACTS Y HACE EL DISPACH

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer()
  const contacts = store.contacts


  const handleDelete = async (contact) => {
    await deleteContact(contact, dispatch)
  }


  // const handleAddFavorites = async (contact) =>{
  //   await addFavorite(contact) 
  // }



  return (
    <div className="container  mt-3">
      <h1> Lista de Federico </h1>
      <div className="d-flex justify-content-end">
        <Link to="/addcontacts" className="btn btn-success m-2">
          Add new contact
        </Link>
      </div>
      <div className="cards ">
        {contacts.map((item) => (
          <div className="card mb-3 p-3 shadow-sm border-0" key={item.id}>
            <div className=" row align-items g-3">
              <div className="col-auto">
                <img src={`https://randomuser.me/api/portraits/${item.id % 2 === 0 ? 'men' : 'women'}/${item.id}.jpg`} className="rounded-circle" />
              </div>

              <div className="datosBotones col d-flex justify-content-between">


                <div className="datos ">
                  <h5 className="card-title mb-1">{item.name}</h5>
                  <i className="fas fa-map-marker-alt me-2 text-muted"></i>{item.address}
                  <p className="mb-1">
                    <i className="fas fa-phone me-2 text-muted"></i>{item.phone}
                  </p>
                  <p className="mb-0">
                    <i className="fas fa-envelope me-2 text-muted"></i>{item.email}
                  </p>
                </div>
                {/* 4 CREAMOS BOTON DELETE QUE CON UN ONCLICK EJECUTE LA FUNCION HANDLEDELETE */}
                <div className="botones m-4">
                  <Link to={`/addcontacts/${item.id}`} className="btn btn-outline-warning btn-sm m-1">
                    <i className="fas fa-pencil-alt"></i>
                  </Link>
                  <button onClick={() => handleDelete(item)} className="btn btn-outline-danger btn-sm m-1">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>

              </div>
            </div>
          </div>

        ))
        }
      </div >
    </div>
  );
}