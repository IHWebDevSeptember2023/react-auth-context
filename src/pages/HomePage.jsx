import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const [projects, setProjects] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/api/just-projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);


  return (
    <div>
      <h1>Home Page</h1>
      {
        projects.map((project) => {
          return <div key={project._id}>
            <h2>{project.title}</h2>
            {isLoggedIn ? <Link to={`/projects/${project._id}`}>details</Link> :<Link to="/login"> login to see the details</Link>}
          </div>
        })
      }
    </div>
  );
}

export default HomePage;