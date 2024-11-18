import commonApi from "./commonApi";
import SERVER_URl from './serverUrl'

export const registerAPI=async(reqBody)=>
{
    return await commonApi("POST",`${SERVER_URl}/register`,reqBody)
}

export const loginAPI=async(reqBody)=>{
    return await commonApi("POST",`${SERVER_URl}/login`,reqBody)
}

export const addTaskAPI=async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URl}/add-task`,reqBody,reqHeader)
}

export const userTasksAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URl}/view-task`,{},reqHeader)
}

export const taskUpdateAPI = async (id, reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URl}/tasks/${id}/update-task`, reqBody, reqHeader)
}

export const taskDeleteAPI = async (id, reqHeader) => {
    return await commonApi("DELETE", `${SERVER_URl}/tasks/${id}/delete-task`, {}, reqHeader)
}