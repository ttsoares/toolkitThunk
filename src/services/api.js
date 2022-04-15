import axios from 'axios';
import { url } from  './URL'

function errorBE(error){
    console.log("Erro no back end !", error)
    throw (error);
}

class Api {

// ---------------- U S E R S        
    login({name, password}) {        
        // If user/pass are OK, B.E. returns userID
        return axios.post(`${url}/login`, {
            name: name,
            password: password
        })
        .then(
            (response) => {
                return response.data
            },
            (error) => errorBE(error))
    }

    addUser(name, password1) {
        return axios.post(`${url}/user/store`, {
            name: name, 
            password: password1
        })
        .then(
            (response) => {
                return response.data
            },
            (error) => errorBE(error))
    }
            
    getUsers() {
        return axios.get(`${url}/users`)
        .then(
            (response) => {
                return response.data
            },
        (error) => {
                console.log("Erro no back end !", error);
                return []
            }
        )
    }

    // Save edited user
    updtUser({name, password, uid}) {
        return axios.put(`${url}/user/${uid}`, {
            name,
            password
        })
        .then(
            (response) => {
            return response.data
        },
        (error) => errorBE(error))
    }

    // Remove user
    delUser(uid) {
        return axios.delete(`${url}/user/${uid}`)
        .then(
            (response) => {
                return response.data
        },
        (error) => errorBE(error))
    }    

// ---------------- M E S S A G E S     
    // Store new messages
    saveMessage({description, details}, uid) {
        //Enforce the size of the arrays to not upset the DB
        const descriNew = description.slice(0,44);
        const detailNew = details.slice(0,149);
        return axios.post(`${url}/message/${uid}`, {
            description: descriNew,
            details: detailNew
        })
        .then(
            (response) => {
                return response.data;
            },
        (error) => errorBE(error))
    }

    // Get all users's messages
    getMessages(userID) {
        return axios.get(`${url}/messages/${userID}`)
        .then(
            (response) => {
                return response.data;
            },
        (error) => {
            console.log("Erro no back end !", error);
            return []
        })
    }

    // Remove message
    delMessage(messageID) {
        return axios.delete(`${url}/message/${messageID}`)
        .then(
            (response) => {
                return response.data
        },
        (error) => errorBE(error))
    }    

    // Save edited  message
    updtMessage({description, details, uid}) {
        const descriNew = description.slice(0,44);
        const detailNew = details.slice(0,149);
        return axios.put(`${url}/message/${uid}`, {
            description: descriNew,
            details: detailNew
        })
        .then(
            (response) => {
                return response.data
        },
        (error) => errorBE(error))
    }    
}

export default new Api();