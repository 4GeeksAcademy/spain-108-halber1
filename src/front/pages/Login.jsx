import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../services/auth";

import { useNavigate } from "react-router-dom";


export const Login = () => {
  const { dispatch } = useGlobalReducer()
  const [ email, setEmail ]  = useState('');
  const [ password, setPassword ] = useState('');
 
  const navigate = useNavigate()

  const handleEmail = (event) => {setEmail(event.target.value)};
  const handlePassword = event => setPassword(event.target.value);


  const handleSubmit = async (event) => {
    event.preventDefault();
   
   
    const dataToSend = {
      email: email,
      password: password,
    }
    
    const result = await login(dataToSend)
  
    localStorage.setItem('token', result.access_token)
  
    dispatch({
      type: 'token',
      payload: result.access_token
    })
    dispatch({type: 'isLogged', payload: true})
    
    dispatch({type: 'currentUser', payload: result.results})
    // dispatch({
    //   type: 'handle_alert',
    //   payload: {
    //     text: 'Exclente! Bienvenido a nuestra App',
    //     background: 'success',
    //     visible: true
    //   }
    // })
   
    navigate('/contact')
  }

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setCheckMe(false);
    dispatch({
      type: 'handle_alert',
      payload: {
        text: 'Cronometro detenido',
        background: 'danger',
        visible: true
      }
    })
  }

  
  return (
    <div className="container text-start bg-light">
      <h1 className="text-center text-primary">Login</h1>
      <div className="row">
        <div className="col-10 col-sm-8 col-md-6 m-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                value={email} onChange={handleEmail}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1"
                value={password} onChange={handlePassword}/>
            </div>
            {/* <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"
                checked={checkMe} onChange={handleCheckMe}/>
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
            <div className="d-flex justify-content-between gap-3 mb-4">
            <button type="submit" className="btn btn-primary flex-grow-1">Submit</button>
            <button type="reset" onClick={handleReset} className="btn btn-secondary ms-2 flex-grow-1">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}