import React from "react";
import { Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<TodoPage />} />
                <Route
                    path="/auth"
                    element={<AuthPage />}
                />
            </Routes>
        </div>
    );
};

export default App;
