import React from "react";
import { makeStyles } from "@mui/styles";

import Card from "@mui/material/Card";
import styled from "@emotion/styled";
import CardHeader from "@mui/material/CardHeader";
import Appbar from "@/components/AppBar";
import { useRouter } from "next/router";
const useStyles = makeStyles(() => ({
  card: {
    flex: 1,
    position: "absolute",
    top: -31,
    left: 0,
    right: 0,
  },
  media: {
    position: "absolute",
    left: 0,
    top: 20,
    width: "100%",
    userSelect: "none",
    objectFit: "cover",
  },
  header: {
    fontFamily: "Lacquer !important",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
  },
}));

const MediaItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto 0;
  max-width: 650px;
  width: 100%;
  height: 100%;
`;

const FeedDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

export default function FeedbackDialog() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Appbar />
      <FeedDetail>
        <MediaItem style={{ position: "relative" }}>
          <Card className={classes.card}>
            <CardHeader
              disableTypography={true}
              title="Howisthe.surf"
              className={classes.header}
            />
          </Card>
          {/* <Image
            className={classes.media}
            publicId={router.query.mediaUrl as string}
            crop="scale"
            width="700"
            alt="Howisthe.surf"
          /> */}
        </MediaItem>
      </FeedDetail>
    </>
  );
}
