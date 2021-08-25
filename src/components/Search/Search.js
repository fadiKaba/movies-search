import axios from 'axios';
import './Search.scss';
import { useEffect, useState } from 'react';
import RottenTomato from '../../assets/ico/rt.png';
import IMDB from '../../assets/ico/imdb.svg';
import PosterNotFound from '../../assets/img/poster_not_found.png';
import {Link} from 'react-router-dom';

const Search = () =>{
    
    const [searchVal, setSearchVal] = useState('');
    const [type, setType] = useState('')
    const [year, setYear] = useState('');
    const [results, setResults] = useState('');
    const [keyUpResults, setKeyUpResults] = useState([]);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    let ind = 0;

    const years = () => {
         let arrY = [];
         let d = new Date();
         let currentYear = d.getFullYear();
         for(let i = 1960; i <= currentYear; i++){
             arrY.push(i)
         }
         return arrY;
    }
    const handleClose = () => {
        setSearchVal('');
    }

    const handleOnChange = (val) => {
        setSearchVal(val);
        getResults(val, true);
    }

    const getResults = (val, keyUp) => {      
        let url = `http://www.omdbapi.com/?apikey=870e8a25&s=${val}${type !== '' ? '&type='+type : ''}${year !== '' ? '&y='+year : ''}`;
        if(val.length > 2){
            setIsSearching(true);
            axios.get(url)
            .then(res => {                 
               if(!res.data.Error){
              //   setResults(res.data.Search);
                 keyUp ? setKeyUpResults(res.data.Search) : setResults(res.data.Search);
                   setError(null);       
               }else{
                   setError(res.data.Error);
               }
               setIsSearching(false);
               console.log(keyUpResults)
            })
            .catch(err => {
                setError(err.message);
                setIsSearching(false);
            });
        }else{
            setKeyUpResults([])
        }  
    }

    return (
        <div className="search-container">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="inner-search-container">
                <div className="input-group mb-2" id="search-input-div">
                    <input 
                    autoComplete="off" 
                    type="text" 
                    className="form-control" 
                    placeholder="Search for a movie or tv show" 
                    aria-label="Recipient's username" 
                    aria-describedby="button-addon2" 
                    value={searchVal}
                    onChange={(e) => handleOnChange(e.target.value)}
                    />
                    {/* <button 
                    className="btn btn-outline-light search-btn" 
                    type="button" 
                    id="button-addon2"
                    onClick={(e) => getResults(searchVal, false)}>
                        Search
                    </button> */}
                </div>
                <div className="btn-group selects mb-2" role="group" aria-label="Basic example">
                    <select 
                    className="form-select bg-dark text-light rounded-0 rounded-start" 
                    aria-label="Default select example"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}>
                        <option value="">Year</option>
                        {years() && years().map((y) => {
                            return <option value={y} key={y}>{y}</option>
                        })}
                    </select>
                    <select 
                    className="form-select bg-dark text-light rounded-0 rounded-end" 
                    aria-label="Default select example"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Type</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                        <option value="episode">Episode</option>
                    </select>
                </div>
                 
                 {isSearching && <div className="text-center mt-5"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
                 {keyUpResults.length > 0 && 
                 <div id="key-up-results-container">
                     <ul className="list-group">
                        {keyUpResults.map((kUpRes) => {
                        return<li className="list-group-item" key={kUpRes.Title+kUpRes.Year+ind++}>
                                <Link to={`/details/${kUpRes.Title}/${kUpRes.Year}/${kUpRes.Type}`}>  
                                <img src={kUpRes.Poster != "N/A"? kUpRes.Poster: PosterNotFound} alt="poster"/>
                                {kUpRes.Title} {kUpRes.Year}
                                </Link>
                              </li>
                        })}
                     </ul>
                 </div>}

                {results.length > 0 && 
                    <div className="row results p-3 rounded">
                        <h4>Search Results</h4>
                         {results.map((res) => {
                         return <div className="col-6 col-md-3 mb-3" key={res.Title+ results.findIndex(el => el.Title === res.Title) + res.Type + res.Year}>
                            <div className="card small-card">
                                <img src={res.Poster == "N/A"? PosterNotFound : res.Poster} className="card-img-top" alt={res.Title} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{res.Title} <br /> {res.Year} </h5>
                                    <p className="card-text mb-auto">Type: {res.Type}</p>
                                    <Link to={`/details/${res.Title}/${res.Year}/${res.Type}`} className="btn">Details</Link>
                                </div>
                            </div>
                         </div>
                     })}
                    </div>
                }
            </div>
        </div>
    )
}

export default Search;