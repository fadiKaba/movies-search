import './App.scss';
import Navbar from '../Navbar/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import Gallery from '../Gallery/Gallery';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Details from '../Details/Details';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <main>
        <div className="App">  
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route exact path="/gallery">
                <Gallery></Gallery>
              </Route>
              <Route exact path="/about">
                <About></About>
              </Route>
              <Route exact path="/details/:title/:y/:type">
                <Details></Details>
              </Route>
            </Switch>
        </div>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
