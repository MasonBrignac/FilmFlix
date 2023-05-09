import React, { useCallback, useState, useEffect } from 'react';
import NavbarItem from './NavbarItem';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch, BsChevronDown } from 'react-icons/bs';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';
import { useRouter } from 'next/router';

const TOP_OFFSET = 66;

const Navbar = () => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  if (router.pathname !== '/') {
    return null;
  }

  return (
    <nav className="navbar w-full fixed z-40">
      <div
        className={`
          px-4
          md:px-16
          py-6
          flex
          flex-row
          items-center
          transition
          duration-500
          bg-gray-900
          ${showBackground ? 'bg-opacity-100' : 'bg-opacity-40'}
        `}
      >
        <img src="/images/logo.png" className="h-6 lg:h-9" alt="Logo" />
        <div
          className="
            flex-row
            ml-8
            gap-7
            hidden
            lg:flex
          "
        >
          <NavbarItem label="Home" />
          <NavbarItem label="Profile" />
          <NavbarItem label="Favorites" />
          <NavbarItem label="Continue Watching" />
          <NavbarItem label="Whats New?" />
          <NavbarItem label="Seasonal" />
        </div>

        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <GiHamburgerMenu className="text-white transition" />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>

          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-md overflow-hidden">
              <img src="/images/treesbackground.png" alt="" />
            </div>
            <BsChevronDown
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
