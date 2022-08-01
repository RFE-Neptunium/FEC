import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RatingsReviews from './RatingsReviews/RatingsReviews';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedItems from './related-items/related-items';
import Overview from './product-details/Overview';
import TopBar from './TopBar/TopBar';
import BotBar from './TopBar/BotBar';
import { CurrentProductProvider } from './context';
import { QuestionListProvider } from './QuestionsAnswers/contexts/QuestionListContext';

function App() {
 /* const ratingsRef = useRef();
  const topRef = useRef();
  const qaRef = useRef(); */
  const pdRef = useRef();
  //const riRef = useRef();
  const refs = [/*ratingsRef, topRef, qaRef,*/ pdRef/*, riRef*/];
  //const [clicks, setClicks] = useState([]);

  /*const sendInteraction = (click) => {
    axios.post(`${process.env.API_URL}/interactions`, click, {
      headers: {
        Authorization: process.env.AUTH_KEY,
      },
    })
      .then((res) => {
        console.log('success posting interaction', res);
      })
      .catch((err) => console.log('error posting interaction', err));
  };

  useEffect(() => {
    window.onclick = (event) => {
      for (let i = 0; i < refs.length; i++) {
        const currentRef = refs[i];
        if (currentRef.current.contains(event.target)
          || event.target === currentRef.current) {
          const clickBody = {
            widget: currentRef.current.id,
            time: new Date().toLocaleString(),
            element: event.target.innerHTML,
          };
          // line below stores clicks to state, useful for debugging
          setClicks((oldClicks) => [...oldClicks, clickBody]);
          sendInteraction(clickBody); // sends axios post call
          break; // no need to check the rest
        }
      }
    };
  }, []);*/

  return (
    <MainDiv>
      <CurrentProductProvider>
        <Overview /*ratingsRef={ratingsRef}*/ ref={pdRef} />
      </CurrentProductProvider>
    </MainDiv>
  );
}

/*
<TopBar ratingsRef={ratingsRef} ref={topRef} qaRef={qaRef} pdRef={pdRef} riRef={riRef} /> <QuestionListProvider>
<RelatedItems ref={riRef} />
          <QuestionsAnswers ref={qaRef} />
        </QuestionListProvider>
        <RatingsReviews ref={ratingsRef} />
        <BotBar /> */

const MainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export default App;
