import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FanLetterDetail = ({
  artists,
  selectedMember,
  setArtists,
  currentArtist,
  setSelectedMember,
}) => {
  const params = useParams();
  const navigate = useNavigate();

  const currentLetter = selectedMember.fanLetters.find((item) => {
    return item.id === params.id;
  });

  const [letterContent, setLetterContent] = useState(currentLetter.content);

  const handleEdit = () => {
    const editedSelectedMember = selectedMember.fanLetters.map((letter) =>
      letter.id === params.id ? { ...letter, content: letterContent } : letter
    );

    const newArtist = artists.map((artist) =>
      artist.id === currentArtist.id
        ? {
            ...artist,
            members: artist.members.map((member) =>
              member.id === selectedMember.id
                ? { ...member, fanLetters: editedSelectedMember }
                : member
            ),
          }
        : artist
    );
    setArtists(newArtist);
    setSelectedMember({ ...selectedMember, fanLetters: editedSelectedMember });
    navigate(`/fanletter/${currentArtist.id}`);
  };

  const handleDelete = () => {
    const newArtist = artists.map((artist) => {
      console.log(artist, currentArtist);
      if (artist.id === currentArtist.id) {
        return {
          ...artist,
          members: artist.members.map((member) => {
            if (member.id === selectedMember.id) {
              return {
                ...member,
                fanLetters: member.fanLetters.filter(
                  (fanLetter) => fanLetter.id !== params.id
                ),
              };
            }
            return member;
          }),
        };
      }
      return artist;
    });

    setArtists(newArtist);
    setSelectedMember({
      ...selectedMember,
      fanLetters: selectedMember.fanLetters.filter(
        (fanLetter) => fanLetter.id !== params.id
      ),
    });
    navigate(`/fanletter/${currentArtist.id}`);
  };

  return (
    <>
      <div>{currentLetter.nickname}</div>
      <textarea
        onChange={(e) => setLetterContent(e.target.value)}
        value={letterContent}
        type="content"
        name="content"
      ></textarea>
      <button onClick={handleEdit}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </>
  );
};

export default FanLetterDetail;
