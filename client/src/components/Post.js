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
      <img src={media_url} alt="Ur blind" width="50%" height="50%"></img>
      <div>
        <Icon code="favorite" color="red" />
      </div>
    </div>
  );
}
