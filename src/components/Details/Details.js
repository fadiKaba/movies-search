import './Details.scss';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IMDB from '../../assets/ico/imdb.svg';
import PosterNotFound from '../../assets/img/poster_not_found.png';
import DownIcon from '../../assets/ico/download.png';

const Details = () => {
    
    const {title, y, type} = useParams();
    const [item, setItem] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
     axios.get(`http://www.omdbapi.com/?apikey=870e8a25&t=${title}&y=${y}&type=${type}&plot=full`)
     .then(response => {
         setItem(response.data)
         
     }).catch(errs => {
        setErr(errs.message)
        })
    }, []);

    const rewriteTitle = (title, year) => {
        let t = title.split(' ').join('-');
        let y = year;
        return (t+'-'+y).toLowerCase();
    }

    return (
        <div className="details-container">
            {!item && <div className="text-center mt-5"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
            {item && <div className="container px-3">         
                  <div className="row mt-4 bg-dark p-2 p-md-4 rounded">
                      <div className="col-md-6 ">
                          <img src={item.Poster != "N/A" ? item.Poster : PosterNotFound} alt="Poster"/>
                      </div>
                      <div className="col-md-6">
                          <h5>{item.Title}</h5>
                          <span className="year-details">{item.Year}</span>
                          <br />
                          <span className="type-details">{item.Genre}</span>
                          <br />
                          <div className="rating-details mt-3">
                              <img src={IMDB} alt="IMDB"/> <span className="mx-4">{item.imdbRating}</span> 
                             {item.Ratings && <div className="mt-2">
                                 {item.Ratings[1] && <div>{item.Ratings[1].Source}: <span className="mx-4">{item.Ratings[1].Value}</span></div>}  </div> }
                          </div>
                          <div className="mt-4 info-details">
                              <p> <span>Actors: </span>{item.Actors}.</p>
                              {item.Country && <p> <span>Country: </span>{item.Country}.</p>}
                              {item.Production && <p> <span>Production: </span>{item.Production}.</p>}
                              {item.Awards && <p> <span>Awards: </span>{item.Awards}.</p>}
                              {item.BoxOffice && <p><span>Box Office:</span> {item.BoxOffice}</p>}
                              {item.Type == "movie" && <p className="mt-3">
                                <a 
                                rel="noreferrer"
                                target="_blank"
                                href={`https://yts.mx/movies/${rewriteTitle(item.Title, item.Year)}`}
                                className="btn check-availabel-btn">
                                Check Movie Availability
                                <img src={DownIcon} alt=""/>
                               </a></p>}
                          </div>
                      </div>
                  </div>
                  <div className="plot">  
                      <div className="bg-dark row rounded p-2 p-md-4 mt-4">
                      <h4 className="">Summary</h4>
                         <p>{item.Plot}</p>
                         <div className="row p-3 mx-auto">
                             <div className="col-md-4">Run Time: {item.Runtime}</div>
                             <div className="col-md-4">Language: {item.Language}</div>
                             <div className="col-md-4">Type: {item.Type}</div>
                        </div>
                      </div> 
                  </div>
            </div>}
        </div>
    )
}

export default Details;