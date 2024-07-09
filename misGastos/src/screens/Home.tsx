import { View, Text,Button,StyleSheet,StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'
//redux
import {logout} from '../redux/slices/auth';
import { useDispatch } from 'react-redux';
import {AppDispatch } from '../redux/store';
//subcomponents
import FormNewColaborator from '../components/FormNewColaborator';
import FormNewPost from '../components/FormNewPost';
import TablePosts from '../components/TablePosts';
//services
import { getPosts } from '../services/api/posts';
import { getColaborators } from '../services/api/colaborators';
export default function Home() {
    const [posts, setPosts] = useState([]);
    const [colaborators, setColaborators] = useState([]);
    const [reload, setReload] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts();
            setPosts(data);
        }
        fetchPosts();
        const fetchColaborators = async () => {
            const data = await getColaborators();
            setColaborators(data);
        }
        fetchColaborators();
    }, [reload]);
   
    const handleLogout = () => {
        dispatch(logout());
        }
    
  return (
    <View style={style.container}>
        <StatusBar barStyle="ligth-content" />
        <View style={{height:"50%",width:"100%"}}>
          <FormNewColaborator onSubmit={()=>{}} reload={reload} setReload={setReload} />
          <FormNewPost colaborators={colaborators} reload={reload} setReload={setReload} />
        </View>
        <TablePosts posts={posts} />
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});