import PostListItem from "./PostListItem"
import {useQuery} from "@tanstack/react-query"
import axios from "axios"

const fetchPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
  return res.data;
  };

  const PostList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: fetchPosts,
    });

    if (isPending) return "Loading...";
    if (error) return "An Error has occurred: " + error.message;

    console.log(data); // Verifica o que a API está retornando

    return (
        <div className="flex flex-col gap-12 mb-8">
            {data?.posts?.map((post) => (
                <PostListItem key={post._id} post={post} />
            ))}
        </div>
    );
};

export default PostList