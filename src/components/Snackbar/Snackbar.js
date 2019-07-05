import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import MySnackbarContentWrapper from './SnackbarContent';

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles2();
  const [open, setOpen] = React.useState(true);
  console.log(props)
  function handleClose(event, reason) {
    setOpen(false)
    props.snackClosed()
  }

  return (
    <div>
        {
            props.success && props.action === 'add' ?
              <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant="success"
                    message="Il libro è stato aggiunto alla tua libreria."
                />
              </Snackbar>
            : null 
        }
        {
          !props.success && props.action === 'add' ?
          <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
              <MySnackbarContentWrapper
                  variant="error"
                  onClose={handleClose}
                  className={classes.margin}
                  message="Errore nell'aggiunta del libro!"
              />
          </Snackbar>
          : null
        }
        {
          props.success && props.action === 'remove' ?
            <Snackbar
              anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
              }}
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <MySnackbarContentWrapper
                  onClose={handleClose}
                  variant="success"
                  message="Il libro è stato rimosso dalla tua libreria."
              />
            </Snackbar>
          : null 
        }
        {
          !props.success && props.action === 'remove' ?
          <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
              <MySnackbarContentWrapper
                  variant="error"
                  onClose={handleClose}
                  className={classes.margin}
                  message="Errore nell'eliminazione del libro!"
              />
          </Snackbar>
          : null
        }
    </div>
  );
}