/**
*
* BotComponent
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';

import BotHeaderContainer from '../../containers/BotHeaderContainer/';
import UserInputContainer from '../../containers/UserInputContainer/';
import Conversation from '../Conversation';

function BotComponent(props) {
  let activeClassName = '';
  if (props.active) {
    activeClassName = 'is-active';
  }

  let sizeClass = 'is-large';
  if (props.expanded) {
    sizeClass = 'is-mini';
  }

  return (
    // the parent container holding all ux elements
    <section className={'theParentContainer'}>
      {/* header container containing the logo */}
      <BotHeaderContainer />
      {/* the chat section */}
      <section className={`qt-frame ${activeClassName}`}>
        {/* left black section */}
        <section className={`left-side-black ${sizeClass} ${activeClassName}`}>

          <div className={'leftSideTextContainer'}>
            <div className={'leftSideText'}>EXIT</div>
            <div className={'leftSideText leftLargeText'}>This is a fun headline.</div>
            <div className={'leftSideText'}>Intro copy that will help users navigate this experience.</div>
            <ul className={'leftSideText'}>
              <li className={'leftList'}>Human Profile</li>
              <li className={'leftList'}>Pet Profile</li>
              <li className={'leftList'}>Details</li>
            </ul>
          </div>
        </section>
        <section className={`qt-chat ${sizeClass} ${activeClassName}`}>
          {/* the conversation component receiving props */}
          <Conversation
            conversation={props.conversation}
            userName={props.userName}
            companyName={props.companyName}
            botThinking={props.botThinking}
          />
          {/* the input from user */}
          <UserInputContainer />
        </section>
      </section>
    </section>

  );
}

BotComponent.propTypes = {
  active: PropTypes.bool.isRequired,
  companyName: PropTypes.string,
  conversation: PropTypes.array.isRequired,
  userName: PropTypes.string,
  botThinking: PropTypes.bool,
  expanded: PropTypes.bool,
};

BotComponent.defaultProps = {
  companyName: '',
  userName: '',
  botThinking: false,
  expanded: false,
};

export default BotComponent;
