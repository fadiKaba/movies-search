import { useEffect, useState } from "react";
import GalleryItem from "./GalleryItem";
import Movies from '../../stored/movieName.json';
import axios from "axios";

const Gallery = () => {
    const [movies, setMovies] = useState([]);
    const [err, setErr] = useState(null);

    const fillMoviesArr = (arr) => {
        let moviesArr = [];
        for(let i = 0; i < 12; i++){
            moviesArr.push(arr[Math.floor(Math.random() * 3203)].name)
        }
        setMovies(moviesArr);
    }    

    const getErr = (err) => {
       setErr(err)
    }

    const getMovies = () => {
           axios.get('https://api.themoviedb.org/3/movie/1995?api_key=34d46d158ef15caacd08e6d02c726c51&language=en-US')
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    
    useEffect(() => {      
        fillMoviesArr(Movies);    
        // getMovies()  
    }, []);
    return (
    
        <div> 

            {err && 
            <div className="alert alert-danger">{err}</div>
            }
            {/* {isLoading && 
            <div className="loading">loading...</div>
            } */}

            <div id="gallery-content" className="container mt-3">
                {movies.length === 12 && movies.map((movie) => {
                   return <GalleryItem dark={true} hoveractive={true} seterr={setErr} title={movie} key={movie}></GalleryItem>
                })}
            </div>
            
        </div>

    )
}

export default Gallery;