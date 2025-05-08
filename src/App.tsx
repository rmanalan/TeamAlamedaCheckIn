import {ReactNode, useState } from "react"
import HomePage from "./Pages/Home"

export let PageSetter: (page: ReactNode) => void

function App() {
    const [currentPage, setCurrentPage] = useState<ReactNode>(<HomePage/>)

    PageSetter = setCurrentPage

    return currentPage
}

export default App
