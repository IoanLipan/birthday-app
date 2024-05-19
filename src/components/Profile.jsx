import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <div>
          <h1>Profile</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Profile;
