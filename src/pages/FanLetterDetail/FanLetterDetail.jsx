import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StyledFanLetterDetailCard,
  StyledFanLetterDetailContainer,
} from "./FanLetterDetail.styled";
import Avatar from "components/Avatar";

const FanLetterDetail = ({ artists, setArtists, currentArtist }) => {
  const params = useParams();
  const navigate = useNavigate();

  const currentLetter = currentArtist.fanLetters.find((item) => {
    return item.id === parseInt(params.id);
  });

  const [letterContent, setLetterContent] = useState(currentLetter.content);

  const handleEdit = () => {
    console.log(letterContent);
    const newArtist = artists.map((artist) =>
      artist.id === currentArtist.id
        ? {
            ...artist,
            fanLetters: artist.fanLetters.map((letter) =>
              letter.id === parseInt(params.id)
                ? { ...letter, content: letterContent }
                : letter
            ),
          }
        : artist
    );
    console.log("newArtist", newArtist);
    setArtists(newArtist);
    navigate(`/fanletter/${currentArtist.id}`);
  };

  const handleDelete = () => {
    const newArtist = artists.map((artist) => {
      //console.log(artist, currentArtist);
      if (artist.id === currentArtist.id) {
        console.log(artist);
        return {
          ...artist,
          fanLetters: artist.fanLetters.filter(
            (fanLetter) => fanLetter.id !== parseInt(params.id)
          ),
        };
      }
      return artist;
    });

    setArtists(newArtist);

    navigate(`/fanletter/${currentArtist.id}`);
  };

  return (
    <StyledFanLetterDetailContainer>
      <StyledFanLetterDetailCard>
        <div className="writer_wrap">
          <div>
            <Avatar fanLetter={currentLetter} />
            <span>{currentLetter.nickname}</span>
          </div>
          <p>{new Date(currentLetter.createdAt).toLocaleString("ko-KR")}</p>
        </div>
        <p className="writed_to">To.{currentLetter.writedTo}</p>
        <textarea
          className="text_area"
          value={letterContent}
          type="content"
          name="content"
          onChange={(event) => {
            setLetterContent(event.target.value);
          }}
        ></textarea>
        <div className="btn_wrap">
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      </StyledFanLetterDetailCard>
    </StyledFanLetterDetailContainer>
  );
};

export default FanLetterDetail;
