import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import FanLetter from "../pages/FanLetter";
import FanLetterDetail from "../pages/FanLetterDetail";
import { datas } from "./artists";

const Router = () => {
  const [artists, setArtists] = useState(datas);
  const [selectedMember, setSelectedMember] = useState();
  console.log(datas);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/fanletter/:id"
            element={
              <FanLetter
                setSelectedMember={setSelectedMember}
                selectedMember={selectedMember}
                artists={artists}
                setArtists={setArtists}
              />
            }
          />
          <Route
            path="/fanletterDetail/:id"
            element={
              <FanLetterDetail
                selectedMember={selectedMember}
                artists={artists}
                setArtists={setArtists}
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
