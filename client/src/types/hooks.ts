import { AxiosResponse } from "axios";

export interface IRequest {
    url : string;
    method: "get"|"post"|"patch"|"put"|"delete";
    body?: any;
    onSuccess?:(arg0: AxiosResponse)=>any
}

