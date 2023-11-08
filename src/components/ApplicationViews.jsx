import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Home } from "../pages/Home";
import { AddBook } from "../pages/AddBook";
import { ViewBook } from "../pages/ViewBook";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const ApplicationViews = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
            <Route path="/" element={<Home />} />
            <Route path="create" element={<AddBook />} />
            <Route path=":bookId" element={<ViewBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
