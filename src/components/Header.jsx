import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header>
      {user ? (
        <>
          <nav>
            <Link to="/profile">Profile</Link>
            <Link to="/calendar">Calendar</Link>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </>
      ) : (
        <h1>Welcome to Birthday Reminder App</h1>
      )}
    </header>
  );
};

export default Header;
