import React from 'react';
import {connect} from 'react-redux';
import EducatorRequestCheckin from './EducatorRequestCheckin';
import ResultsDisplay from './ResultsDisplay';
import io from 'socket.io-client';
import Navbar from './NavBarEducator';
import QuestionButton from './QuestionButton';
import * as actionCreators from '../../action_creators';
import _ from 'underscore';
import {toJS} from 'immutable';

export const Educator = React.createClass({
 componentDidMount: function() {
    if(this.props.currentRoom !== '') {
      this.props.stopVote();
    }
 },
 showQuestions: function() {
  let questions = this.props.questions.toJS();
  let allNames = []
  return questions.map(function(tuple, index) {
    return <div>{tuple[1]}</div>
  });
 },
 sharingAllThumbsCheckResults: function() {
   this.props.toggleSharingAllThumbsCheckResults();
 },
 render: function() {         
   console.log('on educator main', this.props); 
   return (
     <div>
       <Navbar {...this.props}/>          
        <div className="educator-container">
          <div className="center-text">
            <h4>Share this URL: <strong>{window.location.href.split('?')[0]}</strong>
              <br />Room Name: <strong>{this.props.currentRoom}</strong>
              <div><strong>{this.props.numUsers}</strong> device(s) currently in this room</div>
            </h4>
            {this.props.voting ?
              <ResultsDisplay ref="resultsDisplay" {...this.props} /> :
              <EducatorRequestCheckin {...this.props} />
            }
            
          </div>
       </div>
     </div>
   )
 }
});
