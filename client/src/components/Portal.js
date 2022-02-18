import React from "react";
import Icon from "./Icon";
import styles from "./portal.module.css";
import Post from "./Post.js";
export default function Portal() {
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
          <Post />
        </div>
      </main>
    </>
  );
}
