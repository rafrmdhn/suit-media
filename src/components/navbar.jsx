import React, { useState, useEffect } from "react";
import Logo from "../assets/img/logo-suitmedia.png";

const Navbar = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Add state for menu toggle

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingUp = currentScrollPos > prevScrollPos;
            setIsScrolled(isScrollingUp);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 ${isScrolled ? 'bg-transparent' : 'bg-orange-600'} border-gray-200 transition duration-300 ease-in-out`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className={`flex items-center ${isScrolled ? 'opacity-0' : ''} space-x-3 rtl:space-x-reverse`}>
                    <img src={Logo} className="h-8" alt="suitmedia logo" />
                </a>
                <button
                    onClick={toggleMenu}
                    type="button"
                    className={`inline-flex items-center ${isScrolled ? 'opacity-0' : ''} p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 `}
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className={`w-5 h-5 ${isScrolled ? 'opacity-0' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse ">
                    <li>
                        <a href="#"  className={`block py-2 px-3 ${isScrolled ? 'text-opacity-0 text-white' : 'text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:underline underline-offset-8 md:p-0`}>Home</a>
                    </li>
                    <li>
                        <a href="#" className={`block py-2 px-3 ${isScrolled ? 'text-opacity-0 text-white' : 'text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:underline underline-offset-8 md:p-0`}>About</a>
                    </li>
                    <li>
                        <a href="#" className={`block py-2 px-3 ${isScrolled ? 'text-opacity-0 text-white' : 'text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:underline underline-offset-8 md:p-0`}>Services</a>
                    </li>
                    <li>
                        <a href="#" className={`block py-2 px-3 ${isScrolled ? 'text-opacity-0 text-white' : 'text-white'} rounded underline underline-offset-8 md:p-0`}>Ideas</a>
                    </li>
                    <li>
                        <a href="#" className={`block py-2 px-3 ${isScrolled ? 'text-opacity-0 text-white' : 'text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:underline underline-offset-8 md:p-0`}>Careers</a>
                    </li>
                    <li>
                        <a href="#" className={`block py-2 px-3 ${isScrolled ? 'text-opacity-0 text-white' : 'text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:underline underline-offset-8 md:p-0`}>Contact</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;