import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from "@firebase/firestore";
import { Button, Grid, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import links from "../../links.json";
import dayjs from "dayjs";
import {
  BodyContainer,
  MainContainer,
  PlayContainer,
  PositionContainer,
} from "./style";

const Home = () => {
  const [initialized, setInitialized] = useState(undefined);
  const [video, setVideo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function checkInitialized() {
      try {
        const querySnapshot = await getDocs(collection(db, "videos"));
        if (querySnapshot.empty) {
          setInitialized(false);
        } else {
          setInitialized(true);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
        setErrorMessage(e.message);
      }
    }
    checkInitialized();
  }, []);

  useEffect(() => {
    if (initialized) {
      getVideo();
    }
  }, [initialized]);

  async function getVideo() {
    const q = query(
      collection(db, "videos"),
      where(`seen`, "==", false),
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
      setInitialized(undefined);
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
      setInitialized(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  if (initialized === undefined) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center">
          {errorMessage ? errorMessage : 'Initializing....'}
        </Typography>
      </Container>
    );
  }

  if (initialized === false) {
    return (
      <Container style={{ height: "100vh" }}>
        <Typography align="center" style={{ margin: "2rem" }}>
          Welcome to Ahmed Subhy Mansour videos
        </Typography>
        <Button
          variant="contained"
          onClick={() => initializeDatabase()}
          style={{
            height: "250px",
            width: "100%",
            margin: "0 auto",
            marginTop: "100px",
            borderRadius: "32px",
          }}
        >
          {`Initialize Database with ${links.length} videos`}
        </Button>
      </Container>
    );
  }

  const playVideo = async (url, videoId) => {
    await setDoc(doc(db, "videos", videoId), {
      ...video,
      seen: true,
    });
    await getVideo();
    window.open(url, "_blank");
  };

  // make random number from 0 to 360
  const random = Math.random() * 360;

  return (
    <MainContainer>
      <Typography variant="h3">
        Welcome to Ahmed Subhy Mansour videos
      </Typography>
      <Typography
        style={{ marginBottom: "10px" }}
        variant="subtitle1"
        color="textSecondary"
      >
        Recommended next video to watch
      </Typography>
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
            <Typography variant="caption">{`${dayjs(video.date).format(
              "ddd DD-MMM-YYYY"
            )}`}</Typography>
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
      <div>
        <img
          src={video.thumbnail}
          alt={video.title}
          style={{ width: "100%" }}
        />
      </div>
    </MainContainer>
  );
};

export default Home;
