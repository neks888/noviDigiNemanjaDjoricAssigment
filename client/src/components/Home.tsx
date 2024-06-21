import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        console.log(user);
        if (token) {
          const res = await axios.get(
            `http://localhost:5000/api/users/${userId}`,
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );
          console.log(res.data.user[0]);
          setUser(res.data.user[0]);
        } else {
          navigate("/register");
        }
      } catch (err) {
        navigate("/register");
      }
    };
    fetchUser();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/register");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>
        Welcome {user.firstName} {user.lastName}
      </h1>
      <button onClick={logout} className="btn btn-block btn-primary">
        Log Out
      </button>
    </div>
  );
};

export default Home;
