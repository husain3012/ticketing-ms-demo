import axios, { Axios } from "axios";
import { IncomingMessage } from "http";


const buildClient =  ({req}:{req:IncomingMessage}) : Axios => {
    if(typeof window === "undefined"){
        return axios.create({
            baseURL : 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            withCredentials: true,
            headers: req.headers
        })
    }
    return  axios.create({
        baseURL: "/",
        withCredentials:true
    })

    

} 




export default buildClient;