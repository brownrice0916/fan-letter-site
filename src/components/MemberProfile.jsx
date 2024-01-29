import { StyledMemberCard } from "pages/FanLetter/FanLetter.styled";
import React from "react";

const MemberProfile = ({ member, selectedMember, setSelectedMember }) => {
  return (
    <StyledMemberCard
      key={member.id}
      $isSelected={selectedMember ? member.id === selectedMember.id : false}
      onClick={() => {
        setSelectedMember(member);
        // selectMember(member);
      }}
    >
      <div>
        <img src={member.img} alt={member.name} />
      </div>
      {member.name}
    </StyledMemberCard>
  );
};

export default React.memo(MemberProfile);
