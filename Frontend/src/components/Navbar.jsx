import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// react icons
import {FaBlog } from "react-icons/fa6";

function Navbar() {
  const [isMenuOpen, seIsMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  //toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 100){
        setSticky(true);
      }
      else{
        setSticky(false);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
       window.addEventListener("scroll", handleScroll);
    }
  }, [])

  // navItems here
  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Shop", path: "/shop" },
    { link: "Sell Your Book", path: "/admin/dashboard" },
    { link: "Blog", path: "/Blog" },
  ];

  return (
    <header>
      <nav>
        <div>
          {/* logo */}
          <Link to="/"><FaBlog/>Books</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
