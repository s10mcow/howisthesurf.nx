import React, { useMemo } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { formatDistance } from "date-fns";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

import styled from "@emotion/styled";
import { Avatar, CardMedia } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Share from "@mui/icons-material/Share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import NextImage from "next/image";

export const NoMediaCard = styled.article`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 30px;
  min-height: 150px;
  flex: 1;
  font-size: 20px;
  background: #ccc;
  border-radius: 5px;
  color: white;
`;

const User = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  .User__name {
    margin-left: 10px;
    font-weight: bold;
    font-size: 14px;
  }
`;

const StyledCard = styled.div<{ width: number; height: number }>`
  .card {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    border-radius: 0;
    position: relative;
    box-shadow: 0px 0px 50px 10px rgb(0 0 0 / 0.3);
  }

  .mediaContainer {
    order: 1;
    position: relative;
    padding-bottom: ${(props) => (props.height / props.width) * 100}%;
  }

  .media {
    user-select: none;
    object-fit: cover;
  }

  .content {
    order: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 1;
  }

  .share {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
`;

//@ts-ignore
export default function MediaCard({ data }) {
  const userPublicId =
    data && data.user && data.user.image && data.user.image.public_id;
  const [isCopied, setCopied] = React.useState(false);

  const cld = useMemo(
    () =>
      new Cloudinary({
        cloud: {
          cloudName: "howisthesurf",
        },
      }),
    []
  );

  const image = useMemo(() => cld.image(userPublicId), [cld, userPublicId]);

  return (
    <>
      <Dialog
        onClose={() => setCopied(false)}
        aria-labelledby="customized-dialog-title"
        open={isCopied}
      >
        <MuiDialogContent dividers>
          <TextField
            style={{ width: 290 }}
            value={`https://howisthe.surf/feedback/${data.public_id}`}
            variant="outlined"
          />
        </MuiDialogContent>
        <MuiDialogContent>
          <CopyToClipboard
            text={`https://howisthe.surf/feedback/${data.public_id}`}
          >
            <Button autoFocus onClick={() => setCopied(false)} color="primary">
              Copy Link
            </Button>
          </CopyToClipboard>
        </MuiDialogContent>
      </Dialog>

      <StyledCard {...data}>
        <Card className="card">
          <CardMedia className="mediaContainer">
            <NextImage className="media" src={data.url} fill alt="Surf" />
          </CardMedia>

          {/* <CardActions> */}
          <CardContent className="content">
            <IconButton
              aria-label="share"
              className="share"
              onClick={() => setCopied(true)}
            >
              <Share style={{ color: "white" }} fontSize="large" />
            </IconButton>
            <User>
              <Avatar>
                <AdvancedImage cldImg={image} width={50} height={50} />
              </Avatar>
              <div className="User__name">{data.user.name}</div>
            </User>
            <div>
              {data.created_at && (
                <Typography gutterBottom variant="h5" component="h2">
                  {formatDistance(new Date(data.created_at), new Date())} ago
                </Typography>
              )}
              {/* @ts-ignore */}
              {data.tags.map((tag, key) => (
                <Typography
                  key={key}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {tag}
                </Typography>
              ))}
            </div>
          </CardContent>
          {/* </CardActions> */}
        </Card>
      </StyledCard>
    </>
  );
}
