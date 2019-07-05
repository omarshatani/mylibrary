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
    fav: [],
    snackbarOpen: false,
    action: ''
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

  handleDrawerOpen = e => {
    this.setState({ open: true })
  }

  handleDrawerClose = e => {
    this.setState({ open: false })
  }

  handleAddBook = (book) => {
    API.addBook(book)
    .then(res => {
      API.getBooks()
      .then(res => this.setState({ books: res.data }))
      API.getMyBooks()
      .then(res => this.setState({ myBooks: [...this.state.myBooks, ...res.data] }))
      this.setState({ success: true, action: 'add', snackbarOpen: true })
    })
    .catch(err => {
      console.error(err)
      this.setState({ success: false, action: 'add', snackbarOpen: true })
    })
  }

  handleRemoveBook = (book) => {
    API.removeBook(book)
    .then(res => {
      API.getBooks()
      .then(res => this.setState({ books: res.data }))
      API.getMyBooks()
      .then(res => this.setState({ myBooks: res.data }))
      this.setState({ success: true, action: 'remove', snackbarOpen: true })
    })
    .catch(err => {
      console.error(err)
      this.setState({ success: false, action: 'remove', snackbarOpen: true })
    })
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false })
  }

  handleAddFav = (book) => {
    API.addFav(book)
    .then(res => {
      console.log('aggiunta fav', res);
      API.getMyBooks()
      .then(res => this.setState({ myBooks: res.data }))
      API.getFav(res => this.setState({ fav: res.data }))
      // this.setState({ fav: res.data })
    })
  }

  handleRemoveFav = (book) => {
    console.log('libro da levare dai fav', book)
    API.deleteFav(book)
    .then(res => {
      console.log('rimozione fav', res);
      API.getMyBooks()
      .then(res => this.setState({ myBooks: res.data }))
      API.getFav()
      .then(res => this.setState({ fav: res.data }))
    })
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
            <Route path="/" exact render={(props) => 
            <Home 
              books={this.state.books} 
              addBook={this.handleAddBook} 
              props={props} 
              />} 
            />
            <Route path="/mybooks/" render={(props) => 
            <MyBooks 
              books={this.state.myBooks} 
              addBook={this.handleAddBook}
              removeBook={this.handleRemoveBook}
              addFav={this.handleAddFav}
              removeFav={this.handleRemoveFav}
              props={props} 
              />} 
            />
            <Route path="/favourites/" component={Favourites} />
            {
              this.state.snackbarOpen ?
              <Snackbar
                success={this.state.success} 
                action={this.state.action} 
                snackClosed={() => this.setState({ snackbarOpen: false })}
              />
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
