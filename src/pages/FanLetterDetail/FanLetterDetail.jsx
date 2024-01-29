import React, { useCallback, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StyledCustomModal,
  StyledFanLetterDetailContainer,
} from "./FanLetterDetail.styled";

import FanLetterDetailCard from "components/FanLetterDetailCard";
import CustomButton from "components/CustomButton";
import CustomModal from "components/CustomModal";
import { SaveLocalStorage } from "common/common";

const FanLetterDetail = ({ artists, setArtists, currentArtist }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const currentLetter = useMemo(
    () =>
      currentArtist.fanLetters.find((item) => {
        return item.id === params.id;
      }),
    [currentArtist.fanLetters, params.id]
  );

  const [letterContent, setLetterContent] = useState(currentLetter.content);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const handleEditSuccess = useCallback(() => {
    if (currentLetter.content === letterContent) {
      alert("수정된 부분이 없습니다");
      setIsEditModalOpen(false);
      return;
    }
    const newArtist = artists.map((artist) =>
      artist.id === currentArtist.id
        ? {
            ...artist,
            fanLetters: artist.fanLetters.map((letter) =>
              letter.id === params.id
                ? { ...letter, content: letterContent }
                : letter
            ),
          }
        : artist
    );

    setArtists(newArtist);
    SaveLocalStorage(newArtist);
    navigate(`/fanletter?search=${currentArtist.name}`);
  }, [
    artists,
    currentArtist,
    letterContent,
    navigate,
    params.id,
    setArtists,
    currentLetter,
  ]);

  const handleDelete = useCallback(() => {
    const newArtist = artists.map((artist) => {
      //console.log(artist, currentArtist);
      if (artist.id === currentArtist.id) {
        console.log(artist);
        return {
          ...artist,
          fanLetters: artist.fanLetters.filter(
            (fanLetter) => fanLetter.id !== params.id
          ),
        };
      }
      return artist;
    });

    setArtists(newArtist);
    SaveLocalStorage("artists", newArtist);
    navigate(`/fanletter?search=${currentArtist.name}`);
  }, [artists, currentArtist, navigate, params.id, setArtists]);

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
