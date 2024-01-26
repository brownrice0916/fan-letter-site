import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <>
      <div>{currentLetter.nickname}</div>
      <textarea
        value={letterContent}
        type="content"
        name="content"
        onChange={(event) => {
          setLetterContent(event.target.value);
        }}
      ></textarea>
      <button onClick={handleEdit}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </>
  );
};

export default FanLetterDetail;
