import PostListItem from "./PostListItem"
import {useQuery} from "@tanstack/react-query"

const PostList = () => {
    return (
      <div className="flex flex-col gap-12 mb-8">
        <PostListItem/>
        <PostListItem/>
        <PostListItem/>
        <PostListItem/>
        <PostListItem/>
        <PostListItem/>
        </div>
    )
}

export default PostList