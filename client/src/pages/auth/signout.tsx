import React, { useEffect } from 'react'
import { useRequest } from '@/hooks'
import { useRouter } from 'next/router'
import { NextPage } from 'next';
import { ICurrentUser } from '@/types/user';
const SignOut = ({currentUser}:{currentUser:ICurrentUser}) => {
    
    const router = useRouter();

    const {doRequest} = useRequest({url:"/api/users/signout",method:"post", onSuccess :()=>{
        router.push("/")
    }})
    useEffect(()=>{
        doRequest();
    },[])
  return (
    <div>
        <h1 className='text-center text-4xl'>
            Signing ${currentUser?.email} out...
        </h1>
    </div>
  )
}

export default SignOut