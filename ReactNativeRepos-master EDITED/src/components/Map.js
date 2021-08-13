import React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Dimensions } from 'react-native'

const height = Dimensions.get('window').height

const Map = () => {
  return (
    <MapView
      style={styles.map}
      loadingEnabled={true}
      region={{
        latitude: 3.0729023319087676,
        longitude: 101.49710550453241,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      }}
    >
        <MapView.Marker 
            coordinate={{
                latitude: 3.0729023319087676,
                longitude: 101.49710550453241,
            }}
            title={"Marker 1"}
            description={"Engine Square"}
        />

        <MapView.Marker 
            coordinate={{
                latitude: 3.0717446917921443,
                longitude: 101.49667245622167,
            }}
            title={"Marker 2"}
            description={"FKM"}
        />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    height
  }
})

export default Map