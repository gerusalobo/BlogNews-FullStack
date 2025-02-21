import Image from "../components/image";

const SinglePostPage = () => {
    return (
        <div className="flex flex-col gap-8 ">
            {/* Detail */}
            <div className="flex gap-8">
                <div className="lg:w-3/5 flex flex-col gap-8">
                
                </div>
                <div className="hidden lg:block w-2/5  ">
                    <Image scr="postImg.jpeg" />
                </div>
            </div>
            {/* Detail */}


        </div>
    )
}

export default SinglePostPage