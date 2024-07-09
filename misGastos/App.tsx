import { View, Text } from 'react-native'
import React from 'react'
//redux
import { store } from './src/redux/store';
import { RootState,AppDispatch } from './src/redux/store';
import { useDispatch, useSelector,Provider } from 'react-redux';
import { useEffect } from 'react';
//actions
import { checkUser } from './src/redux/slices/auth';
//Screens
import LoginForm from './src/screens/Auth';
import Home from './src/screens/Home';
export default function App() {

  const RouterAuth = ()=>{
    const dispatch:AppDispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    useEffect(() => {
      dispatch(checkUser());
    }, [dispatch]);
    return( 
      <Home />
    )
   
  }



  return (
    <Provider store={store}>
      <RouterAuth/>
    </Provider>
  )
}