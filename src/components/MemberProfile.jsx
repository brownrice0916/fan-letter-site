import { ArtistContext } from "contexts/ArtistsContext";
import { StyledMemberCard } from "pages/FanLetter/FanLetter.styled";
import React, { useContext } from "react";

const MemberProfile = ({ member, selectedMember }) => {
  const setSelectedMemberId = useContext(ArtistContext).setSelectedMemberId;
  return (
    <StyledMemberCard
      key={member.id}
      $isSelected={selectedMember ? member.id === selectedMember.id : false}
      onClick={() => {
        setSelectedMemberId(member.id);
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
