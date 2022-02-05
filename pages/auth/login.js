import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { unauthPage } from '../../middlewares/authorizationPage';
import Link from 'next/link';

export async function getServerSideProps(ctx) {
   await unauthPage(ctx);

   return {
      props: {}, // will be passed to the page component as props
   }
}

export default function Login() {

   const [fields, setFields] = useState({
      email: '',
      password: ''
   });

   const [status, setStatus] = useState('Normal...');

   // useEffect(() => {
   //    const token = Cookies.get('token');

   //    if (token) return Router.push('/posts');
   // }, []);

   async function loginHandler(e) {
      e.preventDefault();

      setStatus('Loading...');

      const loginReq = await fetch('/api/auth/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(fields)
      });

      if (!loginReq.ok) return setStatus('error ' + loginReq.status);

      const loginResp = await loginReq.json();

      setStatus('Success...');

      Cookies.set('token', loginResp.token);

      Router.push('/posts');
   };

   function fieldHandler(e) {
      e.preventDefault();

      const name = e.target.getAttribute('name');
      setFields({
         ...fields,
         [name]: e.target.value
      });
   };

   return (
      <div className='login'>
         <p>{status}</p>
         <h1>Login account</h1>

         <form onSubmit={loginHandler.bind(this)}>
            <input type="text" name="email" placeholder="Email" onChange={fieldHandler.bind(this)} />
            <input type="password" name="password" placeholder="Password" onChange={fieldHandler.bind(this)} />

            <button type="submit">Login</button>
            <p>New User?</p>
            <Link href="/auth/register"><a className="btn_register">Create an account</a></Link>
         </form>
      </div>
   )
}