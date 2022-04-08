import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { mapsPlacesApiKey } from "../../util/config";
import PropTypes from "prop-types";

const mapStyles = {
  width: "100%",
  // height: "300px",
  // position: "absolute",
  // display: "block",
  borderRadius: "8px",
};
// const containerStyle = {
//   // position: "absolute", i hate css :)
//   // position: "relative",
//   // paddingBottom: "26.25%",
//   // paddingTop: "30px",
//   minHeight: "200px",
//   overflow: "hidden",
//   // width: "100%",
//   // height: "100%",
// };

// TODO: consider this Akin https://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/

export class MapContainer extends React.Component {
  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: mapStyles,
    });
  }
  render() {
    const { location } = this.props;
    const toronto = {
      lat: 43.653225,
      lng: -79.383186,
    };
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          // containerStyle={containerStyle}
          initialCenter={toronto}
          center={
            typeof location?.lat === "number" &&
            typeof location?.lng === "number"
              ? location
              : toronto
          }
          // onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
        />
      </div>
    );
  }
}

MapContainer.propTypes = {
  location: PropTypes.object.isRequired,
};

export default GoogleApiWrapper({
  apiKey: mapsPlacesApiKey,
  libraries: ["visualization", "places"],
})(MapContainer);
