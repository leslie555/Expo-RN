// import * as React from 'react';
// import { View, Text, Button, TextInput } from 'react-native';

// export default function CreatePostScreen({ navigation, route }) {
//   const [postText, setPostText] = React.useState('');

//   return (
//     <>
//       <TextInput
//         multiline
//         placeholder="What's on your mind?"
//         style={{ height: 200, padding: 10, backgroundColor: 'white' }}
//         value={postText}
//         onChangeText={setPostText}
//       />
//       <Button
//         title="Done"
//         onPress={() => {
//           // Pass params back to home screen
//           navigation.navigate('Home', { post: postText });
//         }}
//       />
//     </>
//   );
// }


// import * as React from 'react';
// import Slider from 'react-native-slider';
// import {
//   AppRegistry,
//   StyleSheet,
//   View,
//   Text,
// } from 'react-native';
 
// export default function SliderEg(){

//   const [value1, setValue1] = React.useState(0);
 
  
//     return (
//       <View style={styles.container}>
//         <Slider 
//           value={value1} 
//           minimumValue={0}
//           maximumValue={100}
//           step={1}
//           minimumTrackTintColor="#ccc"
//           maximumTrackTintColor="pink"
//           thumbTintColor="#49f"
//           thumbTouchSize={{width: 80,height:120}}



//           onValueChange={setValue1} 

//           />
//         <Text>Value: {value1}</Text>
//       </View>
//     );
 
// }
 
// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginLeft: 10,
//     marginRight: 10,
//     alignItems: 'stretch',
//     justifyContent: 'center',
//   },
// });


import React, { Component } from 'react'
import { StyleSheet, View, PanResponder, Text, Dimensions,TouchableOpacity } from 'react-native'

const roundSize = 5  // 圆的大小
const width = Dimensions.get('window').width // 设备宽度
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // start: 0, // 起始坐标
      start: 0,
      end: width -40,
      // end: width - roundSize, // 结束坐标
      range: 1000,  // 最大价格
      endPrice: '不限',  // 结束价格
      startPrice: 0 // 起始价格
    }
  }

  componentWillMount() {
    this.panResponderStart = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.forceUpdate()
      },
      onPanResponderMove: (evt, gestureState) => { // 开始的拖动事件
        let { end, range } = this.state
        let start = gestureState.moveX // 当前拖动所在的坐标
        if (start < 10) {  // 到起始阀值，置为0
          start = 0
        }
        if (end < start) {  // 保证开始价格不会超过结束价格
          start = end - roundSize
        }
        if(start > width) { // 保证开始价格不会超过最大值
          start = width
        }
        let startPrice = Math.floor(start / width * range) // 计算开始价格显示值
        if (start === 0) { 
          startPrice = 0
        }
        this.setState({
          start,
          startPrice
        })
      },
      onPanResponderRelease: (evt, gestureState) => true,
      onPanResponderTerminate: (evt, gestureState) => true,
    })
    this.panResponderEnd = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.forceUpdate()
      },
      onPanResponderMove: (evt, gestureState) => { // 结束的拖动事件
        let { start, range } = this.state
        let end = gestureState.moveX
        if (end < start) {
          end = start + 30
        }
        if(end > width-40 - roundSize) {
          end = width- 40 
        }
        let endPrice = Math.floor(end / (width - roundSize) * range) > range - 1 ? '不限' : Math.floor(end / (width - roundSize) * range)
        this.setState({
          end,
          endPrice
        })
      },
      onPanResponderRelease: (evt, gestureState) => true,
      onPanResponderTerminate: (evt, gestureState) => true,
    })
  }

  render() {
    let { start, end, range, startPrice, endPrice } = this.state
    return (
      <View style={styles.container}>
        <View style={[styles.btnView,styles.showDay]}><Text style={styles.day}>空置>20天</Text></View>


        <View style={styles.slider}>
          <View style={[{ position: 'absolute' }, { left: end-20, zIndex: 999 }, { top: 20 }]}>
            <Text>{endPrice !== '不限' ? `￥${endPrice}` : endPrice}</Text>
          </View>
          
          <View style={styles.track}>
            <View style={[styles.ProgressLeft, {width: start}]}></View>
            <View style={[styles.progressCenter, { width: end-start }]}></View>
            <View style={[styles.ProgressRight, { width: width -40 - end }]}></View>
          </View>

          <View style={[{ position: 'absolute' }, { left: start, zIndex: 999 }, { top: 60 }]}>
            <Text>￥{startPrice}</Text>
          </View>

          <View style={[styles.circleStart, { left: start - 20 }]} {...this.panResponderStart.panHandlers}></View>
          <View style={[styles.circleEnd, { left: end-20 }]} {...this.panResponderEnd.panHandlers}></View>
        </View>


        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>重置</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.btn,styles.sure]}><Text style={styles.btnText}>确定筛选</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    flex:1,
    backgroundColor: '#fff',
  },
  showDay: {
    height: 80
  },
  day: {
    fontSize: 20
  },
  btnView: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sure: {
    marginLeft: 20
  },
  btn: {
    backgroundColor: '#3759F3',
    width: 100,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  slider: {
    backgroundColor: '#ccc',
    height: 100,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    // flex: 1,
    height: 4,
    flexDirection: 'row'
    // backgroundColor: 'pink'
  },
  ProgressLeft: {
    backgroundColor:'red',
  },  
  ProgressRight: {
    backgroundColor:'orange',
  }, 
  progressCenter: {
    backgroundColor: '#3759F3',
    // height: 4
  },
  // circle: {
  //   position: 'absolute',
  //   width: roundSize,
  //   height: roundSize,
  //   borderRadius: roundSize / 2,
  //   borderColor: '#eee',
  //   shadowColor: 'rgba(0,0,0,0.6)',
  //   shadowRadius: 5,
  //   shadowOpacity: 0.9,
  //   backgroundColor: '#ccc',
  // }
  circleStart: {
    position: 'absolute',
    top:50,
    width: 40,
    height: 40,
    borderRadius: 20,
    // borderTopLeftRadius: 32/22,
    // borderTopRightRadius: 0,
    // borderBottomLeftRadius:  22 / 32,
    // borderBottomRightRadius:  20 / 20,
    backgroundColor: '#49f'
    // transform:  [{rotate:'135deg'}]
  },
  circleEnd: {
    position: 'absolute',
    top:10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#49f'
  }
})