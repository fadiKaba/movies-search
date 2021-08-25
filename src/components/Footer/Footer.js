import './Footer.scss';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer mt-2 mt-md-5">
            <p className="footer-copy"><span>Just Search &copy;</span> 2021 All Right Reserved</p>
            <Link to="/">Home</Link> - <Link to="/gallery">Gallery</Link>
        </div>
    )
}

export default Footer;