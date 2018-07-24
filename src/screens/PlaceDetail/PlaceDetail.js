import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from "../../store/actions";
import MapView from 'react-native-maps';

class PlaceDetail extends Component {
  state = {
    viewMode: "portrait"
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      ...this.state,
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  placeDeleteHandler = () => {
    console.log(this.props.selectedPlace);
    this.props.onDeletePlace(this.props.selectedPlace.key, this.props.selectedPlace.userId);
    this.props.navigator.pop();
  };

  render() {
    let trash = null;
    if (this.props.userId === this.props.selectedPlace.userId) {
      trash = (
        <View>
          <TouchableOpacity onPress={this.placeDeleteHandler}>
            <View style={styles.deleteButton}>
              <Icon
                size={30}
                name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                color="red"/>
            </View>
          </TouchableOpacity>
        </View>
      )
    }

    let caption = null;
    if (this.props.selectedPlace.description || this.props.selectedPlace.userEmail) {
      caption = (
        <View style={styles.captionBox}>
          <Text>
            {this.props.selectedPlace.description ? this.props.selectedPlace.description: null}
          </Text>
          <Text>
            {this.props.selectedPlace.userEmail ? this.props.selectedPlace.userEmail: null}
          </Text>
        </View>
      )
    }

    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
          </View>
          {caption}
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location}/>
            </MapView>
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>
              {this.props.selectedPlace.name}
              </Text>
          </View>
          {trash}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    width: "100%",
    height: "100%"
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  captionBox: {
    width: "100%",
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: "#eee",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  deleteButton: {
    alignItems: "center"
  },
  subContainer: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key, creatorId) => dispatch(deletePlace(key, creatorId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);