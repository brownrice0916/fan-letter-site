import {
  StyledFanLetterCard,
  StyledFanLetterWrap,
} from "pages/FanLetter/FanLetter.styled";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const FanLetterCard = ({ selectedMember, currentArtist }) => {
  return (
    <StyledFanLetterWrap>
      {selectedMember &&
        currentArtist.fanLetters
          .filter((fanLetter) => fanLetter.writedTo === selectedMember.name)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((fanLetter) => (
            <StyledFanLetterCard key={fanLetter.id}>
              <Link to={`/fanletterDetail/${fanLetter.id}`}>
                <Avatar fanLetter={fanLetter}></Avatar>
                <div className="contents">
                  <h3>{fanLetter.nickname}</h3>
                  <p>{new Date(fanLetter.createdAt).toLocaleString("ko-KR")}</p>
                  <p>{fanLetter.content}</p>
                </div>
              </Link>
            </StyledFanLetterCard>
          ))}
    </StyledFanLetterWrap>
  );
};

export default React.memo(FanLetterCard);
