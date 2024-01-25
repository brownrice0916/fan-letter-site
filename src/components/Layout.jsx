import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  height: 80px;
  background-color: aqua;
  padding: 12px;
  display: flex;
  align-items: center;
`;

const StyledFooter = styled.footer`
  height: 80px;
  background-color: orange;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout = ({ children }) => {
  return (
    <div>
      <StyledHeader>
        <h1>header</h1>
      </StyledHeader>
      {children}
      <StyledFooter>푸터임</StyledFooter>
    </div>
  );
};

export default Layout;
