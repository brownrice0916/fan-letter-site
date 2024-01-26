import { Link } from "react-router-dom";
import styled from "styled-components";
import { datas } from "../shared/artists";

const StyledIntro = styled.section`
  background-color: black;
  height: 300px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 30px;
`;

const StyledArtistList = styled.section`
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  > h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  > ul {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    > li {
      flex: 1;
      height: 250px;
      max-width: 300px;
      // border: 1px solid black;
      background-color: #fff;
      cursor: pointer;
      margin: 10px;
      border-radius: 10px;
      box-shadow: 10px 14px 5px 0px rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: 10px 14px 5px 0px rgba(0, 0, 0, 0.1);
      -moz-box-shadow: 10px 14px 5px 0px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      // overflow: hidden;
      a > div {
        //overflow: hidden;
        // border-radius: 10px;
      }
      a > p {
        color: black;
        font-size: 1.3rem;
        margin-top: 10px;
        text-align: center;
        font-weight: 700;
      }
      img {
        width: 100%;
      }
    }
  }
`;

const Home = () => {
  return (
    <>
      <StyledIntro>
        <h1>최애에게 편지를 보내보아요</h1>
      </StyledIntro>
      <StyledArtistList>
        <h1>Artists</h1>
        <ul>
          {datas.map((item) => (
            <li key={item.id}>
              <Link to={`/fanletter/${item.id}`}>
                <div>
                  <img src={item.img} alt="뉴진스" />
                </div>
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </StyledArtistList>
    </>
  );
};

export default Home;
