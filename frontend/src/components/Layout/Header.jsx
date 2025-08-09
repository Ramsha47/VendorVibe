import React, { useState } from 'react'
import styles from "../../styles/styles";
import { AiOutlineSearch } from 'react-icons/ai';
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io';
import {AiOutlineHeart,AiOutlineShoppingCart} from 'react-icons/ai';
import {BiMenuAltLeft} from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
import { Link } from 'react-router-dom';
import {productData} from '../../static/data';
import {categoriesData} from '../../static/data';
import DropDown from './DropDown';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';

const Header = () => {
    const {isAuthenticated, user} = useSelector((state) => state.user);
    console.log("user:", user);
    console.log("isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
      console.log("Header: User is not authenticated");
    }
    if (!user) {
      console.log("Header: No user data available");
    }
    if (!user || !user.avatar || !user.avatar.url) {
      console.log("Header: No user avatar, using fallback image");
    }
    const [searchTerm, setSearchTerm] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [active , setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [activeHeading, setActiveHeading] = useState(1);
    console.log('productData:', productData);
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filteredData = Array.isArray(productData)
            ? productData.filter((product) => {
                return product.name.toLowerCase().includes(term.toLowerCase());
            })
            : [];
        setSearchData(filteredData);
    };
    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
          setActive(true);
        } else {
          setActive(false);
        }
      });

  return (
    <>
      {/* Top Header Section */}
      <div className={styles.section}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="VendorVibe Logo"
              />
            </Link>
          </div>

          {/* Search Box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {Array.isArray(searchData) && searchData.length !== 0 && (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((i, index) => (
                  <Link to={`/product/${i._id || ''}`} key={i._id || index}>
                    <div className="w-full flex items-start-py-3">
                      <img
                        src={Array.isArray(i.images) && i.images[0] ? i.images[0].url : "https://via.placeholder.com/40"}
                        alt={i.name || "Product"}
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <h1>{i.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Seller Button */}
          <div className={styles.button}>
            <Link to="/seller">
              <h1 className="text-[#fff] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      {/* Sticky Category Navigation */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
          {/* Categories Dropdown */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md"
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
              <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
          </div>
           <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={()=>{}}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img src={`${user.avatar?.url}`} className="w-[40px] h-[40px] rounded-full" alt="" />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
        </div>
      </div>
    </>
  );
   
}

export default Header