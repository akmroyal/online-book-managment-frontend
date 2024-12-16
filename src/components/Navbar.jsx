import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineBars3CenterLeft, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { PiHeartStraightBold } from "react-icons/pi";
import avatarImg from "../assets/avatar.png"
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Checkout", href: "/checkout" },
]

const Navbar = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    // manage logo when user login or logout
    const { currentUser, logout } = useAuth();
    const handleLogOut = () => {
        logout()
    }

    const cartItems = useSelector(state => state.cart.cartItems)
    console.log(cartItems);


    return (
        <header className='max-w-screen-2xl mx first-line: -auto px-4 py-6'>
            <nav className='flex justify-between items-center '>
                {/* Left side of nav */}
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to="/">
                        <HiOutlineBars3CenterLeft className='size-6' />
                    </Link>
                    {/*Search input  */}
                    <div className='relative sm:w-72 w-40 space-x-2'>
                        <IoSearch className='absolute inline-block left-3 inset-y-2' />
                        <input
                            type="text"
                            placeholder='Search Here'
                            className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none'
                        />
                    </div>
                </div>


                {/* right side of nav */}
                <div className='relative flex items-center md:space-x-4 space-x-2'>
                    <div>
                        {
                            currentUser ? <>
                                <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                                    <img src={avatarImg} alt="Pro" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                </button>
                                {/*  */}
                                {
                                    isDropDownOpen && (
                                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                            <ul className='py-2'>
                                                {
                                                    navigation.map((item) => (
                                                        <li key={item.name} onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                                                            <Link to={item.href} className='block px-2 text-sm hover:bg-gray-100'>
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li className="">
                                                    <button
                                                        className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                                                        onClick={handleLogOut}
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </> :
                                <Link to='/login'><HiOutlineUser className='size-6' /></Link>
                        }
                    </div>
                    <button className='hidden sm:block'>
                        <PiHeartStraightBold className='size-6' />
                    </button>
                    <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
                        <HiOutlineShoppingCart className='size-6' />
                        {
                            cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span> : <span className='text-sm font-semibold sm:ml-1'>0</span>
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
