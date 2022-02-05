import { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/Nav";

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);

    const postsReq = await fetch('http://localhost:3000/api/posts', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    const posts = await postsReq.json();

    return {
        props: {
            token,
            posts: posts.data
        } // will be passed to the page component as props
    }
}

export default function PostIndex(props) {

    const [posts, setPosts] = useState(props.posts);

    // ? delete
    async function deleteHandler(id, e) {
        e.preventDefault();

        const { token } = props;
        const ask = confirm('Apakah anda yakin ingin menghapus data ?');

        if (ask) {
            const deletePost = await fetch('/api/posts/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            const res = await deletePost.json();
            alert('Data berhasil di DELETE :)')

            const postFiltered = posts.filter(post => {
                return post.id !== id ? post : '';
            });

            setPosts(postFiltered);
        }

    }

    // ? update
    function updateHandler(id) {
        Router.push('/posts/update/' + id);
    }

    return (
        <div className="post">
            <h1>Posts Data</h1>
            <hr />
            <Nav />
            <ul>
                {posts.map(post => {
                    return (
                        <>
                            <li>
                                <h5 key={post.id}>{post.title}</h5>
                                <p>{post.content}</p>

                                <div className="action">
                                    <button onClick={updateHandler.bind(this, post.id)} className="btn_edit">Update</button>
                                    <button onClick={deleteHandler.bind(this, post.id)} className="btn_delete">Delete</button>
                                </div>
                            </li>
                            <hr className="line" />
                        </>
                    )
                })}
            </ul>
        </div>
    );
}