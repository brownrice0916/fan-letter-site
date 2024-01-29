import React, { useCallback, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StyledFanLetterDetailContainer } from "./FanLetterDetail.styled";

import FanLetterDetailCard from "components/FanLetterDetailCard";

const FanLetterDetail = ({ artists, setArtists, currentArtist }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const currentLetter = useMemo(
    () =>
      currentArtist.fanLetters.find((item) => {
        return item.id === parseInt(params.id);
      }),
    [currentArtist.fanLetters, params.id]
  );

  const [letterContent, setLetterContent] = useState(currentLetter.content);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const handleEditSuccess = useCallback(() => {
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
    setArtists(newArtist);
    navigate(`/fanletter/${currentArtist.id}`);
  }, [artists, currentArtist, letterContent, navigate, params.id, setArtists]);

  const handleDelete = useCallback(() => {
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
  }, [artists, currentArtist, navigate, params.id, setArtists]);

  return (
    <StyledFanLetterDetailContainer>
      <FanLetterDetailCard
        currentLetter={currentLetter}
        isEditing={isEditing}
        letterContent={letterContent}
        setLetterContent={setLetterContent}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleEditSuccess={handleEditSuccess}
      />
    </StyledFanLetterDetailContainer>
  );
};

export default FanLetterDetail;
