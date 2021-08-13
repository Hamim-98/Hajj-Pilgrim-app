import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Step from '../components/Step';
import Location from '../components/Location';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';

const DashboardData = ({ navigation }) => {
  //  Data gained from dashboard Node-Red
  return(
  <Background>
    <BackButton goBack={() => navigation.navigate('HomeScreen')} />
    <Logo />
    <Header>DASHBOARD</Header>

    <Paragraph>
      Your current data:
    </Paragraph>
    <Location />
    <Paragraph>
      Latitude : 3.213182
    </Paragraph>
    <Paragraph>
      Longitude: 101.719251
    </Paragraph>
    <Paragraph>
      
    </Paragraph>
    <Step />
    <Paragraph>
      Steps : 48
    </Paragraph>
  </Background>
  )
}

export default memo(DashboardData);
