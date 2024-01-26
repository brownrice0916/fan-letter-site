import styled from "styled-components";

export const StyledFanPage = styled.section`
  background-color: #fff;
`;

export const StyledIntro = styled.section`
  background-image: url(${(props) => props.img});
  height: 350px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  > h1 {
    font-weight: 800;
    font-size: 2rem;
    color: #fff;
  }
`;

export const StyledMembers = styled.div`
  display: flex;
  > ul {
    display: flex;
    text-align: center;
    // justify-content: space-between;
    width: auto;
    margin: 0 auto;
    align-items: center;
  }
`;

export const StyledMemberCard = styled.li`
  width: 100px;
  height: 150px;
  border-radius: 100%;

  box-sizing: initial;

  cursor: pointer;
  overflow: hidden;
  margin: 10px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: ${(props) =>
      props.$isSelected ? "5px solid Yellow" : "5px solid #ededed"};
  }
`;

export const StyledForm = styled.form`
  margin: 0 auto;
  //text-align: center;
  padding: 20px;
  background-color: #ededed;

  width: 500px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  > div {
    margin-bottom: 20px;
  }
  > input[type="submit"] {
    cursor: pointer;
  }
`;

export const StyledFanLetterWrap = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StyledFanLetterCard = styled.li`
  border: 1px solid black;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 20px;
  /* background-color: pink; */
  border-radius: 5px;
  > a {
    display: flex;
    .imgWrap {
      flex: 1;
      img {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        margin-right: 20px;
      }
    }

    .contents {
      flex: 3;
      // background-color: black;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: center;
      > h3 {
        font-size: 1.2rem;
        margin-bottom: 20px;
      }
      > p:nth-child(3) {
        //font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: rgba(115, 203, 225, 0.5);

        margin-top: 20px;
        padding: 20px;
        border-radius: 10px;
      }
    }
  }
`;
