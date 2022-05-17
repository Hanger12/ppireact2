import './App.css';
import Switch from "./page/switch";
import About from './page/about'
import News from './page/news'
import New from './page/new'
import Bookmarks from './page/Bookmark'
import pagenotfound from './page/pageNoFound'
import {HashRouter, Link, Route, Routes,Navigate} from "react-router-dom";
import React,{ useState }from "react";
function App() {
    
    function mobileMenu() {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    function closeMenu() {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");
        const navLink = document.querySelectorAll(".nav-link");
        navLink.forEach(n => n.addEventListener("click", closeMenu));
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
    const [value, setValue] = useState(false);
    return (
      <HashRouter>
          <header id="header" className="header">
              <nav className="navbar">
                  <Link className="nav-logo" to="/">SpaceNews</Link>
                  <div className="app">
                      <p id="text" >
                          Светлая/темная тема:
                          <Switch
                              isOn={value}
                              handleToggle={() =>{
                                  setValue(!value);
                                  value===false?document.getElementsByTagName('body')[0].className='bodyDark':document.getElementsByTagName('body')[0].className-='bodyDark';
                                  value===false?document.getElementById('header').className='headerDark':document.getElementById('header').className='header';
                                  value===false?document.getElementById('text').className='textDark':document.getElementById('text').className='text';
                              } }
                          />
                      </p>
                  </div>
                  <ul className="nav-menu">
                      <li className="nav-item">
                          <Link className="nav-item1" to="/">Новости</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-item1" to="/about">О приложении</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-item1" to="/bookmarks">Закладки</Link>
                      </li>
                  </ul>
                  <div className="hamburger" onClick={()=>mobileMenu()}>
                      <span className="bar"/>
                      <span className="bar"/>
                      <span className="bar"/>
                  </div>
              </nav>
          </header>
          <div className="">
              <Routes>
                  <Route path="/" element={<Navigate to="/news" replace />}/>
                  <Route path="/news" element={<News/>}/>
                  <Route path="*" element={<pagenotfound/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/news/:id" element={<New/>}/>
                  <Route path="/bookmarks" element={<Bookmarks/>}/>
              </Routes>
          </div>
      </HashRouter>
  );
}
export default App;
