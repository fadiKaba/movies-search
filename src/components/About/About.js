import axios from "axios";

const About = () => {

    const getTrailer = () => {
        axios.get('https://api.themoviedb.org/3/movie/440/videos?api_key=34d46d158ef15caacd08e6d02c726c51&language=en-US')
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div> {getTrailer()}
            About
        </div>
    )
}

export default About;