import Icon from "./Icon";
import styles from "./post.module.scss";
export default function Post() {
  return (
    <div className={styles.container}>
      <div>
        <span>Ricardo</span>
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti nam
        atque sint eligendi rem. Veritatis dicta tempora explicabo. Eius
        praesentium quia dolorum, obcaecati accusantium culpa sunt dolores
        expedita et inventore.
      </p>
      <div>
        <Icon code="favorite" color="red" />
        <Icon code="thumb_down" />
      </div>
    </div>
  );
}
