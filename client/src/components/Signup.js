import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "./userContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PetsIcon from "@mui/icons-material/Pets";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";

export default function SignUp() {
  const [value, setValue] = useState(null);
  const [age, setAge] = useState(0);
  const { setUser } = useContext(userContext);
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      breed: data.get("breed"),
      color: data.get("color"),
      gender: data.get("gender"),
      age: age,
      birthday: data.get("birthday"),
      profile_url: data.get("profile_url"),
    });
    const res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      console.log("LOGGED IN");
      setUser(data.username);
      navigate("/portal");
    } else {
      console.log("Unauthenticated");
    }
  };
  const ageHandler = (newValue) => {
    let date = moment();
    var birthday = moment(newValue, "YYYY");
    setAge(date.diff(birthday, "years"));
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "blue" }}>
          <PetsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="gender"
                required
                fullWidth
                id="gender"
                label="Gender"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="color"
                label="Color"
                name="color"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="breed"
                required
                fullWidth
                id="breed"
                label="Breed"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="Birthday"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                    ageHandler(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} name="birthday" id="birthday" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                disabled
                value={age}
                id="age"
                label="Age"
                name="age"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="profile_url"
                label="Profile Link"
                id="profile_url"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
