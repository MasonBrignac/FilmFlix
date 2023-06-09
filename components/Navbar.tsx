import React, { useCallback, useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch, BsChevronDown } from 'react-icons/bs';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavbarItem from './NavbarItem';
import { useSession } from 'next-auth/react';

const TOP_OFFSET = 66;

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

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
    setShowAccountMenu((current) => {
      console.log(current); // debugging the cheveron
      return !current;
    });
  }, []);

  if (!session || loading) {
    return null;
  }

  if (router.pathname === '/profiles') return null;

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
        <img src="/images/logo.png" className="h-8 lg:h-9" alt="Logo" />
        <div
          className="
            flex-row
            ml-10
            gap-8
            hidden
            lg:flex
          "
        >
          <Link href="/">
            <NavbarItem label="Home" />
          </Link>
          <Link href="/profile">
            <NavbarItem label="Profiles" />
          </Link>
          <Link href="/favorites">
            <NavbarItem label="Favorites" />
          </Link>
          <Link href="/indieShorts">
            <NavbarItem label="Indie Shorts" />
          </Link>
          <Link href="/indieMovies">
            <NavbarItem label="Indie Movies" />
          </Link>
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
              style={{
                transition: 'transform 0.3s',
                transform: `rotate(${showAccountMenu ? '180deg' : '0deg'})`
              }}
              className="w-4 text-white fill-white"
            />


            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;