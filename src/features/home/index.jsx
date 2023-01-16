import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  writeBatch,
} from "@firebase/firestore";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import links from "../../links.json";
import {
  BodyContainer,
  MainContainer,
  PlayContainer,
  PositionContainer,
} from "./style";

const Home = () => {
  const [initialized, setInitialized] = useState(undefined);
  const [video, setVideo] = useState({});
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    async function checkInitialized() {
      const querySnapshot = await getDocs(collection(db, "initialized"));
      if (querySnapshot.empty) {
        setInitialized(false);
      } else {
        setInitialized(true);
      }
    }
    checkInitialized();
    const localKey = localStorage.getItem("sessionId");
    if (localKey) {
      setSessionId(localKey);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      getVideo();
    }
  }, [initialized]);

  async function getVideo() {
    // query for video where watched array does not contain key, then order by publishedAt desc and limit to 1
    const q = query(
      collection(db, "videos"),
      orderBy("position", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setVideo(doc.data());
    });
  }
  const initializeDatabase = async () => {
    try {
      // batch add documents to videos collection 100 at a time until all links are added
      let batchCount = 0;
      let batch = writeBatch(db);
      for (const link of links) {
        const docRef = doc(db, "videos", link.videoId);
        batch.set(docRef, link);
        batchCount++;
        if (batchCount === 100) {
          await batch.commit();
          batchCount = 0;
          batch = writeBatch(db);
          console.log("100 videos added");
        }
      }
      await batch.commit();
      // add initialized document to initialized collection
      await setDoc(doc(db, "initialized", "initialized"), {
        date: new Date(),
      });
      setInitialized(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  if (initialized === undefined) {
    return (
      <Container>
        <h1>Welcome to Ahmed Subhy Mansour videos</h1>
        <div>Loading ....</div>
      </Container>
    );
  }

  if (initialized === false) {
    return (
      <Container>
        <h1>Welcome to Ahmed Subhy Mansour videos</h1>
        <Button variant="contained" onClick={() => initializeDatabase()}>
          Initialize
        </Button>
      </Container>
    );
  }

  const playVideo = async (url, videoId) => {
    await deleteDoc(doc(db, "videos", videoId));
    await getVideo();
    window.open(url, "_blank");
  };

  const handleSessionChange = (e) => {
    setSessionId(e.target.value);
    localStorage.setItem("sessionId", e.target.value);
  };

  // make random number from 0 to 360
  const random = Math.random() * 360;

  return (
    <MainContainer>
      <Typography variant="h2">
        Welcome to Ahmed Subhy Mansour videos
      </Typography>
      <Typography
        style={{ marginBottom: "10px" }}
        variant="subtitle1"
        color="textSecondary"
      >
        Recommended next video to watch
      </Typography>
      <TextField
        variant="outlined"
        label="session id"
        style={{ marginBottom: "100px" }}
        value={sessionId}
        onChange={handleSessionChange}
      />

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <PositionContainer random={random}>
            <Typography variant="h2">{video.position}</Typography>
          </PositionContainer>
        </Grid>
        <Grid item xs={6}>
          <BodyContainer>
            <Typography variant="h4">{video.title}</Typography>
            <Link href={video.url}>
              <Typography variant="h5">{video.url}</Typography>
            </Link>
            <Typography variant="body1">{video.description}</Typography>
            <Typography variant="caption">{video.date}</Typography>
          </BodyContainer>
        </Grid>
        <Grid item xs={3}>
          <PlayContainer>
            <Button
              variant="contained"
              onClick={() => playVideo(video.url, video.videoId)}
              size="large"
            >
              {`Play ${video.duration}`}
            </Button>
            <Typography variant="caption">{video.since}</Typography>
          </PlayContainer>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Home;
