import './Home.scss';
import Search from '../Search/Search';
import Latest from '../Latest/Latest';
import ShowCase from './showcase.jpg';

const Home = () => {


    return (
        <div id="home">
           <div className="showcase">
               <h1 className="introducion">Just Search</h1>
               <p className="introducion">Find your favorite movie, TV series, and even your favorite game, welcome to my official website.
               <br />
                You can aquire the full information about the movie you desire.
               </p>
               <div className="container">
                  <Search></Search>    
               </div> 
            </div> 
            <div className="container">
            <Latest></Latest>  
            </div>
            
        </div>
    )
}

export default Home;