import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [message, setMessage] = useState("")
    // from the authcontext for the reciveing 
    const { loginUser, signInWithGoogle } = useAuth();
    // using the react hook form : for sending the data to backend
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate(); // for redirect to home page

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await loginUser(data.email, data.password)
            alert("Login SuccessFull :)")
            navigate("/")
        } catch (error) {
            setMessage("Please provide a valid email or password")
            console.error(error);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle()
            alert("Login SuccessFully !!")
            navigate("/")
        } catch (error) {
            alert("Google signIn Failed")
            console.error(error);
        }
    }

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <h2 className='text-xl font-semibold mb-4 text-center'>Please Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">E-mail</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            name='email'
                            id='email'
                            placeholder='Enter your email'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            name='password'
                            id='password'
                            placeholder='Enter your password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                    </div>
                    {
                        message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                    }
                    <div className=''>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login</button>
                    </div>
                </form>
                <p className="align-baseline font-medium mt-4 text-sm">Haven't an account? Please <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link></p>
                {/* Google sign in btn */}
                <div className='mt-4'>
                    <button className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'
                        onClick={handleGoogleSignIn}
                    >
                        <FaGoogle className='mr-2' />
                        Sign in with Google
                    </button>
                </div>
                <p className='mt-5 text-center text-gray-500 text-xs '>2025 Book store. All right reserved.</p>
            </div>
        </div>
    )
}

export default Login
