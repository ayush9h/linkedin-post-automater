import { useState } from "react";
import ContentQuery from "./ContentQuery";
import ImageQuery from "./ImageQuery";
import Schedule from "./Schedule";


export default function Timeline() {
    const [days, setDays] = useState(1);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    
    return (
        <>

            <Schedule content={content} selectedDays={days} setSelectedDays={setDays} />

            <div className="max-width grid grid-cols-2 gap-8 mt-10">
                <div className="bg-zinc-100 border border-slate-300 rounded-xl p-4 shadow-sm mb-16">
                    <ContentQuery content={content} setContent={setContent} />
                </div>
                <div className="bg-zinc-100 border border-slate-300 rounded-xl p-4 shadow-sm mb-16">
                    <ImageQuery image={image} setImage={setImage} />
                </div>
            </div>
        
        
        </>
    );
}
