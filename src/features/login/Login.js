/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { login } from './loginSlice';
import md5 from 'md5';
import {Modal, Button } from 'react-bootstrap';

import "./index.css";

const Login = (props) => {

  console.clear(); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    password: ""
  }
  const [user, setUser] = useState(initialState)
  const [error, setError] = useState(false)

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
      props.respLogin('admin')
      navigate('Users')
    return
    }

    // Test user credentials
    let userOK
    const cryptPassword = md5(`${user.name}${user.password}`)

    try {
      userOK = await api.login({
        name: user.name,
        password: cryptPassword
      }) 
    } catch (error) {
      console.log('error', error)
      //throw (error)
    }

    if (userOK) {
      dispatch(login(user));
      props.respLogin('user')
      navigate('Messages', { state: {uid: userOK, name: user.name}})
      return
    }

    // No user, no admin : erro message
    setError(true)

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
              disabled={!user.name || !user.password}
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

    <Modal show={error}  centered size="lg" onHide={() => setError(false)} >
        <Modal.Header closeButton >
          <Modal.Title>Ocorreu algum erro !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="externa">
            <div className="interna">
              <form className="fs-4 fw-bold mt-3" onSubmit={() => setError(false)}>
                <div className="d-grid mt-3">
                <Button className="rounded-pill" type='submit'>Temtar novamente ?</Button>
                </div>          
              </form>
            </div>
          </section>
        </Modal.Body>
      </Modal>
  </div>
  )
}
export default Login