import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Welcome } from '../../assets';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log({
        email: email,
        password: password,
      });
      let res = await fetch(
        'https://api.transcript.dtkapp.com.ng/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      let resJson = await res.json();
      console.log(res, resJson);
      if (res.status === 200) {
        const { message, user } = resJson;
        console.log(user);
        toast.success(`${message}`);
        localStorage.setItem('transcript-uid', user.id);
        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        if (resJson?.error) toast.error(resJson?.error);
        else toast.error(`Something went wrong`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="grid place-content-center overflow-hidden md:h-screen bg-gradient-to-r from-[#5d12ad19] to-sky-50">
      <div className="w-full flex md:flex-row flex-col justify-between md:p-14 rounded-md shadow-2xl">
        <div className="md:w-1/2 w-full md:bg-neutral-50 p-4 flex items-center justify-center">
          <img src={Welcome} alt="welcome-img" className="md:w-full w-[90%]" />
        </div>

        <div className="md:w-1/2 w-full flex flex-col justify-center  bg-white pl-7 pt-6 md:pb-0 pb-5 rounded-t-3xl md:rounded-none">
          <h1 className="text-4xl font-semibold text-neutral-600">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[#ae67fa] to-[#f49867] inline-block text-transparent bg-clip-text">
              Transcript Request
            </span>
          </h1>
          <h6 className=" font-semibold text-lg text-neutral-600 pt-1">
            Sign in your account
          </h6>

          <form onSubmit={handleSubmit} className="pt-4">
            <label htmlFor="email" className="pl-3 text-base pb-1 font-medium">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                const details = e.target.value;
                setEmail(details);
              }}
              placeholder="example@mail.com"
              className="border w-[70%] py-1.5 mb-5 rounded-[4px] focus:border focus:border-blue-400 px-3 outline-none "
              required
            />

            <br />
            <label
              htmlFor="password"
              className="pl-3 text-base pb-1 font-medium"
            >
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="password"
              id="password"
              value={password}
              onChange={(e) => {
                const details = e.target.value;
                setPassword(details);
              }}
              className="border w-[70%] py-1.5 mb-5 rounded-[4px] focus:border focus:border-blue-400 px-3 outline-none"
              required
            />
            <br />
            <button
              type="submit"
              className="text-white transition-all ease-out bg-[#ab60fa] hover:bg-[#9f5fe3] py-2 px-8 rounded-sm"
            >
              Sign in &rarr;
            </button>
          </form>
          <h6 className="text-lg text-neutral-600 pt-1">
            Don't have an account?{' '}
            <a href="/signup" className="text-indigo-700 underline">
              Sign Up
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Signin;
