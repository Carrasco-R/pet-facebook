import Icon from "./Icon";
import styles from "./post.module.scss";
export default function Post({ post }) {
  const { username, body, media_url } = post;
  // console.log(username);
  return (
    <div className={styles.container}>
      <div>
        <span>{username}</span>
      </div>
      <p>{body}</p>
      <iframe
        title="Media"
        src={media_url}
        alt="Ur blind"
        width="100%"
        height="100%"
      ></iframe>
      <div>
        <Icon code="favorite" color="red" />
      </div>
    </div>
  );
}
