import NavbarItem from './NavbarItem';


const Navbar = () => {
    return (
        <nav className="w-full fixed z-40">
            <div 
                className='
                    px-4 
                    md:px-16 
                    py-6 
                    flex 
                    flex-row 
                    items-center 
                    transition 
                    duration-500 
                    bg-zinc-900 
                    bg-opacity-90
                '
            >
                <img src="/images/logo.png" className="h-6 lg:h-9" alt="Logo" />
                <div
                    className='
                    flex-row
                    ml-8
                    gap-7
                    hidden
                    lg:flex
                    '
                >
                    <NavbarItem label="Home" />
                    <NavbarItem label="Profile" />
                    <NavbarItem label="Favorites" />
                    <NavbarItem label="Continue Watching" />
                    <NavbarItem label="Whats New?" />
                    <NavbarItem label="Seasonal" />
                </div>
                <div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse -</p>
                    <p className="text-white text-sm">Favorites -</p>
                    <p className="text-white text-sm">Continue Watching</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;