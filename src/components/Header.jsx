'use client'
import { useBoardStore } from "../store/Boardstore";
import Avatar from "react-avatar";
import { HiOutlineSearch, HiUserCircle } from "react-icons/hi";
const Header = () => {
  const [searchString, setSearchString]=useBoardStore((state)=>[
    state.searchString,
    state.setSearchString
  ])

  
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-[#F5F6] to-orange-300 rounded-md blur-3xl opacity-60 -z-50"/>
        <h1 className="text-3xl font-bold w-44 md:w-56 md:pb-0 object-contain ">
          Trello AI
        </h1>

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* search box */}
          <form
            action=""
            className="flex items-center space-x-5 rounded-md p-2 shadow-md flex-1 md:flex-initial"
          >
            <HiOutlineSearch className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e)=>setSearchString(e.target.value)}
              className="p-2 flex-1 outline-none rounded-md bg-white bg-opacity-50"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          {/* Avatar */}
          <Avatar name='Raju Chhetry' round color="orange" size="50"/>
        </div>
       
      </div>
       {/* suggestion */}
      
       <div className="flex justify-center items-center px-5 py-2 md:py-5">
                <p className="flex items-center text-sm font-light pr-3 shadow-xl rounded-xl w-fit italic max-w-3xl text-blue-600 p-5">
                    <HiUserCircle className={`w-10 h-10 inline-block text-blue-600 mr-1 `}/>
                    Gpt is static now
                </p>
        </div>
    </header>
  );
};

export default Header;
