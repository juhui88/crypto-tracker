import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface Imode {
    isDarkMode : boolean,
    toggleDarkMode: Function,
}


function Router({isDarkMode, toggleDarkMode} : Imode) {
    return (
        <BrowserRouter basename = "/crypto-tracker">
            <Routes>
                <Route path = "/" element={<Coins isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>}/>
                <Route path = "/:coinId/*" element={<Coin isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>}/>
            </Routes>
        </BrowserRouter>
            
    )
}

export default Router;