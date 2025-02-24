import Image from "../components/Image";

const AboutPage = () => {

    return (
        <div className="flex flex-col gap-8 " style={{marginTop:'50px', marginLeft:'50px', marginRight:'50px'}}>
            {/* Detail */}
                <Image src="tech.jpg" className="rounded-3xl object-cover" w="600"  />
            {/* Content */}
            <div className=" lg:text-lg flex flex-col gap-6 text-justify" >
                <p>
                TechnoBlog é um projeto de fim da pós Dev Foundations da FIAP para a equipe de Gerusa Lobo.

                Esse projeto foi criado usando as tecnologias de nodeJS+Express e React com BD MongoDB.
                </p>
            </div>

        </div>
    )
}

export default AboutPage