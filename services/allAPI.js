import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

//registerAPI called by Auth
export const registerAPI = async(reqBody,reqHeaders)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody,reqHeaders)
}

//loginAPI called by Auth
export const loginAPI = async(reqBody,reqHeaders)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody,reqHeaders)

}


//addRequestAPI called by Auth
// export const addRequestAPI = async(reqBody)=>{
//     return await commonAPI("POST",`${SERVER_URL}/orders`,reqBody)

// }

export const addRequestAPI = async(reqBody, reqHeaders) => {
    return await commonAPI("POST", `${SERVER_URL}/orders`, reqBody, reqHeaders);
}