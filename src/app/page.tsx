"use client"
import {Button} from "primereact/button";
import {FloatLabel} from "primereact/floatlabel";
import {InputText} from "primereact/inputtext";
import {useState} from "react";

export default function Home() {
    const [value, setValue] = useState('');
  return (
    <div>
      <Button label="Submit"  />
        <h1 className={"bg-amber-300"}>this is tailwind test</h1>
        <FloatLabel className={"mt-10"}>
            <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
            <label htmlFor="username">Username</label>
        </FloatLabel>
        <p>rhis </p>
        <h3>this is working fine</h3>
    </div>
  );
}
