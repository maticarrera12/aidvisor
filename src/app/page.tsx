'use client'
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {data: session} = authClient.useSession()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const onSignOut = () => {
    authClient.signOut({
      onError: () => {
        window.alert('Error al cerrar sesión')
      },
      onSuccess: () => {
        window.alert('Sesión cerrada')
        router.push('/sign-in')
      }
    })
  }

  if(session){
    return(
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={onSignOut}>
          Sign Out
        </Button>
      </div>
    )
  }
  return (
    <div className="p-4 flex flex-col gap-y-4">
      {/* Aquí puedes poner tu formulario de registro o login */}
    </div>
  );
}
