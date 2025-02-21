import Image from "./image";
import { Link } from "react-router-dom"

const FeaturePosts = () => {
    return (
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
            {/* FIRST */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* image */}
                <Image src="featured1.jpeg" className="rouded-3xl object-cover"  />
                {/* details */}
                <div className="flex items-center gap-4 text-base">
                    <h1 className="font-semibold">01.</h1>
                    <Link className="text-gray-800">Hardware</Link>
                    <span className="text-gray-800">2 days ago</span>
                </div>
                {/* title */}
                <Link className="font-bold text-2xl">Titulo1</Link>
            </div>
            {/* OTHERS */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Second */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    {/* image */}
                    <Image src="featured2.jpeg" className="rouded-3xl object-cover w-1/3 aspect-video"/>
                    {/* details and title*/}
                    <div className="w-2/3">
                        <div className="flex text-base gap-4">
                            <h1 className="font-semibold">02.</h1>
                            <Link className="text-gray-800">Software</Link>
                            <span className="text-gray-800">2 days ago</span>
                        </div>
                        {/* title */}
                        <Link className="font-bold text-2xl">Titulo2</Link>
                    </div>
                </div>
            
            {/* Third */}
                <div className="lg:h-1/3 flex justify-between gap-4">
                    {/* image */}
                    <Image src="featured3.jpeg" className="rouded-3xl object-cover w-1/3 aspect-video"/>
                    {/* details and title*/}
                    <div className="w-2/3">
                        <div className="flex text-base gap-4">
                            <h1 className="font-semibold">03.</h1>
                            <Link className="text-gray-800">Software</Link>
                            <span className="text-gray-800">2 days ago</span>
                        </div>
                        {/* title */}
                        <Link className="font-bold text-2xl">Titulo3</Link>
                    </div>
                </div>

            {/* Fourty */}
            <div className="lg:h-1/3 flex justify-between gap-4">
                    {/* image */}
                    <Image src="featured4.jpeg" className="rouded-3xl object-cover w-1/3 aspect-video"/>
                    {/* details and title*/}
                    <div className="w-2/3">
                        <div className="flex text-base gap-4">
                            <h1 className="font-semibold">04.</h1>
                            <Link className="text-gray-800">Celular</Link>
                            <span className="text-gray-800">2 days ago</span>
                        </div>
                        {/* title */}
                        <Link className="font-bold text-2xl">Titulo4</Link>
                    </div>
                </div>
            </div>
       
        </div>
    )
}

export default FeaturePosts