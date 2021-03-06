import React from 'react';
import {toJS} from 'immutable';

export default React.createClass({
  createNewPresentationTitle: function() {
    let presentationTitle = this.presentationTitle;
    this.props.addPresentation({title:presentationTitle, educator_id: this.props.educatorID});
  },
  handlePresentationTitleChange: function(e) {
    this.presentationTitle = e.target.value;
  },
  render: function() {
    console.log('add pres page', this.props);
    return (
      <div>
        <h3>Presentation Title:</h3>
        <input type="text" name="presentationTitle" placeholder='' onChange={this.handlePresentationTitleChange} />
        <button className="btn grey white-text" onClick={this.createNewPresentationTitle}>Submit</button>
        <button className="btn light-grey white-text" onClick={ this.props.createOrEditPresentation }>Cancel</button>
      </div>
    )
  }
});
