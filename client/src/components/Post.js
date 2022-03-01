import styles from "./post.module.scss";
import AddCommentIcon from "@mui/icons-material/AddComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

export default function Post({ post, mood }) {
  const { body, media_url, profile_url, firstname } = post;
  return (
    <Card sx={{ marginY: 2.5 }}>
      <CardContent>
        <div className={styles.profileContainer}>
          <CardMedia
            component="img"
            alt="Get better connection nerd!"
            className={styles.profilePic}
            image={profile_url}
          />
          <div className={styles.profileText}>{firstname}</div>
        </div>
        <CardMedia
          component="img"
          alt="Get better connection nerd!"
          height="400"
          maxWidth="10"
          image={media_url}
        />
        <Typography variant="h6" color="black" sx={{ paddingTop: 2.5 }}>
          {body}
        </Typography>
        <Typography variant="h6" color="black" sx={{ paddingTop: 2.5 }}>
          {mood}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Avatar sx={{ bgcolor: "red" }}>
            <FavoriteIcon />
          </Avatar>
        </Button>
        <Button size="small">
          <Avatar sx={{ bgcolor: "RGB(24, 120, 244)" }}>
            <AddCommentIcon />
          </Avatar>
        </Button>
      </CardActions>
    </Card>
  );
}
