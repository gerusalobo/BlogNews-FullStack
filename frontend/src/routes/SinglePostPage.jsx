import Image from "../components/Image";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify';

const fetchPost = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    return res.data;
  };

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";

    return (
        <div className="flex flex-col gap-8 bg-white" style={{marginTop:'30px', marginLeft:'30px', marginRight:'30px'}}>
            {/* Detail */}
            <div className="flex gap-8" style={{marginTop:'30px', marginLeft:'30px', marginRight:'30px'}}>
                <div className="lg:w-3/5 flex flex-col gap-8" >
                    <h1 className="font-bold text-4xl" >{data.title}</h1>
                    <p className="text-xl font-semibold">{data.desc}</p>
                    <div className="flex items-center gap-2 text-gray-800 text-sm">
                        <span>Por</span>
                        <span className="font-semibold">{data.user.username}</span>
                        <span>em</span>
                        <span>{format(data.createdAt)}</span>
                    </div>
                </div>
                <div className="hidden lg:block w-2/5">
                <Image src={data.img} className="rounded-3xl object-cover" w="600" />
                </div>
            </div>
            {/* Content */}
            <div 
                className="lg:text-lg flex flex-col gap-6 text-justify" 
                style={{ marginRight: '30px', marginLeft: '30px' }} 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }} // Sanitização opcional
            />
        </div>
    )
}

export default SinglePostPage