import React, { useContext, useEffect, useState } from "react";
import Icon from "./Icon";
import styles from "./portal.module.css";
import Post from "./Post.js";
import userContext from "./userContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export default function Portal() {
  const { user } = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const res = await fetch(`http://localhost:8000/posts/${user}`);
    if (res.ok) {
      console.log("POSTS FOUND");
      let json = await res.json();
      setPosts(json.body.reverse());
    } else {
      console.log("POST FETCH FAILED");
    }
    console.log({ posts });
  };
  useEffect(() => {
    (async function () {
      await fetchPosts();
    })();
  }, [user]);

  const submitPost = async (e) => {
    e.preventDefault();
    let form = new FormData(e.currentTarget);
    let res = await fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        body: form.get("body"),
        mood: form.get("mood"),
        media_url: form.get("media_url"),
      }),
    });
    if (res.ok) {
      await fetchPosts();
    } else {
      console.log("POST FAILED");
    }
  };

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
            <Card>
              <CardContent>
                <form onSubmit={submitPost}>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="What's on your mind?"
                    style={{ width: "100%" }}
                  />
                  <label>
                    Mood
                    <input name="mood" />
                  </label>
                  <label>
                    URL
                    <input name="media_url" />
                  </label>
                  <Button type="submit">Post</Button>
                </form>
              </CardContent>
            </Card>

            {posts.map((post, index) => {
              return <Post key={index} post={post} />;
            })}
          </div>
        </main>
      </>
    );
  }
}
