import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../src/utils/constant";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(URL_LOGIN);
    }, []);

    return <div className="App"></div>;
}

export default App;
