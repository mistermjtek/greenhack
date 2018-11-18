import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Button
} from 'react-native';

import colors from '../colors';

import AreaSpline from './vis/AreaSpline';
import Pie from './vis/Pie';
import Theme from './vis/theme';
import data from './vis/data';

// type State = {
//   activeIndex: number,
//   spendingsPerYear: any
// }

export default class DataAnalysis extends Component {

  // state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      spendingsPerYear: data.spendingsPerYear,
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }

  _onPieItemSelected(newIndex){
    this.setState({...this.state, activeIndex: newIndex, spendingsPerYear: this._shuffle(data.spendingsPerYear)});
  }

  _shuffle(a) {
      for (let i = a.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
  }

  render() {
    const height = 200;
    const width = 500;
    const score = 75;

    return (
      <ScrollView>
        <View style={styles.container} >
          <Text style={styles.title}>SLEEP ANALYSIS</Text>
          <Text style={styles.score_label}>Avg. Score</Text>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.chart_title}>Spending per year in {data.spendingsLastMonth[this.state.activeIndex].name}</Text>
          <AreaSpline
            width={width}
            height={height}
            data={this.state.spendingsPerYear}
            color='#9C454D' />
        </View>
        <View style={styles.buttonContainer}>
        <Button title="Analysis" style={styles.analysis}></Button>
        <Button title="Breakdown" style={styles.breakdown}></Button>
        </View>
        <Button title="RECOMMENDATION" style={styles.recommendation}></Button>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: colors.navy,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
  width: 187,
  height: 16,
  fontSize: 16,
  fontWeight: "300",
  fontStyle: "normal",
  letterSpacing: 0.48,
  textAlign: "center",
  color: "#ffffff"
},
score_label: {
  width: 187,
  height: 16,
  fontSize: 14,
  fontWeight: "300",
  fontStyle: "normal",
  letterSpacing: 0.48,
  textAlign: "center",
  color: "#ffffff"
},
score: {
  width: 86,
  height: 77,
  fontSize: 77,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 0.46,
  textAlign: "center",
  color: "#ffffff"

},
buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
},
analysis: {

},
breakdown: {

},
recommendation: {
  backgroundColor:'#ffffff',
  fontSize: 15,
    fontWeight: "bold",
    color: colors.navy
}
  // chart_title : {
  //   paddingTop: 15,
  //   textAlign: 'center',
  //   paddingBottom: 5,
  //   paddingLeft: 5,
  //   fontSize: 18,
  //   backgroundColor:'white',
  //   color: 'grey',
  //   fontWeight:'bold',
  // }
}
