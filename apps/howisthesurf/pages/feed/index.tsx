import React, { useEffect } from 'react';
import Feed from '../../modules/Feed';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  dialog: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default function FeedbackDialog() {
  const classes = useStyles();
  const router = useRouter();
  const closeFeedback = () => {
    router.push('/');
  };

  return (
    <Dialog fullScreen open={true} onClose={closeFeedback}>
      <DialogContent className={classes.dialog}>
        <Feed name={'sten'} toggle={closeFeedback} />
      </DialogContent>
    </Dialog>
  );
}
