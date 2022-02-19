import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { GoogleLogout } from 'react-google-login';


const Navbar = ( { searchTerm, setSearchTerm, user }) => {

    const navigate = useNavigate();

    const logout = () => {
      localStorage.clear();
  
      navigate('/login');
    };
  

    /*if(!user)

    return null;*/

    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-white outline-none"
          />
        </div>
        {user ? (
        <div className="flex gap-3 ">
          
          <Link to="/create-pin" className="base-color hover:opacity-80 text-white rounded-full  md:rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAdd className='font-bold' fontSize={25} title='Create a Pin'/>
          </Link>
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img src={user.image} alt="user-pic" className="w-12 h-12 md:w-14 md:h-12 rounded-full md:rounded-lg" />
          </Link>
          <div className="rounded-full w-12 h-12 md:w-14 md:h-12 mb-3 flex justify-center items-center">
                <GoogleLogout
                  clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout title='Logout' color="red" fontSize={30} />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy="single_host_origin"
                />
             
            </div>
        </div>)
: (<Link to="/login" className="flex font-bold mt-2 mx-2 text-lg">
Login <AiOutlineLogin color='green' fontSize={22} className="mt-1 mb-2 mx-2"/>
</Link>)}
      </div>
    )

  
};

export default Navbar;
