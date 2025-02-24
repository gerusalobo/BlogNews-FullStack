import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Write = () => {

    const {isLoaded, isSignedIn} = useUser();
    const [value, setValue] = useState("");


    const { getToken } = useAuth();

  
    const mutation = useMutation({
        mutationFn: async (newPost) => {
          const token = await getToken();
          return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        },
        onSuccess: (res) => {
          toast.success("Post has been created");
          navigate(`/${res.data.slug}`);
        },
      });
   
    if(!isLoaded){
        return <div className="">Carregando o usuário</div>
    }

    if(isLoaded && !isSignedIn){
        return <div className="">É necessário Logar!</div>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
          title: formData.get("title"),
          category: formData.get("category"),
          desc: formData.get("desc"),
          content: value,
        };
        console.log(data);
        mutation.mutate(data);
    };

    return (
        <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6" style={{marginTop:'30px', marginLeft:'50px', marginRight:'50px'}}> 
            <h1 className="text-cl font-light"> Crie um novo Post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
                <button className="w-max p-2 shadow-md rounded-xl text-sm text-white bg-black">Adicione a Imagem</button>
                <input
                    className="text-4xl font-semibold bg-white outline-none"
                    type="text"
                    placeholder="Titulo"
                    name="title"
                />
                <div className="flex items-center gap-4">
                    <label htmlFor="">Categoria:</label>
                    <select name="category" id="">
                        <option value="general">Geral</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Software</option>
                        <option value="celular">Celular</option>
                        <option value="AI">Analytis e AI</option>
                        <option value="database">Banco de Dados</option>
                    </select>
                </div>
                <textarea
                    className="p-4 rounded-xl bg-white shadow-md"
                    name="desc"
                    placeholder="Resumo"
                />
                <ReactQuill
                    theme="snow"
                    className="flex-1 rounded-xl bg-white shadow-md"
                    value={value}
                    onChange={setValue}
                />
                 <button
                    className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                    "Salvar"
                </button>



            </form>
        
        </div>
    )
}

export default Write