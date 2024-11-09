"use client"
import {Button} from "primereact/button";
import {FloatLabel} from "primereact/floatlabel";
import {InputText} from "primereact/inputtext";
import { useState} from "react";
import {useSession} from "next-auth/react";

const Home = ()=> {
    const [value, setValue] = useState('');
    const { data: session } = useSession();
    // useEffect(()=>{
    //     showAlertWithCallback('Login Successful', 'You are now logged in!', 'success');
    // }, [])
  return (
    <div>
      <Button label="Submit"  />
        <h1 className={"bg-amber-300"}>this is tailwind test</h1>
        <FloatLabel className={"mt-10"}>
            <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
            <label htmlFor="username">Username</label>
        </FloatLabel>
        <h3>this is working fine</h3>
        <p>{ session?.user?.accessToken}</p>
    </div>
  );
}
export default Home;
