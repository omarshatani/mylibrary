import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
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
import Snackbar from '../components/Snackbar/Snackbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCouch,
  faBookOpen,
  faHeart,
  faBookReader,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import * as API from '../api/api'


class App extends Component {

  state = {
    open: false,
    success: undefined,
    books: [],
    myBooks: [],
    snackbarOpen: false
  }

  componentWillMount = () => {
    API.getBooks()
    .then(res => {
      console.log(res)
      this.setState({ books: [...this.state.books, ...res.data] })
    })
    API.getMyBooks()
    .then(res => {
      console.log(res)
      this.setState({ myBooks: [...this.state.myBooks, ...res.data] })
    })
}

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleAddBook = (book) => {
    API.addBook(book)
    .then(res => {
      console.log(res);
      this.setState({ success: true, snackbarOpen: true })
      API.getBooks()
      .then(res => this.setState({ books: res.data }))
    })
    .catch(err => {
      console.error(err)
      this.setState({ success: false, snackbarOpen: true })
    })
    
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false })
  }
  
  render () {

    const { open } = this.state;
    const { classes } = this.props;
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
            onMouseEnter={this.handleDrawerOpen}
            onMouseLeave={this.handleDrawerClose}
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
            <Route path="/" exact render={(props) => <Home books={this.state.books} addBook={this.handleAddBook} props={props} />} />
            <Route path="/mybooks/" render={(props) => <MyBooks books={this.state.myBooks} addBook={this.handleAddBook} props={props} />} />
            <Route path="/favourites/" component={Favourites} />
            {
              this.state.snackbarOpen ? 
              <Snackbar success={this.state.success} onClose={this.handleSnackbarClose} />
              :
              null
            }
        </main>
        <footer className={classes.footer}>
                Omar Shatani
        </footer>
      </div>
      );
    
  }
}

export default withStyles(styles)(App);
