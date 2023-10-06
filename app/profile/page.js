"use client"

import React, { use } from 'react';
import { UserContext } from '@/providers/userProvider';
function Login() {
  
    const {user} = React.useContext(UserContext);
console.log(" users data", user);

  return (
    <div >

        <div>
            <h1>
                NAME : {user?.first_name + " " + user?.last_name}
            </h1>

            <h1>
                EMAIL : {user?.email}
            </h1>

            <h1>
               YOU ARE : {user?.seller == 1 ? "SELLER" : "BUYER"}
            </h1>
        </div>

    
    </div>
  );
}

export default Login;