import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header, { LogoLink, NavLinks, NavLink as NavLinkBase } from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const NavLink = tw(NavLinkBase)`
  sm:text-sm sm:mx-6
`;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = styled.div`
  background-image: url("https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&width=1440&height=1024&q=75");
  ${tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-lg lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
`;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const result = urlParams.get('result')
let finalResult = 0
if (result <30) {
  finalResult = 1
}
else if(result <45 && result > 30) {
  finalResult = 2
}
else {
  finalResult  = 3
}

console.log(finalResult)
export default ({
  navLinks = [
    <NavLinks key={1}>
      <NavLink href="#">About</NavLink>
      <NavLink href="#">Blog</NavLink>
      <NavLink href="#">Pricing</NavLink>
      <NavLink href="#">Login</NavLink>
    </NavLinks>
  ],
  // heading = (finalResult==1)?():(()?():()),
  // heading2  = (),
  heading = (
    <>
    No Worries
      <wbr />
      <br />
      <span tw="text-primary-500">We are here to help.</span>
    </>
  ),
  description1 = "You may currently be in a moderate state of depression.",
  description2 = "In the near future, you may be prone to feeling sad, upset, or some unexplained anxiety. You can only feel pleasure if \
  something really exciting and happy happens, but the pleasure lasts much shorter than before.",
  description3 = "Things that used to be fun and colorful seem to have faded recently. You have some trouble getting up to do something. If you have been criticized or had a little trouble at work or school. If you are criticized or have a little trouble at work or school, you are more likely to doubt yourself, \
and sometimes you feel that reality is really powerless.",
  primaryActionUrl = "",
  primaryActionText = "Sign Up",
  secondaryActionUrl = "#",
  secondaryActionText = "Search Hotels"
}) => {
  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <StyledHeader links={navLinks} collapseBreakpointClass="sm" />
          <Content>
            <Heading>{heading}</Heading>
            finalResult == 1?
           (<Paragraph>{description1}</Paragraph>):(finalResult == 2? <Paragraph>{description2}</Paragraph>:<Paragraph>{description3}</Paragraph>)
    
            <Actions>
              <a href={primaryActionUrl} className="action primaryAction">
                {primaryActionText} 
              </a>
              <a href={secondaryActionUrl} className="action secondaryAction">
                {secondaryActionText}
              </a>
            </Actions>
          </Content>
        </LeftColumn>
        <RightColumn></RightColumn>
      </TwoColumn>
    </Container>
  );
};
