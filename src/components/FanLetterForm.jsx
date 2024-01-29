import React from "react";
import { StyledForm } from "pages/FanLetter/FanLetter.styled";
import CustomButton from "./CustomButton";

const FanLetterForm = ({
  handleSubmit,
  currentArtist,
  selectedMember,
  setSelectedMember,
}) => {
  return (
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
  );
};

export default React.memo(FanLetterForm);
