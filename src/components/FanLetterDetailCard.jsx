import { StyledFanLetterDetailCard } from "pages/FanLetterDetail/FanLetterDetail.styled";
import React from "react";
import Avatar from "./Avatar";
import CustomButton from "./CustomButton";

const FanLetterDetailCard = ({
  currentLetter,
  isEditing,
  letterContent,
  setLetterContent,
  openDeleteModal,
  handleEdit,
  openEditModal,
}) => {
  return (
    <StyledFanLetterDetailCard>
      <div className="writer_wrap">
        <div>
          <Avatar fanLetter={currentLetter} />
          <span>{currentLetter.nickname}</span>
        </div>
        <p>{new Date(currentLetter.createdAt).toLocaleString("ko-KR")}</p>
      </div>
      <p className="writed_to">To.{currentLetter.writedTo}</p>
      {!isEditing ? (
        <article>{letterContent}</article>
      ) : (
        <textarea
          className="text_area"
          value={letterContent}
          type="content"
          name="content"
          onChange={(event) => {
            setLetterContent(event.target.value);
          }}
        ></textarea>
      )}
      <div className="btn_wrap">
        {!isEditing && <CustomButton onClick={openDeleteModal} name="삭제" />}
        {!isEditing && <CustomButton onClick={handleEdit} name="수정" />}
        {isEditing && <CustomButton onClick={openEditModal} name="수정완료" />}
      </div>
    </StyledFanLetterDetailCard>
  );
};

export default React.memo(FanLetterDetailCard);
