import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./Messages.css";
import {Modal, Button } from 'react-bootstrap';
import api from '../../services/api';

import { logout } from '../login/loginSlice';
import { rst, add, del, upd, all, selectMessages, thunkGetMessages } from './messagesSlice'

import TableMessages from './table'

const Messages = () => {

  const reduxMessages = useSelector(selectMessages);

  console.log("*********************************")
  console.log(reduxMessages)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const userID = state.uid
  const userName = state.name

  const initialStateOneMessage = {
    description: "",
    details: ""
  };
  const [message, setMessage] = useState(initialStateOneMessage);
  const [messages, setMessageS] = useState([]);
  const [visible, setVisible] = useState(false);
  
  // Log Out
  function logOut() {
    dispatch(rst());
    dispatch(logout(state));
    navigate('/')
  }
  
  //--------------------------------- get all messages form user 'userID'
  async function getAllMessages(userID) {
    const messagesList = await api.getMessages(userID)
    setMessageS(messagesList);    // component list of messages
    //dispatch(all(messagesList));  // Redux list of messages
  }

  //-------------------------------- handle all inputs
  function handleInput(event) {
    const { name, value } = event.target
    setMessage({ ...message, [name]: value })
  }
  
  //--------------------------------  handle save new message
  async function handleSubmit(event) {
    event.preventDefault();
    let newMessage={}
    try {
      newMessage = await api.saveMessage(message, userID);
    } catch (error) {
      console.log('error', error);
      throw(error);
    }
    setMessageS((messages) => [...messages, newMessage]);

    dispatch(add(newMessage))  // Redux list of messages

    setMessage(initialStateOneMessage);
  }

  //-------------------------------- call modal to edit message
  async function editMessage(msgID) {
    const index = messages.findIndex( element =>  element.uid === msgID) 

    setMessage(messages[index])
    setVisible(true)
  }
  
  //-------------------------------- save edited message
  async function handleSubmitEdit(event) {
    event.preventDefault();
    setVisible(false);
    try {
      await api.updtMessage(message);
    } catch (error) {
      console.log('error', error);
      throw(error);
    }
    setMessageS(messages.map(elm => elm.uid === message.uid ? message : elm))
    dispatch(upd(message));  // Redux list of messages
    setMessage(initialStateOneMessage);
  }

  //-------------------------------- remove message
  async function delMessage(msgID) {
    try {
      await api.delMessage(msgID);
      dispatch(del(msgID));  // Redux list of messages
      getAllMessages(userID);
    } catch (err){
      console.log('error', err);
      throw(err);
    }
  }    

  useEffect(() => {
    getAllMessages(userID);
    dispatch(thunkGetMessages(userID));
  }, []);

  return (
    <div className='main_messages'>
    <div className="container-fluid">

      <header className="header container-fluid d-flex flex-row ">
        <h1 className="me-5">Suas mensagens:</h1>
        <span className=" fs-1">{userName}</span>
        <button 
          onClick={logOut}
          type="button"
          className="ms-auto btn btn-outline-success rounded-pill" >
            Log Out
        </button>
      </header>

      <h2> Cadastrar novas menssages</h2>
      <form className="row ms-3 mt-4 mb-4 input-group" onSubmit={handleSubmit}>
        <div className="col-3">
          <input type="text"
            id="desCrip"
            className="form-control"
            placeholder="Description"
            aria-label="Description"
            name="description"
            onChange={handleInput}
            value={message.description}
            required
          />
        </div>
        <div className="col-8">
          <input
            type="text"
            id="detAil"
            className="form-control"
            placeholder="Details"
            aria-label="Details"
            name="details"
            onChange={handleInput}
            value={message.details}
            required
          />
        </div>
        <div className="col-1">
          <button className="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
      {messages.length > 0 ? (
        <TableMessages messages={messages} delMessage={delMessage} editMessage={editMessage}/>
        ) : (
          
          <div className="container-fluid">
            <h1 className="text-center text-info">Sem Mensagens</h1>
          </div>
        )
      }
      
    </div>
{/* ******************edit message ************************ */}
      <Modal show={visible}  centered size="lg" onHide={() => setVisible(false)} >
        <Modal.Header closeButton >
          <Modal.Title>Editar Mensagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="externa">
            <div className="interna">
              <form className="fs-4 fw-bold mt-3" onSubmit={handleSubmitEdit}>
                <label htmlFor="description"><h5><u>Descrição</u></h5></label>
                <input
                  required
                  type="text"
                  className="mt-0 form-control-plaintext"
                  name="description"
                  onChange={handleInput}
                  value={message.description}
                />
                <label htmlFor="details"><h5><u>Detalhes</u></h5></label>
                <input
                  required
                  type="text"
                  className="mt-2 form-control-plaintext"
                  name="details"
                  onChange={handleInput}
                  value={message.details}
                />
                <div className="d-grid mt-3">
                <Button className="rounded-pill" type='submit'>Submeter</Button>
                </div>          
              </form>
            </div>
          </section>
        </Modal.Body>
      </Modal>
  </div>
  )
}

export default Messages