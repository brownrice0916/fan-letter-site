import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import FanLetter from "../pages/FanLetter/FanLetter";
import FanLetterDetail from "../pages/FanLetterDetail/FanLetterDetail";
import { datas } from "./artists";
import { GetLocalStorage, SaveLocalStorage } from "common/common";

const Router = () => {
  const [artists, setArtists] = useState(datas);
  const [selectedMember, setSelectedMember] = useState();
  const [currentArtist, setCurrentArtist] = useState(datas[0]);
  useEffect(() => {
    if (!GetLocalStorage("artists")) {
      SaveLocalStorage("artists", datas);
    } else {
      setArtists(JSON.parse(GetLocalStorage("artists")));
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout setSelectedMember={setSelectedMember}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/fanletter"
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
