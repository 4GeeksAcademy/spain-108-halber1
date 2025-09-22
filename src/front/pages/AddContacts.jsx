// AddContacts
import React, { useState, useEffect } from 'react';
import { getContacts, postContact, putContact } from '../services/contact';   // 1 LLAMAMOS AL SERVICIO 
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const AddContacts = () => {

    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactAddress, setContactAddress] = useState('');

    const { store, dispatch } = useGlobalReducer();
    // Importamos el hook para acceder al store y dispatch
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const contactToEdit = store.contacts.find(contact => contact.id === parseInt(id));
            if (contactToEdit) {
                setContactName(contactToEdit.name);
                setContactEmail(contactToEdit.email);
                setContactPhone(contactToEdit.phone);
                setContactAddress(contactToEdit.address);
            }
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !contactName.trim() ||
            !contactPhone.trim() ||
            !contactEmail.trim() ||
            !contactAddress.trim()
        ) {
            setContactName(''),
                setContactPhone(''),
                setContactEmail(''),
                setContactAddress('')
            return
        }
        const data = {
            name: contactName,
            email: contactEmail,
            phone: contactPhone,
            address: contactAddress
        }
        try {
            if (id) {
                await putContact(id, data);
                dispatch({
                    type: "getContacts",
                    payload: id, ...data
                })
            } else {
                await postContact(data);
            }

            const contacts = await getContacts();
            if (contacts){
                dispatch({
                    type: "getContacts",
                    payload: contacts
                })};
                navigate('/contact');
            }
            catch (error) {
                console.error("error en e form", error)
            }
            


        // 2 HACEMOS DISPATCH DE GETCONTACTS PARA ACTUALIZAR LA LISTA DE CONTACTOS
        // 3 USAMOS USENAVIGATE PARA REDIRECCIONAR A LA PAGINA DE CONTACTOS


    };

    const handleName = e => setContactName(e.target.value);
    const handleEmail = e => setContactEmail(e.target.value);
    const handlePhone = e => setContactPhone(e.target.value);
    const handleAddress = e => setContactAddress(e.target.value);





    return (
        <div className="container m-auto row">
            <form onSubmit={handleSubmit}  >
                <div className="mb-3 col-12">
                    <label for="exampleInputPassword1" className="form-label">Name</label>
                    <input onChange={handleName} value={contactName} type="text" placeholder="Federico" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 col-12">
                    <label for="exampleInputPassword2" className="form-label">Email</label>
                    <input onChange={handleEmail} value={contactEmail} type="email" placeholder="exampleEmail@gmail.com" className="form-control" id="exampleInputPassword2" />
                </div>
                <div className="mb-3 col-12">
                    <label for="exampleInputPassword3" className="form-label">Phone</label>
                    <input onChange={handlePhone} value={contactPhone} type="numeric" placeholder="32425" className="form-control" id="exampleInputPassword3" />
                </div>
                <div className="mb-3 col-12">
                    <label for="exampleInputPassword4" className="form-label">Address</label>
                    <input onChange={handleAddress} value={contactAddress} type="text" placeholder="World" className="form-control" id="exampleInputPassword4" />
                </div>

                <button  type="submit" className="col-12 btn btn-primary">Submit</button>
                <Link to="/contact">
                <button  Link ="" className="col btn text-primary">or get back to contacts </button>
                </Link>
            </form>
            
            
        </div>
    );
}