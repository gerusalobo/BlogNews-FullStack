import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { IKContext, IKUpload } from "imagekitio-react";

const authenticator = async () => {
  try {
    const response = await fetch(
      `/posts/upload-auth`
    );
    if (!response.ok) throw new Error(`Erro ${response.status}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Erro ao autenticar upload: ${error.message}`);
  }
};

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const post = location.state?.post || null; // Pega o post caso esteja editando
  
  // Estados para os dados do post
  const [value, setValue] = useState(post?.content || "");
  const [title, setTitle] = useState(post?.title || "");
  const [category, setCategory] = useState(post?.category || "tecnologia");
  const [desc, setDesc] = useState(post?.desc || "");
  const [cover, setCover] = useState(post?.img || ""); // Imagem nova
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redireciona para login se não estiver autenticado
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  // Definir se é criação ou edição
  const isEditing = Boolean(post);

  const mutation = useMutation({
    mutationFn: async (postData) => {
      const token = await getToken();
      const url = isEditing
        ? `/posts/${post._id}` // Edição (POST)
        : `/posts`; // Novo post (POST)

      const method = isEditing ? "post" : "post";
      return axios[method](url, postData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
      toast.success(isEditing ? "Post atualizado!" : "Post criado!");
      navigate(`/${res.data.slug}`);
      window.location.reload()
    },
    onError: () => {
      toast.error("Erro ao salvar post.");
    },
  });

  if (!isLoaded) {
    return <div>Carregando...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const postData = {
      img: cover?.filePath || cover, // Pega a nova imagem ou mantém a existente
      title,
      category,
      desc,
      content: value,
    };

    try {
      await mutation.mutateAsync(postData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col gap-6 mt-8 mx-12">
      <h1 className="text-cl font-light">{isEditing ? "Editar Post" : "Criar Novo Post"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
      <h1 className="text-cl font-light">{cover.filePath}</h1>
        <IKContext
          publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
          urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
          authenticator={authenticator}
        >
          <IKUpload useUniqueFileName onError={() => toast.error("Upload falhou!")} onSuccess={setCover} />
        </IKContext>

        <input
          className="text-4xl font-semibold bg-white outline-none"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <label>Categoria:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="tecnologia">Tecnologia</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="celular">Celular</option>
            <option value="AI">Analytics e AI</option>
            <option value="database">Banco de Dados</option>
          </select>
        </div>

        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          placeholder="Resumo"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <ReactQuill
          theme="snow"
          className="flex-1 rounded-xl bg-white shadow-md"
          value={value}
          onChange={setValue}
        />

        <button className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
        </button>
      </form>
    </div>
  );
};

export default Write;
