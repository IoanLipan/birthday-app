import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { requestNotificationPermission } from "./firebase";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Calendar from "./components/Calendar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useSwipeable } from "react-swipeable";
import "./App.css";

const App = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate("/calendar"),
    onSwipedRight: () => navigate("/profile"),
  });

  return (
    <>
      <Header />
      <div {...handlers}>
        {user ? (
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="*" element={<Navigate to="/profile" />} />
          </Routes>
        ) : (
          <Auth />
        )}
      </div>
    </>
  );
};

export default App;
