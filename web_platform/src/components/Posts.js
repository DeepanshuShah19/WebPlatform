import React, { Component } from "react";
import Nav from "./NavBar";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Grid,
  CssBaseline,
  Paper,
  Box,
} from "@mui/material";
import { getUserMeetings } from "../utils/apiCalls"

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          title: "Meeting 1",
          link: "http://www.post1.com",
          date: "March 1, 2023",
          time: "12:00 PM",
        },
        {
          title: "Meeting 2",
          link: "http://www.post2.com",
          date: "March 2, 2023",
          time: "12:00 PM",
        },
        {
          title: "Meeting 3",
          link: "http://www.post3.com",
          date: "March 3, 2023",
          time: "12:00 PM",
        },
      ],
    };
  }

  componentDidMount= async () => {
    let userMeeting = await getUserMeetings("shah8y@uwindsor.ca")
    console.log("userMeetings: ",userMeeting)
    //saving in this.state.posts
  }

  render() {
    return (
      <>
        <Nav />
        <Grid
          container
          component="main"
          sx={{
            height: "100vh",
            background: "linear-gradient(135deg, #c89abc 0%, #99c7a5 100%)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <Grid
            sx={{ padding: 1 }}
            item
            xs={8}
            sm={4}
            md={3}
            component={Paper}
            elevation={10}
            squares
          >
            <Box
              sx={{
                // border: "1px solid black",
                padding: 1,
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" sx={{ color: "gray" }} variant="h5">
                List of Meetings
              </Typography>
              <Grid container spacing={1} sx={{ paddingTop: 1 }}>
                {this.state.posts.map((post, index) => (
                  <Grid item xs={12}>
                    <Card
                      key={index}
                      sx={{
                        border: "1px Solid gray",
                        minWidth: 275,
                        margin: "20px",
                      }}
                    >
                      <CardContent>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: "10px",
                            textAlign: "center",
                          }}
                          gutterBottom
                        >
                          <Link href={post.link}>{post.title}</Link>
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: "gray",
                            textAlign: "center",
                          }}
                        >
                          {post.date} {post.time}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Posts;
