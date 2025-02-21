import Image from "../components/image";
import { Link } from "react-router-dom"

const SinglePostPage = () => {
    return (
        <div className="flex flex-col gap-8 " style={{marginTop:'30px', marginLeft:'30px', marginRight:'30px'}}>
            {/* Detail */}
            <div className="flex gap-8" style={{marginTop:'30px', marginLeft:'30px', marginRight:'30px'}}>
                <div className="lg:w-3/5 flex flex-col gap-8" >
                    <h1 className="font-bold text-4xl" >Titulo</h1>
                    <p className="text-xl font-semibold">Subtitulo</p>
                    <div className="flex items-center gap-2 text-gray-800 text-sm">
                        <span>Por</span>
                        <Link className="font-semibold">John</Link>
                        <span>em</span>
                        <span>2 days ago</span>
                    </div>
                </div>
                <div className="hidden lg:block w-2/5">
                <Image src="postImg.jpeg" className="rounded-3xl object-cover" w="600" />
                </div>
            </div>
            {/* Content */}
            <div className=" lg:text-lg flex flex-col gap-6 text-justify" style={{ marginRight:'30px', marginLeft:'30px'}} >
                <p>
                Após alguns rumores no ano passado, a Meta confirmou os planos para construir um mega cabo submarino de 50 mil km, o maior do mundo até então. Essa construção passará por regiões estratégicas e visa aumentar a infraestrutura global da empresa para melhorar suas capacidades tecnológicas, principalmente em inteligência artificial.

Conhecido como Project Waterworth, o cabo submarino conectará países como os Estados Unidos, Índia, África do Sul, Brasil e Austrália. Inclusive, a estrutura será conectada nas duas extremidades dos EUA, começando na costa leste até contornar o mundo e terminar na parte oeste do país, no que parece ser o estado da Califórnia.

Entenda: Google e Chile anunciam construção de cabo submarino que ligará América do Sul, Ásia e Oceania
O Brasil é o segundo destino do cabo, cortando possivelmente a região nordeste do país. A ideia da Meta é tornar a empresa menos dependente de outras soluções externas, uma vez que tem parceria para utilizar cabos submarinos de 16 outras empresas, e almeja mais independência nesse setor.
                </p>
            </div>

        </div>
    )
}

export default SinglePostPage