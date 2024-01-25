import React from "react";
import { useParams } from "react-router-dom";

const FanLetterDetail = ({ artists, selectedMember }) => {
  console.log("members", artists, selectedMember);
  const params = useParams();

  console.log(params.id);
  console.log("artists", selectedMember);
  const currentLetter = selectedMember.fanLetters.find((item) => {
    console.log(item.id, params.id);
    return item.id === params.id;
  });
  console.log("currentLetter", currentLetter);

  const handleEdit = () => {
    console.log("수정");
  };

  const handleDelete = () => {
    console.log("삭제");
  };

  return (
    <>
      <div>{currentLetter.nickname}</div>
      <div>{currentLetter.content}</div>
      <button onClick={handleEdit}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </>
  );
};

export default FanLetterDetail;
