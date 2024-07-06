import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getToken } from './utils';

const AuthHOC = (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();

    useEffect(() => {
      const checkAuth = async () => {
        const token = await getToken();
        if (!token) {
          navigation.navigate('login');
        }
      };

      checkAuth();
    }, [navigation]);

    return <WrappedComponent {...props} />;
  };
};

export default AuthHOC;
