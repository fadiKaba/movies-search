import { useState } from "react";
import GalleryItem from "../Gallery/GalleryItem";
import './Latest.scss';

const Latest = () => {
    
    const [error, setError] = useState(null);

    const handleErr = (val) => {
        setError(val)
    }

    return (
        <section className="latest p-md-4 mt-md-4 rounded">
            <h4>Latest Movies</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                <div className="col-md-3">
                    <GalleryItem dark={false} seterr={handleErr} title="Stillwater"></GalleryItem>
                </div>
                <div className="col-md-3">
                     <GalleryItem seterr={handleErr} title="Don't Breathe 2"></GalleryItem>
                </div>
                <div className="col-md-3">
                     <GalleryItem seterr={handleErr} title="prometheus"></GalleryItem>
                </div>
                <div className="col-md-3">
                     <GalleryItem seterr={handleErr} title="shrek"></GalleryItem>
                </div>
            </div>
        </section>    
    )
}

export default Latest;