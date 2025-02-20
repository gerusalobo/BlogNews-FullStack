import { Link } from "react-router-dom"

const Homepage = () => {
    return (
        <div className="mt-4 flex flex-col gap-4 text-black" style={{ marginLeft: '8px' }}>
            {/* BREADCRUMB */}
            <div className="flex gap-4 ">
                <Link to="/">Home</Link>
                <span>-</span>
                <span className="text-black" >Artigos</span>
            </div>
            {/* INTRODUCTION */}
            <div className="flex items-center justify-between">
                {/* titles */}
                <div className="">
                    <h1 className="text-1xl md:text-2xl lg:text-3xl font-bold">
                       Leia sobre as maiores inovações do momento!
                    </h1>
                    <p className="mt-3 text-base">
                        Tudo desde hardware, Software até AI na palma da sua mão.
                    </p>
                </div>
                {/* animeted buttons */}
                <div className=""></div>
                <Link to="write"> </Link>
            </div>
            {/* FEATURED POSTS */}
            
            {/* POST LIST */}
        </div>
    )
}

export default Homepage