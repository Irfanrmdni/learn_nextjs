import { useState } from "react";
import { authPage } from "../../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../../components/Nav";

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);
    const { id } = ctx.query;

    const postReq = await fetch('http://localhost:3000/api/posts/detail/' + id, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const resp = await postReq.json();

    return {
        props: {
            token,
            post: resp.data
        } // will be passed to the page component as props
    }
}

export default function PostUpdate(props) {

    const { post } = props;

    const [fields, setFields] = useState({
        title: post.title,
        content: post.content
    });

    const [status, setStatus] = useState('normal');

    async function updateHandler(e) {
        e.preventDefault();

        setStatus('loading');

        const { token } = props;

        const update = await fetch('/api/posts/update/' + post.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        });

        if (!update.ok) return setStatus('Error');

        const res = await update.json();

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
        <div className="update_post">
            <h1>Update Post</h1>
            <hr />
            <p className={checkStatus(status)}>Status: {status}</p>
            <Nav />
            <span className="post_id">Post ID: {post.id}</span>
            <form onSubmit={updateHandler.bind(this)}>
                <input onChange={fieldsHandler.bind(this)} type="text" name="title" placeholder="Title" defaultValue={post.title} />
                <textarea onChange={fieldsHandler.bind(this)} name="content" placeholder="content" defaultValue={post.content}></textarea>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}