import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";

export default function Nav() {

    async function logoutHandler(e) {
        e.preventDefault();
        Cookies.remove('token');
        Router.replace('/auth/login');
    }

    return (
        <>
            <Link href="/posts"><a className="btn_post">Posts</a></Link>
            <Link href="/posts/create"><a className="btn_createPost">Create Post</a></Link>
            <a href="#" className="btn_logout" onClick={logoutHandler.bind(this)}>Logout</a>
        </>
    );
}