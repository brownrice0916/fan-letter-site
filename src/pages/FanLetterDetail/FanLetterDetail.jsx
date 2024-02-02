import React, { useCallback, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StyledFanLetterDetailContainer } from "./FanLetterDetail.styled";

import FanLetterDetailCard from "components/FanLetterDetailCard";
import CustomModal from "components/CustomModal";
import { saveLocalStorage } from "common/common";

const FanLetterDetail = ({ artists, setArtists }) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const artistName = queryParams.get("search");

  const fanLetterId = queryParams.get("fanLetterId");

  const currentArtist = useMemo(
    () => artists.find((item) => item.name === artistName),
    [artists, artistName]
  );

  const currentLetter = useMemo(
    () =>
      currentArtist.fanLetters.find((fanLetter) => {
        return fanLetter.id === fanLetterId;
      }),
    [currentArtist.fanLetters, fanLetterId]
  );

  const [letterContent, setLetterContent] = useState(
    currentLetter?.content || ""
  );

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const handleEditSuccess = useCallback(() => {
    if (currentLetter.content === letterContent) {
      alert("수정된 부분이 없습니다");
      setIsEditModalOpen(false);
      return;
    }
    const changedArtists = artists.map((artist) =>
      artist.id === currentArtist.id
        ? {
            ...artist,
            fanLetters: artist.fanLetters.map((letter) =>
              letter.id === fanLetterId
                ? { ...letter, content: letterContent }
                : letter
            ),
          }
        : artist
    );

    setArtists(changedArtists);
    saveLocalStorage(changedArtists);
    navigate(`/fanletter?search=${currentArtist.name}`);
  }, [
    artists,
    currentArtist,
    letterContent,
    navigate,
    setArtists,
    currentLetter,
    fanLetterId,
  ]);

  const handleDelete = useCallback(() => {
    const changedArtists = artists.map((artist) => {
      //console.log(artist, currentArtist);
      if (artist.id === currentArtist.id) {
        console.log(artist);
        return {
          ...artist,
          fanLetters: artist.fanLetters.filter(
            (fanLetter) => fanLetter.id !== fanLetterId
          ),
        };
      }
      return artist;
    });

    setArtists(changedArtists);
    saveLocalStorage("artists", changedArtists);
    navigate(`/fanletter?search=${currentArtist.name}`);
  }, [artists, currentArtist, navigate, fanLetterId, setArtists]);

  const openDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, [setIsDeleteModalOpen]);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, [setIsDeleteModalOpen]);

  const openEditModal = useCallback(() => {
    setIsEditModalOpen(true);
  }, [setIsEditModalOpen]);
  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, [setIsEditModalOpen]);

  return (
    <>
      <StyledFanLetterDetailContainer>
        <FanLetterDetailCard
          currentLetter={currentLetter}
          isEditing={isEditing}
          letterContent={letterContent}
          setLetterContent={setLetterContent}
          openDeleteModal={openDeleteModal}
          handleEdit={handleEdit}
          openEditModal={openEditModal}
          isEditModalOpen={isEditModalOpen}
        />
        {isDeleteModalOpen && (
          <CustomModal
            type="삭제"
            handleYes={handleDelete}
            handleNo={closeDeleteModal}
          />
        )}
        {isEditModalOpen && (
          <CustomModal
            type="수정"
            handleYes={handleEditSuccess}
            handleNo={closeEditModal}
          />
        )}
      </StyledFanLetterDetailContainer>
    </>
  );
};

export default FanLetterDetail;
