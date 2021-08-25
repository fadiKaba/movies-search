import axios from "axios";
import { useEffect, useState } from "react"
import './Gallery.scss';
import { Link } from "react-router-dom";
import PosterNotFound from '../../assets/img/poster_not_found.png';

const GalleryItem = (props) => {
    
    const [isLoading, setIsLoading] = useState(false)
    let title = props.title;
    const [movie, setMovie] = useState(null);

    useEffect(() => {
      setIsLoading(true);
       axios.get(`http://www.omdbapi.com/?apikey=870e8a25&t=${title}`)
       .then(res =>{
           if(!res.data.Error){
             setMovie(res.data);  
           }
           setIsLoading(false);
        })
       .catch(err => {
        setIsLoading(false);
        props.seterr(err.message);
        })
    }, [])


    
    return (
      <div className="mb-3">
        {isLoading && <div className="text-center mt-5"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
         {movie && <div className={`card text-light  ${props.hoveractive? 'hover-active ': ''} ${props.dark ? 'bg-dark' : ''}`} style={{}}>
            <img src={movie.Poster == "N/A"? PosterNotFound : movie.Poster} className="card-img-top" alt={movie.Title} />
            <div className="card-body d-flex flex-column">
                {movie.Title && <h5 className="card-title">{movie.Title.length < 40 ? movie.Title : movie.Title.slice(0, 40)}</h5>}
                {movie.Ratings != "N/A" && 
                <div className="card-text mb-auto">
                    {movie.imdbRating && <span className="r1 text-info">IMDB: {movie.imdbRating}</span>}
                    <br /><span className="r3">Release Date: {movie.Year}</span>
                </div>}
                   <Link to={`/details/${movie.Title}/${movie.Year}/${movie.Type}`} className="btn">Details</Link> 
            </div>
          </div>}
        </div>
    )

}

export default GalleryItem;