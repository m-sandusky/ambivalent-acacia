import React from 'react';
import {toJS} from 'immutable';
import LoginPage from './loggedin/LoginPage';
import SignupPage from './loggedin/SignupPage';

export default React.createClass({
  chooseTeacher: function () {
    this.props.chooseRole('teacher');
  },

  chooseStudent: function () {
    this.props.chooseRole('');
  },

  chooseSignup: function () {
    this.props.chooseRole('signup');
  },

  handleStudentSubmit: function (e) {
    e.preventDefault();
    const inputValue = this.studentInput.value.toLowerCase();
    const that = this;

    if (inputValue === 'room' || inputValue === 'login' ) {
      this.props.setError('Room not found. Please enter a valid.');
    } else if (!inputValue) {
      this.props.setError('Please enter a room name.');
    } else {
      $.ajax({
        type: 'POST',
        url: '/'+inputValue,
      })
      .success(function(data) {
        if (data) {
          window.location.assign(inputValue);
        } else {
          that.props.setError('Room not found. Please try again.');
        }
      });
    }
  },

  handleCreateRoom: function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/room',
    })
    .success(function(data) {
      window.location.assign(data);
    });
  },

  handleEnter: function (e){
    if (e.keyCode == 13){
      this.handleStudentSubmit(e);
    }
  },

  renderProperElement: function () {
    if(this.props.choice === 'teacher') {
      return (
        <div>
          <p><a className="btn btn-primary btn-md" onClick={this.handleCreateRoom} role="button">Create a lecture room</a></p>
          <LoginPage {...this.props} />
          <p>Don&#39;t have an account yet? <a className="btn btn-primary btn-md" role="button" onClick={this.chooseSignup} >Sign Up</a></p>
          <a className="btn btn-warning btn-md" role="button" onClick={this.chooseStudent} >I&#39;m a Student</a>
        </div>
      )
    } else if(this.props.choice === 'signup') {
      return (
        <div>
          <SignupPage {...this.props} />
          <p>Already have an account? <a className="btn btn-primary btn-md" role="button" onClick={this.chooseTeacher} >Log In</a></p>
          <a className="btn btn-warning btn-md" role="button" onClick={this.chooseStudent} >I&#39;m a Student</a>
        </div>
      )
    } else {
      return (
        <div>
          <p>Join existing room <input ref={(ref) => this.studentInput = ref} onKeyDown ={this.handleEnter} /> <a className="btn btn-primary btn-md" role="button" onClick={this.handleStudentSubmit} >Join</a></p>
          <p>{this.props.errMessage}</p>
          <a className="btn btn-warning btn-md" role="button" onClick={this.chooseTeacher} >I&#39;m an Educator</a>
        </div>
      )
    }
  },

  render: function() {
    return (
      <div>
        {this.renderProperElement()}
      </div>
    )
  }
});
