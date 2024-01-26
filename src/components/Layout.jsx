import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLayout = styled.div`
  background-color: #ededed;
  height: 100vh;
`;
const StyledHeader = styled.header`
  height: 80px;
  background-color: #fff;
  padding: 12px;
  display: flex;
  align-items: center;
  > h1 {
    cursor: pointer;
  }
  > a {
    text-decoration: none;
    color: rgb(115, 203, 225);
    font-weight: 800;
    font-size: 2rem;
  }
`;

const StyledFooter = styled.footer`
  height: 80px;
  /* background-color: orange; */
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Layout = ({ children, setSelectedMember }) => {
  return (
    <StyledLayout>
      <StyledHeader>
        <Link to="/" onClick={() => setSelectedMember("")}>
          Fan Letter
        </Link>
      </StyledHeader>
      {children}
      <StyledFooter>© SSAL COMPANY</StyledFooter>
    </StyledLayout>
  );
};

export default Layout;
