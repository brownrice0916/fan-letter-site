import React, { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { StyledIntro, StyledFanPage } from "./FanLetter.styled";
import FanLetterForm from "components/FanLetterForm";
import FanLetterCard from "components/FanLetterCard";
import MembersProfile from "components/MembersProfile";

const FanLetter = ({
  artists,
  setArtists,
  selectedMember,
  setSelectedMember,
  setCurrentArtist,
}) => {
  const params = useParams();

  const currentArtist = useMemo(
    () => artists.find((item) => item.id === parseInt(params.id)),
    [artists, params.id]
  );

  useEffect(() => {
    setCurrentArtist(artists.find((item) => item.id === parseInt(params.id)));
    setSelectedMember((prev) => (prev ? prev : currentArtist.members[0]));
  }, [currentArtist, setSelectedMember, setCurrentArtist, params.id, artists]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const nickname = e.target.nickname.value;
      const content = e.target.content.value;

      if (nickname === "" || content === "") {
        alert("닉네임과 내용은 필수 입력값입니다");
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
      setArtists(changedArtists);

      e.target.nickname.value = "";
      e.target.content.value = "";

      // 선택된 멤버의 fanLetters 업데이트
    },
    [artists, currentArtist, selectedMember, setArtists]
  );

  return (
    <StyledFanPage>
      <StyledIntro img={currentArtist.img}>
        <h1>{currentArtist.name}</h1>
      </StyledIntro>
      <MembersProfile
        currentArtist={currentArtist}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
      <FanLetterForm
        handleSubmit={handleSubmit}
        currentArtist={currentArtist}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />

      <FanLetterCard
        selectedMember={selectedMember}
        currentArtist={currentArtist}
      />
    </StyledFanPage>
  );
};

export default FanLetter;
