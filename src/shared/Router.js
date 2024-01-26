import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import FanLetter from "../pages/FanLetter/FanLetter";
import FanLetterDetail from "../pages/FanLetterDetail/FanLetterDetail";
import { datas } from "./artists";

const Router = () => {
  const [artists, setArtists] = useState(datas);
  const [selectedMember, setSelectedMember] = useState();
  const [currentArtist, setCurrentArtist] = useState(datas[0]);

  return (
    <BrowserRouter>
      <Layout setSelectedMember={setSelectedMember}>
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
                setCurrentArtist={setCurrentArtist}
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
                currentArtist={currentArtist}
                setSelectedMember={setSelectedMember}
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
