import React from 'react';
import {List,Map} from 'immutable';

export default React.createClass({
  showQuestionChoices: function() {
    let questionChoices = this.props.currentPresentation.getIn(['currentQuestion','questionChoices']);
    if (questionChoices) {
      questionChoices = questionChoices.toJS();
      return questionChoices.map((choice) => {
        return <div key={choice[0]}>{choice[0]}: {choice[1]}</div>
      });      
    }
  },
  renderProperQuestionTitle: function() {
    let currentQuestionTitle = this.props.currentPresentation.getIn(['currentQuestion', 'prompt']);
    let previousQuestionTitle = this.props.justVoted ? currentQuestionTitle : this.props.currentPresentation.getIn(['previousQuestion', 'prompt']);
    if (this.props.voting) {
      return (
        <h1>{currentQuestionTitle}</h1>
      )
    } else if (this.props.shareThumbsCheckResults || this.props.sharingAllThumbsCheckResults && previousPresentationTitle) {
      return (
        <h1>{previousQuestionTitle}</h1>
      )
    } else {
      return null;
    }
  },
  renderProperQuestionOptions: function() {
    let currentQuestionOptions = this.props.currentPresentation.getIn(['currentQuestion', 'questionChoices']);
    let previousQuestionOptions = this.props.justVoted ? currentQuestionOptions : this.props.currentPresentation.getIn(['previousQuestion', 'questionChoices']);
    if (this.props.voting) {
      if (currentQuestionOptions) {
        currentQuestionOptions = currentQuestionOptions.toJS();
        return currentQuestionOptions.map((choice) => {
          return <div key={choice[0]}>{choice[0]}: {choice[1]}</div>
        });
      }
    } else if ((this.props.shareThumbsCheckResults || this.props.sharingAllThumbsCheckResults && previousPresentationTitle)) {
      if (previousQuestionOptions) {
        previousQuestionOptions = previousQuestionOptions.toJS();
        return previousQuestionOptions.map((choice) => {
          return <div key={choice[0]}>{choice[0]}: {choice[1]}</div>
        });
      }
    } else {
      return null;
    }
  },
  render: function() {
    return (
      <div>
        {this.renderProperQuestionTitle()}
        {this.renderProperQuestionOptions()}
      </div>
    );
  }
});
