import { useEffect, useState } from "react"
import axios from 'axios';

const useFetch = (url) => {
    
     const [items, setItems] = useState(null);
     const [error, setError] = useState(null);
     const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true)
        axios.get(url).then(response => {
            console.log(response)
            setItems(response.data)
            setIsLoading(false);
        }).catch(err => {
            setError(err.message)
        })
       
    }, []);

    return {items, error, isLoading}
}

export default useFetch;