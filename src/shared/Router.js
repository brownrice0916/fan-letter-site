import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import FanLetter from "../pages/FanLetter";
import FanLetterDetail from "../pages/FanLetterDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fanletter/:id" element={<FanLetter />} />
          <Route path="/fanletterDetail/:id" element={<FanLetterDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
