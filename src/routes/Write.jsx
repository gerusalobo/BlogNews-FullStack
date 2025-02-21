import { useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

const Write = () => {

    const {isLoaded, isSignedIn} = useUser()

    if(!isLoaded){
        return <div className="">Carregando...</div>
    }

    if(isLoaded && !isSignedIn){
        return <div className="">É necessário Logar!</div>
    }

    return (
        <div className=""> 
            <h1> Crie um novo Post</h1>
            <form>
                <button>Adicione a Imagem</button>
                <input type="text" placeholder="Titulo"/>
                <div>
                    <label htmlFor="">Selecione a Categoria</label>
                    <select name="category" id="">
                        <option value="general">Geral</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Software</option>
                        <option value="celular">Celular</option>
                        <option value="AI">Analytis e AI</option>
                        <option value="database">Banco de Dados</option>
                    </select>
                </div>
                <textarea name="summary" placeholder="Resumo" id="">Resumo</textarea>
                <ReactQuill
                    theme="snow"
                />




            </form>
        
        </div>
    )
}

export default Write