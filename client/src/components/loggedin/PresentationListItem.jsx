import React from 'react';
export default React.createClass({
  render: function() {
    return (
      <div>
        {this.props.title}
        <button onClick={this.props.createOrEditPresentation}>Edit</button>
        <button onClick={this.props.startPreplannedPresentation}>Play</button>
      </div>
    );
  }
});