import React,{useState} from 'react';
import { createGlobalStyle } from "styled-components";
import Router from './Router';
import {ReactQueryDevtools} from 'react-query/devtools'
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import {MdDarkMode, MdOutlineDarkMode} from "react-icons/md"
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from './routes/atom';

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
    font-family:Arial;
  }
  a {
    text-decoration:none;
    color:${(props) => props.theme.textColor};
  }
`;

const Mode = styled.button`
  border:none;
  background: none;
  position: fixed;
  top:10px;
  right: 10px;
  font-size: 30px;
  &:hover {
    cursor:pointer;
  }
  color: ${props => props.theme.textColor}
`

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev)

  return (
    <>
      <ThemeProvider theme = {isDark ? darkTheme : lightTheme}>
          <Mode onClick = {toggleDarkAtom}>
            {isDark ? <MdDarkMode/> : <MdOutlineDarkMode/>}
          </Mode>
          <GlobalStyle/>
          <Router />
          <ReactQueryDevtools initialIsOpen = {true}/>
      </ThemeProvider>
      
    </>
    
  );
}

export default App;

// required 여부 정하기 , 볼덜컬러가 있으면 사용 없으면 백그라운드 컬러 사용 