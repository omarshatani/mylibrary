import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useStyles } from './styles';
import Home from './Home/Home';
import MyBooks from './MyBooks/MyBooks';
import Favourites from './Favourites/Favourites';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCouch,
  faBookOpen,
  faHeart,
  faBookReader,
  faBook
} from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  }
  const handleDrawerClose = () => {
    setOpen(false);
  }
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }, classes.paper),
          }}
          open={open}
          onMouseEnter={handleDrawerOpen}
          onMouseLeave={handleDrawerClose}
        >
          <List>
            <Link to="/" className={classes.listLink}>
              <ListItem button>
                <ListItemIcon><FontAwesomeIcon size="2x" icon={faCouch} color="rgba(255, 255, 255, 0.7)" /></ListItemIcon>
                <ListItemText primary={'Home'} className={classes.itemColor} />
              </ListItem>
            </Link>
            <Divider light style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)'}} />
          {[{ text: 'I miei libri', icon: faBookOpen, url: '/mybooks/'}, 
            { text: 'Preferiti', icon: faHeart, url: '/favourites/'}, 
            { text: 'In lettura', icon: faBookReader, url: '/current/'}, 
            { text: 'Letti', icon: faBook, url: '/finished/'}].map(el => (
              <Link to={el.url} className={classes.listLink} key={el.text}>
                <ListItem button style={{ padding: '13px 16px' }}>
                  <ListItemIcon><FontAwesomeIcon size="2x" icon={el.icon} color="rgba(255, 255, 255, 0.7)" /></ListItemIcon>
                  <ListItemText primary={el.text} className={classes.itemColor} />
                </ListItem>
              </Link>
          ))}
          </List>
        </Drawer>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
          <Route path="/" exact component={Home} />
          <Route path="/mybooks/" component={MyBooks} />
          <Route path="/favourites/" component={Favourites} />
      </main>
    </div>
    );
  }

export default App;
