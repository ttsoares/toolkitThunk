import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { login } from './loginSlice';
import md5 from 'md5';

import "./index.css";

const Login = () => {

  console.clear(); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    password: ""
  }
  const [user, setUser] = useState(initialState)

  //--------------------------------
  function handleInput(event) {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    // Test if is 'admin'
    const password = md5(`${user.name}${user.password}`)
    if (user.name === 'admin' && password === 'f14cf4eca31dac45702e5b4a24975337') {
      navigate('Users')
    return
    }

    // Test user credentials
    let userOK

    try {
      userOK = await api.login(user)
    } catch (error) {
      console.log('error', error)
      throw (error)
    }

    if (userOK) {
      dispatch(login(user));

      navigate('Messages', { state: {uid: userOK, name: user.name}})
      return
    }

    // No user, no admin : erro message
    console.log("Acesso negado.")
    return
  }

  return (

    <div className='main_login'>
    <header className="d-flex justify-content-center">
      <h1>Log In</h1>
    </header>

    <section className="externa">
      <div className="internaLogin">
        <form className="mt-3" onSubmit={handleSubmit}>
          <label htmlFor="userName"><h5><u>Nome do Usuário</u></h5></label>
          <input
            required
            type="text"
            className="mt-0 form-control-plaintext"
            placeholder="Enter user name"
            id="userName"
            name="name"
            onChange={handleInput}
            value={user.name}
          />
          <label htmlFor="passWord"><h5><u>Senha</u></h5></label>
          <input
            type="password"
            className="mt-2 form-control-plaintext"
            placeholder="Enter password"
            id="passWord"
            name="password"
            onChange={handleInput}
            value={user.password}
          />

          <div className="d-grid mt-3">
            <button
              id="myBtn"
              className="btn btn-primary rounded-pill"
              typeof='submit'
            >
            Entrar
            </button>
          </div>
        </form>

        <footer>
          <div className="px-0 mt-2 container d-flex">
            <p className="pe-2 text-secondary">Não tem uma conta ?</p>
            <a className='registre' onClick={() => {navigate('Signin')}}>Registre-se</a>
          </div>
        </footer>
      </div>
    </section>
{/* ---------------------------------------------------------------------- */}
    <div
      className="modal fade"
      id="credentials"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-info p-2 text-white bg-opacity-75">
          <div className="modal-header">
            <h5 className="modal-title">Credenciais Invalidas</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Errou a grafia do nome ou senha...
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="empty_field"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-info p-2 text-white bg-opacity-75">
          <div className="modal-header">
            <h5 className="modal-title">Campos em Branco</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Um ous mais campos ficaram em branco</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}
export default Login