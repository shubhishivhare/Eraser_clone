"use client"
import { api } from '@/convex/_generated/api';
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Email } from '@material-ui/icons';
import { useConvex, useMutation, useQuery } from 'convex/react'
import React, { useEffect } from 'react'

function Dashboard() {
  const {user}:any = useKindeBrowserClient();
  const convex = useConvex();
  //const getUser= useQuery(api.user.getUser, {email:user?.email});

  const createUser = useMutation(api.user.createUser);
  useEffect(()=>{
    if(user)
    {
     checkUser()
    }

  },[user])

  const checkUser = async()=>{
    const result = await convex.query(api.user.getUser,{email:user?.email});

    if(!result?.length)
    {
      createUser({
        name:user.given_name,
        email:user.email,
        image:user.picture
      }).then((resp)=>{
        console.log(resp)
      })
    }
  }

  return (
    <div> 
    </div>
  )
}

export default Dashboard