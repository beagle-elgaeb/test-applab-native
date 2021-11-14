import React from "react";
import styled from "styled-components/native";
import logo from "../images/logo.png";

function Header() {
  return (
    <Container>
      <Logo accessibilityLabel="Logo" source={{ uri: `${logo}` }} />
    </Container>
  );
}

export default Header;

const Container = styled.View`
  width: 90%;
  height: 70px;
  margin: 10px 0 0 0;
`;

const Logo = styled.Image`
  width: 250px;
  height: 70px;
  display: block;
  margin: 0 auto;
`;
