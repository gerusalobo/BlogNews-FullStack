import Image from "./image";
import { Link } from "react-router-dom"

const PostListItem = () => {
    return (
      <div className="flex flex-col xl:flex-row gap-8 mb-12">
        
          {/* Image */}
          <div className="md:hidden xl:block xl:w-1/3">
            <Image src="postImg.jpeg" className="rounded-2xl object-cover" w="735"/>
          </div>
          {/* Details */}
          <div className="flex flex-col gap-4 xl:w-2/3">
            <Link className="text-3xl font-bold">Titulo</Link>
            <div className="flex items-center gap-2 text-gray-800 text-sm">
              <span>Escrito por</span>
              <Link className="font-semibold">John</Link>
              <span>em</span>
              <Link className="">Hardware</Link>
              <span>2 days ago</span>
            </div>
            <div>
              <p>A empresa chinesa GalaxySpace testou com sucesso a tecnologia de comunicação de celular via satélite, utilizando sua constelação de órbita terrestre baixa para o fornecimento do serviço. A demonstração aconteceu durante evento do setor espacial comercial em Pequim, na última semana. 
Quando a constelação de satélites passou sobre a Área de Desenvolvimento Econômico-Tecnológico de Pequim, os participantes do experimento conectaram seus smartphones à rede por meio de um dispositivo instalado no telhado. Em seguida, a conexão foi roteada em um gateway em outra área da cidade, ficando pronta para funcionar.
              </p>
              <Link to="/test" className="text-blue-800 underline text-sm">Read More</Link>
            </div>
          </div>        
      </div>
    )
}

export default PostListItem