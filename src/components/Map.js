import React, { Component } from 'react';

class Map extends Component {

  render() {
    return (
      <div className="Image">
        <img alt='' src={this.props.mapUrl} />
      </div>
    );
  }
}

export default Map;
