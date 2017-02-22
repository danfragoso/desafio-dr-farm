import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import autoBind from 'react-autobind';
import ActionSearch from 'material-ui/svg-icons/action/search';
import FlatButton from 'material-ui/FlatButton';
import Map from './Map'
import Request from 'superagent';

var mapUrl = "https://maps.googleapis.com/maps/api/staticmap?center=-13.0025439,-38.4566915&zoom=16&size=800x400&scale=1&maptype=satellite&key=AIzaSyCxvErjCe8BhS18oPpmva9za8AeJfWYO8E";
var placeName = "Pituba, Salvador - BA";
var realAdress = "Pituba, Salvador - BA";
var mapType = "satellite";

class Content extends Component {

  constructor(props) {
    super(props);
    this.request = require('request');
    this.state = {value: ''};
    autoBind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.value !== ''){
      placeName = this.state.value;
      this.setState({value: ''});
      this.getGeocode();
    }else{
      alert('Digite um endereço')
    }
  }

  componentWillMount(){
    this.getGeocode();
  }

  componentDidMount(){
    this.setState({value: ''});
  }

  toSattelite(){
    mapType='satellite'
    this.getGeocode();
  }

  toTerrain(){
    mapType='terrain'
    this.getGeocode();
  }

  toHybrid(){
    mapType='hybrid'
    this.getGeocode();
  }

  getGeocode(){
    Request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + placeName + '&key=AIzaSyDf_1CrizKlyGLkZ-SPaODRdxNn6h5QBHE').then((response) => {
      this.mapInfo=response
      this.geometry=this.mapInfo.body.results[0].geometry.location;
      realAdress=this.mapInfo.body.results[0].formatted_address;
      this.mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + this.geometry.lat + ',' + this.geometry.lng + '&zoom=16&size=800x400&scale=1&maptype=' + mapType + '&key=AIzaSyCxvErjCe8BhS18oPpmva9za8AeJfWYO8E';
      mapUrl = this.mapUrl;
      this.setState({
      });
    });
  }


  render() {
    return (
      <div className="Textbox">
        <Toolbar className="Toolbar">
          <ToolbarGroup>
            <TextField
              className="Textfield"
              hintText="Pituba, Salvador - BA"
              floatingLabelText="Endereço"
              underlineShow={false}
              floatingLabelFixed={true}
              value={this.state.value}
              onChange={this.handleChange}
              />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <IconButton tooltip="Pesquisar"  onClick={this.handleSubmit}>
              <ActionSearch/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div className="Image"> Mostrando imagens de {realAdress} </div>
        <Map mapUrl={mapUrl}/>
        <div className="Buttons">
          <FlatButton label="Satélite" onClick={this.toSattelite} />
          <FlatButton label="Terreno"  onClick={this.toTerrain}/>
          <FlatButton label="Híbrido" onClick={this.toHybrid}/>
        </div>
      </div>
    );
  }
}

export default Content;
