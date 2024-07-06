import { StyleSheet} from 'react-native';
import GlobalLayout from './components/Layout';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import Tasks from './screens/Tasks';
import CreateNewTask from './screens/CreateNewTask';
import RegisterOrLoginForm from './screens/RegisterOrLoginForm';
import AuthHOC from './components/AuthHOC';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <GlobalLayout styles={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name='login' component={RegisterOrLoginForm} />   
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='profile' component={AuthHOC(Profile)} />
          <Stack.Screen name='tasks' component={AuthHOC(Tasks)} />
          <Stack.Screen name='create-new' component={AuthHOC(CreateNewTask)} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </GlobalLayout>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});
