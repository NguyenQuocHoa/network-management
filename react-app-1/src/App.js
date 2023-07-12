import "./App.css";
import { useEffect } from "react";
import { getAccounts } from "../src/utils/services/account";

function App() {
    const onClick = () => {
        // console.log("On button click");
    };

    useEffect(() => {
        getAccountListAction();
    }, []);

    const getAccountListAction = () => {
        getAccounts()
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="App">
            {/* <Button color="primary" fill="outline" onClick={onClick}>
                Click Demo abc
            </Button> */}
            Home page
        </div>
    );
}

export default App;
