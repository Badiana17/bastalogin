import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const Dashboard2 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userRole, setRole] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);

      if (storedRole !== "Employee") {
        navigate("/employee2");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#1d2671" }}>
          Welcome {userRole}, <br></br> {user}
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard2;
