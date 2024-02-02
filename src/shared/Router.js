import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import FanLetter from "../pages/FanLetter/FanLetter";
import FanLetterDetail from "../pages/FanLetterDetail/FanLetterDetail";
import { datas } from "./artists";
import { getLocalStorage, saveLocalStorage } from "common/common";
import { ArtistContext } from "contexts/ArtistsContext";

const Router = () => {
  const [artists, setArtists] = useState(datas);
  const [selectedMemberId, setSelectedMemberId] = useState();

  useEffect(() => {
    if (!getLocalStorage("artists")) {
      saveLocalStorage("artists", datas);
    } else {
      setArtists(JSON.parse(getLocalStorage("artists")));
    }
  }, []);

  return (
    <BrowserRouter>
      <ArtistContext.Provider
        value={{ artists, setArtists, selectedMemberId, setSelectedMemberId }}
      >
        <Layout setSelectedMemberId={setSelectedMemberId}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fanletter" element={<FanLetter />} />
            <Route path="/fanletter-detail" element={<FanLetterDetail />} />
          </Routes>
        </Layout>
      </ArtistContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
