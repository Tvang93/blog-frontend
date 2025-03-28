'use client'

import { createAccount, getLoggedInUserData, login } from "@/utils/DataServices";
import { IToken } from "@/utils/Interfaces";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [switchBool, setSwitchBool] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {push} = useRouter()

  const handleSwtich = () => {
    setSwitchBool(!switchBool);
  }

  const handleSubmit = async () => {
    let userData = {
      username: username,
      password: password
    }

    console.log(userData)

    if(switchBool){
      //create account
      let result = await createAccount(userData);
      result ? alert("Account Created") : alert("Username Already Exist")
    }else{
      //login
      let token: IToken = await login(userData);

      if(token != null){
        if(typeof window != null){
          localStorage.setItem("Token", token.token)
          console.log(token.token)
          await getLoggedInUserData(username)


        }
        push('/Dashboard')
      }else{
        alert("Login was no good. Wrong Password or Something.")
      }
    }
    
  }

  return (
    <main className="grid grid-flow-row justify-center mt-[15rem]">
      <div className="bg-slate-400 min-w-96 p-8 rounded-lg">
        <h1 className="text-3xl">{switchBool? 'Create Account' : 'Login'}</h1>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username">Your Username</Label>
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="Enter Username"
              onChange={(e)=>setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1">Your password</Label>
            </div>
            <TextInput 
            id="password1" 
            type="password" 
            onChange={(e)=>setPassword(e.target.value)}
            required />
          </div>
          <div className="flex items-center gap-2">
            <Button color="light" onClick={handleSwtich}>{switchBool ? 'Already have an Account' : 'Click to creat a new Account'}</Button>
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </form>
      </div>
    </main>
  );
}
