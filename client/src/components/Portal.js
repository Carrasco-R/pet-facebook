import React, { useContext, useEffect, useState } from "react";
import Icon from "./Icon";
import styles from "./portal.module.css";
import Post from "./Post.js";
import userContext from "./userContext";

export default function Portal() {
  const { user } = useContext(userContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`http://localhost:8000/posts/${user}`);
      if (res.ok) {
        console.log("POSTS FOUND");
        let json = await res.json();
        setPosts(json.body);
      } else {
        console.log("POST FETCH FAILED");
      }
      console.log({ posts });
    };
    fetchPosts();
  }, [user]);
  if (posts) {
    return (
      <>
        <header className={styles.header}>
          <h1 className={styles.brand}>
            <Icon code="pets" size="1.2em" />
            Pet-facebook
          </h1>
        </header>
        <main className={styles.main}>
          <div className={styles.wall}>
            {posts.map((post, index) => {
              return <Post key={index} post={post} />;
            })}
          </div>
        </main>
      </>
    );
  }
}
