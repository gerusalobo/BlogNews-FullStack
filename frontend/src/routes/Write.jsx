import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IKContext, IKUpload } from "imagekitio-react";


const authenticator = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/upload-auth`
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }
  
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  

const Write = () => {

    const {isLoaded, isSignedIn} = useUser();
    const [value, setValue] = useState("");
    const [cover, setCover] = useState("");

    const navigate = useNavigate();

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
          img: cover.filePath || "",
          title: formData.get("title"),
          category: formData.get("category"),
          desc: formData.get("desc"),
          content: value,
        };

        console.log(data);

        mutation.mutate(data);
    };

      const onError = (err) => {
        console.log(err);
        toast.error("upload failed!");
      };
      const onSuccess = (res) => {
        console.log(res);
        setCover(res);
      };

    return (
        <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6" style={{marginTop:'30px', marginLeft:'50px', marginRight:'50px'}}> 
            <h1 className="text-cl font-light"> Crie um novo Post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
                {/*<button className="w-max p-2 shadow-md rounded-xl text-sm text-white bg-black">
                    Adicione uma Imagem
                </button>*/}
                <IKContext
                    publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
                    urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
                    authenticator={authenticator}
                    >
                        <IKUpload
                            useUniqueFileName
                            onError={onError}
                            onSuccess={onSuccess}
                            />
                </IKContext>
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
                    className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36"
                    >
                    "Salvar"
                </button>



            </form>
        
        </div>
    )
}

export default Write