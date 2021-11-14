import React from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";
const myGitHub = "https://github.com/beagle-elgaeb";

function Footer() {
  return (
    <Container>
      <Copyright
        accessibilityRole="link"
        onPress={() => Linking.openURL(myGitHub)}
        aria-label="Моя страница на GitHub"
      >
        &#169; Евгения Никонова
      </Copyright>
    </Container>
  );
}

export default Footer;

const Container = styled.View`
  width: 90%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Copyright = styled.Text`
  font-size: 14px;
  line-height: 16px;
  font-weight: 300;
  font-style: italic;
  text-decoration: none;
  color: #73037d;
  margin: 0;
`;
