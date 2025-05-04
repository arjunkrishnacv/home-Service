import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";
import axios from "axios";

//registerAPI called by Auth
export const registerAPI = async(reqBody,reqHeaders)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody,reqHeaders)
}

//loginAPI called by Auth
export const loginAPI = async(reqBody,reqHeaders)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody,reqHeaders)

}

// }
//addRequestAPI called by Auth
export const addRequestAPI = async(reqBody, reqHeaders) => {
    return await commonAPI("POST", `${SERVER_URL}/orders`, reqBody, reqHeaders);
}

  
export const removeOrderAPI = async (reqBody, reqHeaders) => {
    return await axios.post(`${SERVER_URL}/remove-orders`, reqBody, {
      headers: reqHeaders
    });
  };


// Example: services/allAPI.js
export const updateOrderAPI = (reqBody, reqHeaders) => {
  return commonAPI(`${SERVER_URL}/remove-orders`, reqBody, reqHeaders); // is "/update" the correct path?
};


