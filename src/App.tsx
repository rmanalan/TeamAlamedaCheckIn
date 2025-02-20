import { Route, Routes, BrowserRouter } from "react-router"
import HomePage from "./Pages/Home"
import LeaderPage from "./Pages/Leader"
import RiderPage from "./Pages/Rider"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"       element={<HomePage/>}/>
                <Route path="/Leader" element={<LeaderPage/>}/>
                <Route path="/Rider"  element={<RiderPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
