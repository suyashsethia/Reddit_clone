import React from 'react'
import { Link, useLocation } from "react-router-dom";
// import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Joining from './Joining';
const Navbar = () => {
    let location = useLocation()
    let user = localStorage.getItem('UserData')
    let navigate = useNavigate();
    const LogOut = () => {
        localStorage.removeItem('UserData');
        navigate({
            pathname: '/SignIn',
            search: '?signin',
        })
    }
    console.log("location.pathname", location.pathname)
    const stats =location.pathname + "/Stats"
    // console.log(stats)
    const joining =location.pathname + "/Joining"
    // console.log(joining)
    const users =location.pathname + "/Users"
    // console.log(users)
    const reporting =location.pathname + "/Reporting"
    // console.log(reporting)

    return (
        <div><nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="visible navbar-nav mr-auto">
                    <li className="nav-item active">
                        <span>


                            <Link className="nav-link float-right" to=""><i className="fas fa-home"> Home</i> <span className="sr-only">(current)</span></Link>

                        </span>
                        {/* <i className="bi bi-briefcase-fill"></i> */}
                        {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li> */}
                    {/* <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                    <li className="nav-item active">
                        <Link className="nav-link float-right" style={{ display: user ? 'none' : 'block' }} to="/SignIn?signin"><i className="fas fa-sign-in-alt"></i>SignIn <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link float-right" style={{ display: user ? 'none' : 'block' }} to='/SignIn?signup' ><i className="fas fa-sign-in-alt"></i>SignUp <span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item active" style={{ display: user ? 'block' : 'none' }}  >


                        <Link className="nav-link float-right" to="ProfilePage"> <i className="fas fa-user"> Profile</i> <span className="sr-only">(current)</span></Link>
                    </li>
                    
                    {/* <li className="nav-item active" style={{ display: user ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to="Sub_Greddiit_Page"> <i className="fab fa-android"> </i>  Sub Greddiit Page  <span className="sr-only">(current)</span></Link>
                    </li> */}
                    <li className="nav-item active" style={{ display: user ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to="ProfilePage/MySubGredit"> <i className="fab fa-android"> </i>  My Sub Greddiits Page  <span className="sr-only">(current)</span></Link>
                    </li>
                    {/* <li className="nav-item active" style={{ display: user ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to="AllPosts"> <i className="fas fa-blog"></i>AllPosts <span className="sr-only">(current)</span></Link>
                    </li> */}

                    <li className="nav-item active" style={{ display: user ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to="AllGredits"> <i className="fab fa-pagelines"></i>AllGredits <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active" style={{ display: user ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to="SavedPosts"> <i className="fab fa-pagelines"></i>Saved Posts <span className="sr-only">(current)</span></Link>
                    </li>
                    <li style={{ display: (user) ? 'block' : 'none' }}>
                        <button  className='btn' onClick={function () {
                        navigate('/AllUsers')}} ><i className="fas fa-users"></i>ALL_Users</button>
                    </li>
                    <li className="nav-item active" style={{ display: (user&&(location.pathname.slice(0,11)==='/GreditPage')&&(location.pathname.slice(-11)!=(('/statistics'))) &&(location.pathname.slice(-11)!=(('/joiningreq')))&&(location.pathname.slice(-11)!=(('/gredituser')))&&(location.pathname.slice(-11)!=(('/Reporteddd'))) ) ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to={ location.pathname + "/statistics"}> <i className="fab fa-pagelines"></i>Stats <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active" style={{ display: (user&&(location.pathname.slice(0,11)==='/GreditPage')&&(location.pathname.slice(-11)!=(('/statistics'))) &&(location.pathname.slice(-11)!=(('/joiningreq')))&&(location.pathname.slice(-11)!=(('/gredituser')))&&(location.pathname.slice(-11)!=(('/Reporteddd'))) ) ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to={location.pathname + "/Reporteddd"}> <i className="fab fa-pagelines"></i>Reported <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active" style={{ display: (user&&(location.pathname.slice(0,11)==='/GreditPage')&&(location.pathname.slice(-11)!=(('/statistics'))) &&(location.pathname.slice(-11)!=(('/joiningreq')))&&(location.pathname.slice(-11)!=(('/gredituser')))&&(location.pathname.slice(-11)!=(('/Reporteddd'))) ) ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to={location.pathname + "/joiningreq"}> <i className="fab fa-pagelines"></i>Joining <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active" style={{ display: (user&&(location.pathname.slice(0,11)==='/GreditPage')&&(location.pathname.slice(-11)!=(('/statistics'))) &&(location.pathname.slice(-11)!=(('/joiningreq')))&&(location.pathname.slice(-11)!=(('/gredituser')))&&(location.pathname.slice(-11)!=(('/Reporteddd'))) ) ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to={location.pathname + "/gredituser"}> <i className="fab fa-pagelines"></i>Users <span className="sr-only">(current)</span></Link>
                    </li>
                    <li style={{ display: user ? 'block' : 'none' }}>
                        <button className='btn' onClick={LogOut}> <i className="fas fa-sign-out-alt"></i>Logout</button>
                    </li>

                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                   <div>

                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                   </div>
                </form> */}
            </div>
        </nav >
        </div >
    )
}

export default Navbar