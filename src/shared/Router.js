import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import FanLetter from "../pages/FanLetter/FanLetter";
import FanLetterDetail from "../pages/FanLetterDetail/FanLetterDetail";
import { datas } from "./artists";
import { getLocalStorage, saveLocalStorage } from "common/common";
import { Provider } from "react-redux";
import store from "../redux/config/configStore";

const Router = () => {
  //const [artists, setArtists] = useState(datas);
  //const artists = useSelector((state) => state.artistsReducer);
  const [selectedMemberId, setSelectedMemberId] = useState();

  useEffect(() => {
    if (!getLocalStorage("artists")) {
      saveLocalStorage("artists", datas);
    } else {
    }
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout setSelectedMemberId={setSelectedMemberId}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/fanletter"
              element={
                <FanLetter
                  selectedMemberId={selectedMemberId}
                  setSelectedMemberId={setSelectedMemberId}
                />
              }
            />
            <Route path="/fanletter-detail" element={<FanLetterDetail />} />
          </Routes>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};

export default Router;
