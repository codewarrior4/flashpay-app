import React from 'react';
import { Alert, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ onFinish, onSkip, onDone }) => {
  

  return (
    <Onboarding
      showDone={true}
      onSkip={onSkip} // If onSkip is provided, execute onSkip, else navigate
      onDone={onDone} // If onDone is provided, execute onDone, else navigate
      onFinish={onFinish}
      pages={[
        {
          title: 'Get the best rate',
          subtitle: 'Flashpay Is Committed To Offering The Most Competitive Exchange Rates In The Industry.',
          backgroundColor: '#fff',
          image: <Image source={require('../assets/one.png')} />,
        },
        {
          title: 'Trust and Security',
          subtitle: 'We Employ The Latest Encryption And Security Protocols To Provide You With A Peace Of Mind While Trading',
          backgroundColor: '#fff',
          image: <Image source={require('../assets/two.png')} />,
        },
        {
          title: 'User-Centric Approach',
          subtitle: 'Our User-Friendly Mobile App For IOS And Android And Web App Are Designed For Both Beginners And Experienced Traders.',
          backgroundColor: '#fff',
          image: <Image source={require('../assets/three.png')} />,
        },
      ]}
    />
  );
};

export default OnboardingScreen;
