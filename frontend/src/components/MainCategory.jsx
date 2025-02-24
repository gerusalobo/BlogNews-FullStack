import { Link } from "react-router-dom"

const MainCategory = () => {
    return (
        <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
            {/* LINKS */}
            <div className="flex-1 flex items-center justify-between flex-wrap">
                <Link to="/posts" className="bg-black text-white rounded-full px-4 py-2" >Artigos</Link>
                <Link to="/posts?category=hardware">Hardware</Link>
                <Link to="/posts?category=software">Software</Link>
                <Link to="/posts?category=celular">Celulares</Link>
                <Link to="/posts?category=ai">Analytics e AI</Link>
                <Link to="/posts?category=database">Banco de Dados</Link>
            </div>
            <span className="text-xl font-bold">|</span>
             {/* SEARCH */}
            <div className="bg-gray-200 p-2 rounded-full flex items-center gap-2 ">
                <svg
                    xmlns="http://w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="gray"
                    >
                    <circle cx="10.4" cy="10.5" r="7.5"/>
                    <line x1="16.5" y1="16.5" x2="22" y2="22" />   
                </svg>
                <input type="text" placeholder="Busca" className="bg-transparent"/>
            </div>
        </div>
    )
}

export default MainCategory