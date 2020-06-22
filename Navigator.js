import {createNavigator} from '@react-navigation/stack';
import {container} from '@react-navigation/native';
import Home from './Main';

const screens={
  Home:{
    screen: Home
  }
}
const Stack = createNavigator(screens);
export default container(Stack);
