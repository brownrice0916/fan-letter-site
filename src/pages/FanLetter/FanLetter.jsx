import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  StyledFanLetterCard,
  StyledForm,
  StyledIntro,
  StyledMembers,
  StyledMemberCard,
  StyledFanLetterWrap,
  StyledFanPage,
  StyledButton,
} from "./FanLetter.styled";
import Avatar from "components/Avatar";
import CustomButton from "components/CustomButton";

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

    const changedArtists = artists.map((artist) => {
      if (artist.id === currentArtist.id) {
        return {
          ...artist,
          fanLetters: [
            ...artist.fanLetters,
            {
              id: artist.fanLetters[artist.fanLetters.length - 1].id + 1,
              nickname,
              content,
              writedTo: selectedMember.name,
              createdAt: new Date(),
            },
          ],
        };
      } else {
        return artist;
      }
    });
    console.log(changedArtists);
    setArtists(changedArtists);

    e.target.nickname.value = "";
    e.target.content.value = "";

    // 선택된 멤버의 fanLetters 업데이트
  };

  return (
    <StyledFanPage>
      <StyledIntro img={currentArtist.img}>
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
              <div>
                <img src={member.img} alt={member.name} />
              </div>
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
        <div className="inputWrap">
          <label>닉네임:</label>
          <input type="text" name="nickname" />
        </div>
        <div className="inputWrap">
          <label>내용:</label>
          <textarea type="content" name="content" />
        </div>
        <div>
          {currentArtist && (
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
        <div className="btn_wrap">
          <CustomButton name="팬레터 등록" />
        </div>
      </StyledForm>
      <StyledFanLetterWrap>
        {selectedMember &&
          currentArtist.fanLetters
            .filter((fanLetter) => fanLetter.writedTo === selectedMember.name)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((fanLetter) => (
              <StyledFanLetterCard key={fanLetter.id}>
                <Link to={`/fanletterDetail/${fanLetter.id}`}>
                  <Avatar fanLetter={fanLetter}></Avatar>
                  <div className="contents">
                    <h3>{fanLetter.nickname}</h3>
                    <p>
                      {new Date(fanLetter.createdAt).toLocaleString("ko-KR")}
                    </p>
                    <p>{fanLetter.content}</p>
                  </div>
                </Link>
              </StyledFanLetterCard>
            ))}
      </StyledFanLetterWrap>
    </StyledFanPage>
  );
};

export default FanLetter;
