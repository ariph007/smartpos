import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigateTo = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // console.log(errors)
    const loginHandler = async (data) => {
        setLoading(true);
        await axios.post('http://localhost:5000/auth/login', {
            email: data.email,
            password: data.password
        })
            .then((result) => {
                setLoading(false)
                toast.success(result.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500
                });
                setInterval(() => {
                    navigateTo('/order')
                }, 2000);
            }).catch((err) => {
                setLoading(false)
                toast.error(err.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500
                });
            });
    }

    return (
        <div className='bg-primary w-full h-screen flex flex-col items-center'>
            <ToastContainer limit={1} />
            <div className='w-[90%] 2xl:max-w-[1536px] mt-4 flex flex-row h-screen'>
                <div className='flex w-full'>
                    <div className=' w-full md:w-1/2'>
                        <div className='flex flex-col h-full'>
                            <div>
                                <Logo />
                            </div>
                            <div className='justify-center flex flex-col content-center items-center md:w-[50%] 2xl:w-full h-full m-auto'>
                                <div className='flex flex-col text-left w-full mb-8'>
                                    <p className='text-3xl text-white/80 font-semibold'>Welcome Back</p>
                                    <p className='text-base text-white/80 font-thin'>Welcome back! please enter your details.</p>
                                </div>
                                <form
                                    className='w-full'>
                                    <div className="mb-4">
                                        <label className="block text-white/80 text-sm font-bold mb-2" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline"
                                            {...register("email", {
                                                required: "This is required",
                                                pattern: {
                                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            placeholder="Email"
                                        />
                                        <p className='text-danger'>{errors.email?.message}</p>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white/80 text-sm font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline"
                                            {...register("password", {
                                                required: "This is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Min length is 6"
                                                }
                                            })}
                                            placeholder="Password"
                                        />
                                        <p className='text-danger'>{errors.password?.message}</p>

                                    </div>
                                    <button
                                        onClick={handleSubmit(loginHandler)}
                                        className={!loading ?
                                            "flex justify-center item-center m-auto transition-all duration-200 bg-secondary hover:bg-neutral-900 w-full text-white/80 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :
                                            "flex justify-center item-center m-auto cursor-wait bg-secondary  w-full text-white/80 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}>
                                        {loading &&
                                            <ThreeDots
                                                height="26"
                                                width="26"
                                                radius="9"
                                                color="#171917"
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                wrapperClassName=""
                                                visible={true}
                                            />}
                                        <p className={loading ? "ml-4" : ""}>Login</p>
                                    </button>

                                </form>
                                <p className='text-white/80 text-sm mt-4'>Don't have an account ? <span>Sign Up</span></p>
                            </div>
                        </div>
                    </div>
                    <div className=' hidden w-1/2 md:flex md:ml-8  flex-col justify-center items-center'>
                        <img src={require('../assets/images/posIllusration.svg').default} alt='mySvgImage' className='w-[300px]' />
                        <p className='text-white/80 font-medium text-base'>Employees ● Inventory ● Products ● Track Sales ● Make Sales ● Maximize Profits</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
