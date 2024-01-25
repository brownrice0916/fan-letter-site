import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  StyledFanLetterCard,
  StyledForm,
  StyledIntro,
  StyledMembers,
  StyledMemberCard,
  StyledFanLetterWrap,
} from "./FanLetter.styled";
import { v4 as uuidv4 } from "uuid";

const FanLetter = ({
  artists,
  setArtists,
  selectedMember,
  setSelectedMember,
  setCurrentArtist,
}) => {
  const params = useParams();

  const currentArtist = artists.find((item) => item.id === parseInt(params.id));

  useEffect(() => {
    setCurrentArtist(artists.find((item) => item.id === parseInt(params.id)));
    setSelectedMember((prev) => (prev ? prev : currentArtist.members[0]));
  }, [currentArtist, setSelectedMember, setCurrentArtist, params.id, artists]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const nickname = e.target.nickname.value;
    const content = e.target.content.value;

    if (nickname === "" || content === "") {
      return;
    }
    const addedLetters = { nickname, content, id: uuidv4(), date: new Date() };
    const changedArtists = artists.map((artist) =>
      artist.id === currentArtist.id
        ? {
            ...artist,
            members: artist.members.map((member) =>
              member.id === selectedMember.id
                ? {
                    ...member,
                    fanLetters: [...member.fanLetters, addedLetters],
                  }
                : member
            ),
          }
        : artist
    );
    setArtists(changedArtists);
    setSelectedMember({
      ...selectedMember,
      fanLetters: [...selectedMember.fanLetters, addedLetters],
    });
    e.target.nickname.value = "";
    e.target.content.value = "";

    // 선택된 멤버의 fanLetters 업데이트
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
          {currentArtist.length > 0 && (
            <p>
              누구에게 보내실 건가요?{" "}
              <span>
                <select
                  name="recipient"
                  value={selectedMember ? selectedMember.id : 0}
                  onChange={(e) => {
                    const selectedMemberId = parseInt(e.target.value);
                    const selectedMember = currentArtist.members.find(
                      (member) => member.id === selectedMemberId
                    );
                    setSelectedMember(selectedMember);
                  }}
                >
                  {currentArtist.members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          )}
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
