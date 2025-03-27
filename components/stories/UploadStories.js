import Link from "next/link";

export default function UploadStories(props) {
    return (
        <div className="my-4 mx-2 flex flex-col gap-y-2 items-center">
            <Link href={`stories/${props.data.id}`}>
                <div className="cursor-pointer h-16 w-16 relative overflow-hidden flex justify-center items-center shrink-0 rounded-full border-[2px] border-white/60 duration-300 hover:scale-110">
                    <img
                        className="object-cover rounded-full h-full w-full p-[2.5px]"
                        src={props?.data?.name}
                        alt="Story Image Thumbnail"
                    />
                </div>
            </Link>
            {/* <p className="text-xs">
                {props?.data?.date.toISOString().split("T")[0]}
            </p> */}
        </div>

    );
}