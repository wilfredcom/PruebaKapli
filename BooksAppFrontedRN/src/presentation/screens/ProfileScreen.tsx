import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { useGlobalContext } from '../context/GlobalContext'
import { booksApi } from '../../config/api/booksApi';

const ProfileScreen = () => {
  const { usernameId } = useGlobalContext();
  const [userData,setUserData] = useState(null);


  useEffect(() => {
    const fetchInitialData = async() => {

      const resp = await booksApi.get("/author/usernameId")
      console.log(resp);
    }

    fetchInitialData();
  },[usernameId]);

  return (
    <View>
      <Text>Id de usuario {usernameId}</Text>
      {/* @ts-ignore */}
      <Text>Nombre del usuario {userData?.name!}</Text>
      {/* @ts-ignore */}
      <Text>Apellidos {userData?.lastName!}</Text>
      {/* @ts-ignore */}
      <Text>Edad {userData?.age!}</Text>
      {/* @ts-ignore */}
      <Text>Creado en {userData?.created_at!}</Text>
    </View>
  )
}

export default ProfileScreen