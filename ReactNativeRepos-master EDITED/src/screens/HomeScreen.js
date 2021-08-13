import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

const HomeScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  return(
  <Background>
    <Logo />
    <Header>AHLAN WA SAHLAN</Header>

    <Paragraph>
      Please navigate through these buttons.
    </Paragraph>
    <Button 
      mode="contained" 
      onPress={() => navigation.navigate('Dashboard')}>
      MAP
    </Button>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('DashboardData')}>
      DASHBOARD
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
      onPress={() => signOut()}>
      LOG OUT
    </Button>
  </Background>
  )
};

export default memo(HomeScreen);
