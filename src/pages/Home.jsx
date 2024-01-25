import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { artists } from "../shared/artists";

const StyledIntro = styled.section`
  background-color: pink;
  height: 300px;
`;

const StyledArtistList = styled.section`
  background-color: yellow;
  height: auto;
  > h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  > ul {
    display: flex;
    > li {
      flex: 1;
      height: 200px;
      border: 1px solid black;
      cursor: pointer;
    }
  }
`;

const moveToFanPage = (id) => {};

const Home = () => {
  return (
    <>
      <StyledIntro>
        <h1>최애에게 편지를 보내보아요</h1>
      </StyledIntro>
      <StyledArtistList>
        <h1>아티스트리스트</h1>
        <ul>
          {artists.map((item) => (
            <li onClick={moveToFanPage} key={item.id}>
              <Link to={`/fanletter/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </StyledArtistList>
    </>
  );
};

export default Home;
