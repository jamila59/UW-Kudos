import banner from '../img/banner.png';
import { useUserContext } from "../context/userContext";
import { Link } from 'react-router-dom';

export function NavBar(props) {
    const {user, logoutUser } = useUserContext();
    return (
        <header>
            <div className="header">
            <div className="container-fluid">
                <div className="row">
            <img src={banner} alt="uw logo"/>
                {!props.user &&
                     <li className="nav-item col-6 ">
                          <Link to="/auth">
                            <button type="button" className="btn btn-secondary ww col-3">
                                Sign in
                            </button>
                        </Link>
                   </li>
                }
                {props.user &&
                    <li className="nav-item col-6 ">
                        <p>Welcome {user.displayName}!</p>
                    <button className="btn btn-secondary col-3 " onClick={logoutUser}>Sign Out</button>
                  </li>
                }
                 </div>
            </div>
            </div>
            <div className="jumbotron">
                <div className="container">
                    <h1>HUSKY KUDOS</h1>
                    <div className="nav-flex-container">
                        <div className="nav-button sm"><span><a href="/">Home</a></span></div>
                        <div className="nav-button sm"><span><a href="/about">About</a></span></div>
                        <div className="nav-button sm"><span><a href="/users">Users</a></span></div>
                        <div className="nav-button sm"><span><a href="/form">Add a Post</a></span></div>
                    </div>
                </div>
            </div>
        </header >
    )
}
