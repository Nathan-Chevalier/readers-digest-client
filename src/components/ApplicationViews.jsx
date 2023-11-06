import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const ApplicationViews = () => {
    return <BrowserRouter>
    <Routes>
        <Route path="/login" element={''} />
        <Route path='/register' element={''} /> 
    </Routes>
    </BrowserRouter>
}