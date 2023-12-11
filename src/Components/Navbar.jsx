import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { RiMenu3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMoon } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const history = useNavigate();
  const [media, setMedia] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Check if the user is already logged in
    const user = JSON.parse(localStorage.getItem("user-info"));
    console.log(user);
    if (user) {
      // Extract the username from the email
      //
      const username = user.email.split("@")[0];
      // Update the user object with the extracted username
      setLoggedInUser({ ...user, name: username });
    } else {
      setLoggedInUser(user);
    }
  }, []);

  const handleSearch = () => {
    // Ensure searchText is updated before rendering FetchData
    setSearchText(searchInput);
  };
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const userLogout = async () => {
    // Clear the logged-in user data
    localStorage.removeItem("user-info");
    setLoggedInUser(null);
    toast.success("Successfully Signed out", {
      theme: "colored",
      position: toast.POSITION.TOP_CENTER,
    });
    await delay(2000);
    history("/login");
  };

  const [theme, setTheme] = useState("light-theme");
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "dark-theme" ? "light-theme" : "dark-theme"
    );
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src="logo.jpeg" alt="logo" className="logo" />
      </NavLink>

      <ul className={`navlink ${media ? "active" : ""}`}>
        <li>
          <NavLink to="/" className="navlink">
            HOME
          </NavLink>
        </li>

        <li>
          <NavLink to="/ipl" className="navlink">
            IPL
          </NavLink>
        </li>
        <li>
          <NavLink to="/finance" className="navlink">
            FINANCE
          </NavLink>
        </li>
      

        <li>
          <NavLink to="/readlater" className="navlink">
            Bookmarked
          </NavLink>
        </li>

        <li className="buttons">
          {loggedInUser ? (
            <>
              <p id="profile">Welcome, {loggedInUser.name}!</p>
              <button className="btn" onClick={userLogout}>
                Logout
              </button>
              <ToastContainer autoClose={3000} />
            </>
          ) : (
            <Link to="/signup" className="navlink">
              <button className="btn">SignUp</button>
            </Link>
          )}
        </li>
      </ul>

      <div className="rightside">
        <div className="barger">
          <RiMenu3Fill className="icon" onClick={() => setMedia(!media)} />
        </div>

        <div className="search relative">
          <input
            type="text"
            placeholder="Search"
            className="input"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <NavLink to={`/search/${searchInput}`}>
            <button className=" absolute" onClick={handleSearch}>
              <BsSearch />
            </button>
          </NavLink>
        </div>
      </div>
      <div>
        <a href="#" className="dark" onClick={toggleTheme}>
          <FaMoon />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
