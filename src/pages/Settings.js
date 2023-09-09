import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "@component/components/SideBar";

const Settings = () => {
  return (
    <div>
         <SideBar/>
         <div className="wrapper">
       
      {/* <div className='search__background'>
            <div className='search__wrapper'>
            <figure className=''></figure>
            </div>
            </div> */}
      <div className="search__content">
        <div className="search">
          <div className="search__input--wrapper">
            <input
              className="search__input"
              placeholder="Search for books"
              type="text"
            />
            <div className="search__icon">
              <SearchIcon className="svg" />
            </div>
          </div>
        </div>
      </div>
    </div>  
    </div>
 
  );
};

export default Settings;
