'use client'
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const {data: session} = authClient.useSession()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = ()=>{
    authClient.signUp.email({
      email,
      name,
      password
    },{
       onError: () =>{
        window.alert('Something went wrong')
       },
       onSuccess: ()=>{
        window.alert("Success")
       }
    })
  }

  if(session){
    return(
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={()=> authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    )
  }
  return (
<div className="p-4 flex flex-col gap-y-4">
  <Input type="text" placeholder="name" value={name} onChange={(e)=> setName(e.target.value)}/>
  <Input type="email" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
  <Input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

  <Button onClick={onSubmit}>
    Create User
  </Button>
</div>
  );
}
