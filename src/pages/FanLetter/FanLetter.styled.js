import styled from "styled-components";

export const StyledIntro = styled.section`
  background-color: pink;
  height: 300px;
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
  height: 100px;
  border-radius: 100%;
  background-color: ${(props) => (props.$isSelected ? "yellow" : "gray")};
  cursor: pointer;
  margin: 10px;
`;

export const StyledForm = styled.form`
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background-color: #ededed;
  margin-top: 20px;
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
`;
