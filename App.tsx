import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {getVerbs} from './services/firebase';

const App = () => {
  const [verbs, setVerbs] = useState<{spanish: string; english: string}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVerbs();
      console.log(data.map(({translation}) => translation));
      setVerbs(data.map(({translation}) => translation));
    };
    fetchData();
  }, []);

  const handlePress = () => {
    Animated.timing(flipAnim, {
      toValue: showEnglish ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowEnglish(!showEnglish);
    });
  };

  const handleNext = () => {
    console.log('next');
    if (showEnglish) {
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start(() => {
        setShowEnglish(false);
      });
    }
    setCurrentIndex((currentIndex + 1) % verbs.length);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontStyle = {
    transform: [{rotateY: frontInterpolate}],
  };

  const backStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  if (verbs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View
          style={[
            styles.card,
            frontStyle,
            {position: showEnglish ? 'absolute' : 'relative'},
          ]}>
          <Text style={styles.text}>{verbs[currentIndex].spanish}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.card,
            backStyle,
            {position: showEnglish ? 'relative' : 'absolute'},
          ]}>
          <Text style={styles.text}>{verbs[currentIndex].english}</Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light blue background color
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: '#f9c2ff',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Roboto-Bold', // Use the Roboto font
  },
  nextButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Bold', // Use the Roboto Bold font
  },
});

export default App;
