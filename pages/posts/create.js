import { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/Nav";

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);

    return {
        props: {
            token
        } // will be passed to the page component as props
    }
}

export default function PostCreate(props) {

    const [fields, setFields] = useState({
        title: '',
        content: ''
    });

    const [status, setStatus] = useState('normal');

    async function createHandler(e) {
        e.preventDefault();

        setStatus('loading');

        const { token } = props;

        const create = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        });

        if (!create.ok) return setStatus('Error');

        const res = await create.json();

        setStatus('success');

        Router.push('/posts');
    }

    function fieldsHandler(e) {
        e.preventDefault();
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        });
    }

    function checkStatus(status) {
        if (status === 'success') {
            return 'success'
        }
        if (status === 'error') {
            return 'error'
        }
        if (status === 'normal') {
            return 'normal'
        }
    }

    return (
        <div className="create_post">
            <h1>Create a Post</h1>
            <hr />
            <p className={checkStatus(status)}>Status: {status}</p>
            <Nav />
            <form onSubmit={createHandler.bind(this)}>
                <input onChange={fieldsHandler.bind(this)} type="text" name="title" placeholder="Title" />
                <textarea onChange={fieldsHandler.bind(this)} name="content" placeholder="content"></textarea>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}