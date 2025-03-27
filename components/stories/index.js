import { useRef, useState, useEffect } from "react";
import { uploadToVercelBlob } from "../../utils/image-uploder";
import UploadStories from "./UploadStories";

export default function Stories() {
    const [stories, setStories] = useState([]);
    const handleAddStory = (newStory) => {
        const updatedStories = [newStory, ...stories];
        setStories(updatedStories);
        console.log(JSON.stringify(updatedStories));
        localStorage.setItem("stories", JSON.stringify(updatedStories));
    };

    useEffect(() => {
        const storedStories = JSON.parse(localStorage.getItem("stories")) || [];
        if (storedStories.length > 0) {
            setStories(storedStories);
        }
    }, []);
    
    return (
        <div className="flex shadow-sm p-3 gap-x-2 overflow-x-scroll no-scrollbar overflow-y-hidden">
            <AddStory handleAddStory={handleAddStory} />
            {stories.map((story,index) => {
                return (
                    <UploadStories data={story}  key={index}/>
                )
            })}
        </div>
    );
}

const AddStory = ({ handleAddStory }) => {
    const inputRef = useRef(null);
    const onUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const imageUrl = await uploadToVercelBlob(file); // Upload to Vercel Blob

            const newStory = {
                id: new Date().getTime(),
                name: imageUrl, // Store URL instead of Base64
                viewed: false,
                date: new Date(),
            };

            handleAddStory(newStory);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="my-4 mx-2 flex flex-col gap-y-2 items-center">
            <div
                onClick={() => inputRef.current?.click()}
                className="cursor-pointer h-16 w-16 flex justify-center items-center shrink-0 rounded-full border-[2px] border-white/40 border-dashed hover:scale-110 duration-200"
            >
                +
            </div>
              <p className="text-xs">
                Add Stories
            </p>
            <input
                onChange={onUpload}
                ref={inputRef}
                type="file"
                hidden
                accept="image/*"
            />
        </div>
    );
}