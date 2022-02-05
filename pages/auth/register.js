import Link from "next/link";
import { useState } from "react";
import { unauthPage } from '../../middlewares/authorizationPage';

export async function getServerSideProps(ctx) {
   await unauthPage(ctx);

   return {
      props: {}, // will be passed to the page component as props
   }
}

export default function Register() {

   const [fields, setFields] = useState({
      email: '',
      password: ''
   });

   const [status, setStatus] = useState('normal');

   async function registerHandler(e) {
      e.preventDefault();

      setStatus('Loading...');
      const registerReq = await fetch('/api/auth/register', {
         method: 'POST',
         body: JSON.stringify(fields),
         headers: {
            'Content-Type': 'application/json'
         }
      });

      if (!registerReq.ok) return setStatus('Error' + registerReq.status);

      const registerResponse = await registerReq.json();

      setStatus('Success');
   }

   function fieldHandler(e) {
      e.preventDefault();
      const name = e.target.getAttribute('name');

      setFields({
         ...fields,
         [name]: e.target.value
      });
   }

   return (
      <div className="register">
         <p>{status}</p>

         <h1>Register account</h1>

         <form onSubmit={registerHandler.bind(this)}>
            <input type="text" name="email" placeholder="Email" onChange={fieldHandler.bind(this)} />
            <input type="password" name="password" placeholder="Password" onChange={fieldHandler.bind(this)} />

            <button type="submit">Register</button>
            <p>Already have an account?</p>
            <Link href="/auth/login"><a className="btn_register">Login</a></Link>
         </form>

      </div>
   );
}