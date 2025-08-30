import { useState } from "react";
import ContentQuery from "./ContentQuery";
import Schedule from "./Schedule";

export default function Timeline() {
    const [days, setDays] = useState(0);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    
    return (
        <>

            <div className="max-w-5xl mx-auto">
                    <Schedule content={content} selectedDays={days} setSelectedDays={setDays} />

                    <ContentQuery content={content} setContent={setContent} image={image} setImage={setImage} />
            </div>
    
        </>
    );
}
