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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FriendList from "./FriendList";
import Grid from "@mui/material/Grid";
import Foo from "./Foo";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      marginLeft: 35,
    },
  },
};

const feelings = [
  "Happy",
  "Sad",
  "Angry",
  "Hungry",
  "Sleepy",
  "Grateful",
  "Goofy",
  "Scared",
  "Anxious",
  "Relaxed",
];

export default function Portal() {
  const { user } = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const [mood, setMood] = React.useState([]);

  const handleMood = (event) => {
    const {
      target: { value },
    } = event;
    setMood(typeof value === "string" ? value.split(",") : value);
  };

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
        <Grid container direction="row" spacing={2}>
          <Grid item xs>
            <Foo />
          </Grid>
          <Grid
            item
            container
            sx={{ marginTop: 8 }}
            direction="column"
            xs
            spacing={2}
          >
            <Grid item xs>
              <Card>
                <CardContent>
                  <form onSubmit={submitPost}>
                    <TextareaAutosize
                      aria-label="minimum height"
                      id="body"
                      name="body"
                      minRows={3}
                      placeholder="What's on your mind?"
                      style={{ width: "98%" }}
                    />
                    {/* <InputLabel id="mood-label">Mood</InputLabel> */}
                    <Select
                      className={styles.mood}
                      sx={{ width: "100%", height: 57, marginTop: 2 }}
                      labelId="mood-label"
                      id="mood"
                      name="mood"
                      multiple
                      value={mood}
                      onChange={handleMood}
                      input={<OutlinedInput label="Mood" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {feelings.map((feeling) => (
                        <MenuItem key={feeling} value={feeling}>
                          <Checkbox checked={mood.indexOf(feeling) > -1} />
                          <ListItemText primary={feeling} />
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      sx={{ marginTop: 2, width: "100%" }}
                      label="URL"
                      id="media_url"
                      name="media_url"
                    />
                    <Button
                      sx={{ marginTop: 2, width: "100%" }}
                      variant="contained"
                      type="submit"
                    >
                      Post
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs>
              {posts.map((post, index) => {
                return <Post key={index} post={post} mood={mood} />;
              })}
            </Grid>
          </Grid>

          <Grid item xs>
            <FriendList />
          </Grid>
        </Grid>
      </>
    );
  }
}
