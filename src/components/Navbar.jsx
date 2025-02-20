import {useState} from "react";
import {Link} from "react-router-dom";
import Image from "./image";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between bg-[#000000]">
        {/*LOGO*/}
        <Link to="/" className="flex items-center gap-4 text-2xl font-bold text-white" style={{ marginLeft: '8px' }}>
            <Image src="tech.jpg" alt="Techno blog" w={64} h={48} />
            <span>Techno Blog</span>
        </Link>
        {/*MOBILE MENU*/}
        <div className="md:hidden">
            {/*MOBILE BUTTON*/}
            <div className='cursor-pointer text-2xl font-bold text-white' style={{ marginRight: '8px' }} onClick={()=>setOpen(prev=>!prev)}>
                {open ? "X" : "☰"}
            </div>
           {/*MOBILE LINK LIST*/}
           <div
          className={`w-full h-screen bg-[#fbfbfc] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
            <Link to="/">Notícias</Link>
            <Link to="/">Tendências</Link>
            <Link to="/">Populares</Link>
            <Link to="/">Sobre</Link>
            <Link to="/login">
                <button className="py-2 px-4 rounded-3xl bg-gray-300 text-black font-bold">Login</button>
            </Link>
           </div>
        </div>
        {/*DESKTOP MENU*/}
        <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium  text-white" style={{ marginRight: '8px' }}>
        <Link to="/">Notícias</Link>
            <Link to="/">Tendências</Link>
            <Link to="/">Populares</Link>
            <Link to="/">Sobre</Link>
            <Link to="/login">
                <button className="py-2 px-4 rounded-3xl bg-gray-300 text-black font-bold">Login</button>
            </Link>
        </div>
    </div>
    );
};

export default Navbar;