import {useState} from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between bg-[#000000]">
        {/*LOGO*/}
        <div className="flex items-center gap-4 text-2xl font-bold text-white">
            <img src="/tech.jpg" className="w-24 h-16" style={{ marginLeft: '8px' }} alt="" />
            <span>Techno Blog</span>
        </div>
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
            <a href="/">Notícias</a>
            <a href="/">Tendências</a>
            <a href="/">Populares</a>
            <a href="/">Sobre</a>
            <a href="">
                <button className="py-2 px-4 rounded-3xl bg-gray-300 text-black font-bold">Login</button>
            </a>
           </div>
        </div>
        {/*DESKTOP MENU*/}
        <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium  text-white" style={{ marginRight: '8px' }}>
            <a href="/">Notícias</a>
            <a href="/">Tendências</a>
            <a href="/">Populares</a>
            <a href="/">Sobre</a>
            <a href="">
                <button className="py-2 px-4 rounded-3xl bg-gray-300 text-black font-bold">Login</button>
            </a>
        </div>
    </div>
    );
};

export default Navbar;