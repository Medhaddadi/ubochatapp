import './App.css';
import {Login} from "./user/Login";
import {Provider} from 'react-redux';
import {store} from './configureStore';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Register from "./user/Register";
import Messages from "./messages/Messages";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/messages" element={<Messages/>}/>
                </Routes>
            </Router>
        </Provider>

    );
}

export default App;
