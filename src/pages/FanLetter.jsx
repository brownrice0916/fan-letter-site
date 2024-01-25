import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { datas } from "../shared/artists";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const StyledIntro = styled.section`
  background-color: pink;
  height: 300px;
`;

const StyledMembers = styled.div`
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

const StyledMemberCard = styled.li`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: ${(props) => (props.$isSelected ? "yellow" : "gray")};
  cursor: pointer;
`;

const StyledForm = styled.form`
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

const StyledFanLetterWrap = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledFanLetterCard = styled.li`
  border: 1px solid black;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 20px;
`;
const FanLetter = ({
  artists,
  setArtists,
  selectedMember,
  setSelectedMember,
}) => {
  const params = useParams();

  console.log("artists", artists);
  const currentArtist = artists.find((item) => item.id === parseInt(params.id));

  useEffect(() => {
    setSelectedMember(currentArtist.members[0]);
  }, []);
  console.log("foundData", currentArtist);
  const handleSubmit = (e) => {
    e.preventDefault();

    const nickname = e.target.nickname.value;
    const content = e.target.content.value;
    const changedMembers = artists.map((member) => {
      if (member.id === selectedMember.id) {
        // 선택된 멤버의 경우 fanLetters를 업데이트한 새로운 객체를 반환
        return {
          ...member,
          fanLetters: [
            ...member.fanLetters,
            { nickname, content, id: uuidv4(), date: new Date() },
          ],
        };
      }
      return member; // 선택되지 않은 멤버는 그대로 반환
    });
    setArtists(changedMembers);
    //setFanLetters([...fanLetters, { title, content }]);

    // 선택된 멤버의 fanLetters 업데이트
    const updatedSelectedMember = changedMembers.find(
      (member) => member.id === selectedMember.id
    );
    setSelectedMember(updatedSelectedMember);
  };

  return (
    <>
      <StyledIntro>
        <h1>{currentArtist.name}</h1>
      </StyledIntro>

      <StyledMembers>
        <ul>
          {currentArtist.members.map((member) => (
            <StyledMemberCard
              key={member.id}
              $isSelected={
                selectedMember ? member.id === selectedMember.id : false
              }
              onClick={() => {
                setSelectedMember(member);
                // selectMember(member);
              }}
            >
              {member.name}
            </StyledMemberCard>
          ))}
        </ul>
      </StyledMembers>
      <StyledForm
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>제목</label>
          <input type="text" name="nickname" />
        </div>
        <div>
          <label>내용</label>
          <textarea type="content" name="content" />
        </div>
        <div>
          <p>
            누구에게 보내실 건가요?{" "}
            <span>
              <select
                name="recipient"
                value={selectedMember ? selectedMember.id : 0}
                onChange={(e) => {
                  const selectedMemberId = parseInt(e.target.value);
                  const selectedMember = artists.find(
                    (member) => member.id === selectedMemberId
                  );
                  setSelectedMember(selectedMember);
                }}
              >
                {artists.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </span>
          </p>
        </div>
        <input type="submit" value="등록" />
      </StyledForm>
      <StyledFanLetterWrap>
        {selectedMember &&
          selectedMember.fanLetters.map((fanLetter) => (
            <StyledFanLetterCard key={fanLetter.id}>
              <Link to={`/fanletterDetail/${fanLetter.id}`}>
                <h3>{fanLetter.nickname}</h3>
                <p>{fanLetter.content}</p>
                <p>{fanLetter.date.toLocaleString("ko-KR")}</p>
              </Link>
            </StyledFanLetterCard>
          ))}
      </StyledFanLetterWrap>
    </>
  );
};

export default FanLetter;
