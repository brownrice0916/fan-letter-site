import styled from "styled-components";

export const StyledFanLetterDetailContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  //position: relative;
`;

export const StyledFanLetterDetailCard = styled.div`
  min-height: 500px;
  min-width: 700px;
  padding: 20px;
  //transform: translateY(-50%);
  background-color: #fff;
  border: 1px solid black;
  border-radius: 20px;
  .writer_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      > span {
        margin-left: 10px;
        font-size: 1.5rem;
      }
    }
  }
  .writed_to {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .text_area {
    width: 100%;
    height: 200px;
  }
`;
