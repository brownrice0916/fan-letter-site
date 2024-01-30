import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import FanLetter from "../pages/FanLetter/FanLetter";
import FanLetterDetail from "../pages/FanLetterDetail/FanLetterDetail";
import { datas } from "./artists";
import { getLocalStorage, saveLocalStorage } from "common/common";

const Router = () => {
  const [artists, setArtists] = useState(datas);
  // const [selectedMember, setSelectedMember] = useState();
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
      <Layout setSelectedMemberId={setSelectedMemberId}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/fanletter"
            element={
              <FanLetter
                selectedMemberId={selectedMemberId}
                setSelectedMemberId={setSelectedMemberId}
                artists={artists}
                setArtists={setArtists}
              />
            }
          />
          <Route
            path="/fanletter-detail"
            element={
              <FanLetterDetail
                selectedMemberId={selectedMemberId}
                setSelectedMemberId={setSelectedMemberId}
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
