
import React from 'react';
import {Navbar} from "@/shared-components/header/Navbar";
import {auth} from "@/auth";

const Home = async ()=> {
    const session = await auth();
  return (
    <div>
        <Navbar session={session}/>
      <h1>Home Page</h1>
    </div>
  );
}
export default Home;
