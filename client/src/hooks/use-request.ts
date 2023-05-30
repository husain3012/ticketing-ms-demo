import { IRequest } from "@/types/hooks"
import axios from "axios"
import { IAPIError } from "@/types/api-error"
import { useState } from "react"
import { toast } from "react-hot-toast"

axios.defaults.withCredentials = true;
const useRequest = ({url, method, body, onSuccess}:IRequest) =>{
    const [errors, setErrors] = useState<IAPIError[]>([]);

    const doRequest = async () =>{
        setErrors([])

        try {

                const resp =  await axios[method](url, body);
                

                if(onSuccess){
                    return await onSuccess(resp)
                }
                return resp;
            
        } catch (error:any) {

            const errors: IAPIError[] = error.response.data?.errors || [];
            setErrors(errors);
            errors.forEach((err) => toast.error(err.message));
            
        }
    }
    return {doRequest, errors};

}
export {useRequest};

