import React from 'react'
import { Link, useLocation } from "react-router-dom";
// import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
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

    return (
        <div><nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="visible navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link float-right" to="">Home <span className="sr-only">(current)</span></Link>

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
                        <Link className="nav-link float-right" style={{ display: user ? 'none' : 'block' }} to="/SignIn?signin">SignIn <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link float-right" style={{ display: user ? 'none' : 'block' }} to='/SignIn?signup' >SignUp <span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item active" style={{ display: user ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to="ProfilePage"> Profile <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active" style={{ display: user ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to="ProfilePage/MySubGredit"> Mygredits <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active" style={{ display: user ? 'block' : 'none' }}  >
                        <Link className="nav-link float-right" to="AllGredits"> AllGredits <span className="sr-only">(current)</span></Link>
                    </li>
                    <li style={{ display: user ? 'block' : 'none' }}>
                        <button className='btn' onClick={function () {
                            console.log('hello')
                            navigate(
                                '/AllUsers')
                        }} >AllUsers</button>
                    </li>
                    <li style={{ display: user ? 'block' : 'none' }}>
                        <button className='btn' onClick={LogOut}>Logout</button>
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