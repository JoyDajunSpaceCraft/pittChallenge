
import tw from "twin.macro";
import { Link, useHistory } from 'react-router-dom';
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import React, { useState, useEffect } from "react";
import Header, { NavLink, NavLinks, PrimaryLink, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";
import { sendRequest, getCookie } from "../../util";
const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover`}
  background-image: url("https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-primary-500 opacity-25`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`flex flex-col items-center lg:block`;
const RightColumn = tw.div`w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`;

const Heading = styled.h1`
  ${tw`text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-primary-500 px-4 -mx-4 py-2`}
  &::before {
    content: "";
    ${tw`absolute inset-0 bg-gray-100 transform -skew-x-12 -z-10`}
  }
`;

const Notification = tw.span`inline-block my-3 pl-1 py-1 text-gray-100 border-l-4 border-green-500 font-medium text-sm`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 text-primary-500 font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;

const StyledResponsiveVideoEmbed = styled(ResponsiveVideoEmbed)`
  padding-bottom: 56.25% !important;
  padding-top: 0px !important;
  ${tw`rounded`}
  iframe {
    ${tw`rounded bg-black shadow-xl`}
  }
`;

export default ({  
  vis,
  history  = useHistory(),
  signUpUrl = `/components/innerPages/SignUpPage`,
}) => {
  
  const [realname, setRealname] = useState('');
  const [uid, setUid] = useState(null);
  const [navLinks, setNavLinks] = useState([
    <NavLinks key={1}>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/quiz">Test</NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink css={tw`rounded-full`} href="result">My Result</PrimaryLink>
    </NavLinks>
  ]);

  useEffect(() => {
    const fetchAdmin = async () => {
      const uid = getCookie('userid');
      if(!uid) {
        history.push('/signin');
        return;
      }
      const res = JSON.parse(await sendRequest('admin', { uid: uid }));
      if(!res.success) {
        history.push('/error');
        return;
      }
      const {realname} = res;
      setRealname(realname);
      setUid(uid);
      if (realname) {
        setNavLinks([
          <NavLinks key={1}>
            <NavLink href="#">Home</NavLink>
            <NavLink href="/quiz">Test</NavLink>
            <NavLink>Welcome {realname}</NavLink>
            <PrimaryLink css={tw`rounded-full`} href="result">My Result</PrimaryLink>
          </NavLinks>
        ]);
      }
    };
    fetchAdmin();
  }, []);

  const fetchLanding =() => {
    const uid = getCookie('userid');
    if(!uid) {
      history.push('/signin');
      return;
    }else{
      history.push('/quiz');
    }
  }

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <TwoColumn>
          <LeftColumn>
            <Notification>We have recently updated our test question bank</Notification>
            <Heading>
              <span>During pandemic</span>
              <br />
              <SlantedBackground>Always with you</SlantedBackground>
            </Heading>
            <PrimaryAction onClick={fetchLanding}>Start a test with us</PrimaryAction>
          </LeftColumn>
          <RightColumn>
            <StyledResponsiveVideoEmbed
              url="https://player.vimeo.com/video/336300875?title=0&portrait=0&byline=0&autoplay=1&loop=1&transparent=1"
              background="transparent"
            />
          </RightColumn>
        </TwoColumn>
      </HeroContainer>
    </Container>
  );
};
