import { Link } from "react-router-dom"
import MainCategory from "../components/MainCategory"
import PostList from "../components/PostList"

const PostListPage = () => {
    
    return (
        <div className="mt-4 flex flex-col gap-4 text-black" style={{ marginLeft: '8px' }}>
            {/* BREADCRUMB */}
            <div className="flex gap-4 ">
                <Link to="/">Posts</Link>
                <span>-</span>
                <span className="text-black" >News</span>
            </div>
            {/* CATEGORIES */}
                <MainCategory/>
           
            {/* POST LIST */}
                <div className="">
                    <h1 className="my-8 text-2xl text-gray-600">Artigos</h1>
                    <PostList/>
                </div>

        </div>
    )
}

export default PostListPage