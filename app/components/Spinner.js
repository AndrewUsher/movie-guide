import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export const Spinner = ({ style = {}, size = 50, color = '#47525E' }) => (
  <View style={style}>
    <ActivityIndicator size="small" color={color} />
  </View>
)
