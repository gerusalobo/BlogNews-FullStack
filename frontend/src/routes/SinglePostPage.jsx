import Image from "../components/Image";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const fetchPost = async (slug) => {
    const res = await axios.get(`/posts/${slug}`);
    return res.data;
  };

  
const deletePost = async (id, getToken) => {
    const token = await getToken();
    await axios.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  const { isPending, error, data, refetch  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
    refetchOnMount: true, // Recarrega os dados ao montar
    refetchOnWindowFocus: true, // Recarrega os dados ao focar na janela
    staleTime: 0, // Sempre buscar dados novos
    cacheTime: 0, // Evita cache persistente
});
  // Refaz a requisição sempre que voltar para essa página
  useEffect(() => {
    refetch(); // Força a atualização dos dados sempre que o componente é montado
  }, [slug, refetch]);


  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";

  const handleDelete = async () => {
    if (window.confirm("Confirma a exclusão do post?")) {
      await deletePost(data._id, getToken); // Usar o ID do post
      navigate('/'); // Redirecionar após a exclusão
      window.location.reload();
    }
  };

  const handleEdit = () => {
    navigate("/write", { state: { post: data } }); // Passa o post para edição
  };

    return (
        <div className="flex flex-col gap-8 bg-white" style={{marginTop:'30px', marginLeft:'30px', marginRight:'30px', margimBottom:'50px'}}>
            {/* Detail */}
            <div className="flex gap-8" style={{marginTop:'30px', marginLeft:'30px', marginRight:'30px'}}>
                <div className="lg:w-3/5 flex flex-col gap-8" >
                    <h1 className="font-bold text-4xl" >{data.title}</h1>
                    <p className="text-xl font-semibold">{data.desc}</p>
                    <div className="flex items-center gap-2 text-gray-800 text-sm">
                        <span>Por</span>
                        {data.user ? (
                            <span className="font-semibold">{data.user.username}</span>
                        ) : (
                            <span className="text-gray-600">Desconhecido</span>
                        )}                       
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
            <div className="flex gap-8"  style={{marginLeft:'30px', marginRight:'30px', margimBottom:'50px'}}>
                {isSignedIn && ( // Condição para renderizar o botão
                    <button 
                        onClick={handleDelete} 
                        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-red-700"
                    >
                        Delete Post
                    </button>
                )}
                {isSignedIn && ( // Condição para renderizar o botão
                    <button 
                        onClick={handleEdit} 
                        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-blue-700 z-index:1" 
                        >
                            Edit Post
                        </button>                   
                )}
            </div>
        </div>
    )
}

export default SinglePostPage