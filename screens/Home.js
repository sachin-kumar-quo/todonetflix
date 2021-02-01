import React,{useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Fab, 
  ListItem,
  Button,
  CheckBox,
  List,
  Left,
  Body,
  Right,
  Title,
  H1,
  Subtitle,
  Container
} from 'native-base';


const Home = ({navigation, route}) =>{
  const [listOfSeasons,setListOfSeasons] = useState([]);

  useEffect(()=>{
    getData();
  },[listOfSeasons])
  const getData = ()=>{
    fetch("https://6012951054044a00172dc3ce.mockapi.io/test/netflix",{
      method:"GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
    .then(data =>{
      
      if(data?.error){
        alert('there is an error fetching data');
      }
      setListOfSeasons(data);
    })
    .catch(err => console.log(err))
  } 

  const deleteSeason = async (sessionId) =>{
    console.log(sessionId);
    let url = `https://6012951054044a00172dc3ce.mockapi.io/test/netflix/${sessionId}`
    console.log(url);
    try {
      let response = await fetch(url,{
        method:"DELETE"
      })
      let json = await response.json()
      console.log(json);
    } catch (error) {
      console.log(error);
    }
    
    // .then(response => response.json())
    // .then(data =>{
    //   console.log(data);
    //   if(data?.error){
    //     alert('there is an error fetching data');
    //   }
    //   console.log('delete');
    // })
    // .catch(err => console.log(err))
  }
  const markComplete =() =>{

  }



  return(
      <ScrollView contentContainerStyle={styles.container}>
        {listOfSeasons.length === 0 ?(
          <Container style={styles.container}>
            <H1 style={{color:"#00ff00",alignSelf:'center'}}>
              Watch List is Empty please Add 
            </H1>
          </Container>
        ) :(
          <>
            <H1 style={{color:"#00ff00"}}>
              Next Series to Watch
            </H1>
            <List>

            </List>
          </>
        )}
        <Text style={{color:"#00ff00",alignSelf:'center'}}>
          List of seasons goes here
        </Text>
        {listOfSeasons.length!=0 && listOfSeasons.map((season,index)=>{
          return(
            <View key={index} style={styles.row}>
              <Text style={{color:'#00ff00',flex:1,textAlign:'center'}}>{season.name}</Text>
              <Text style={{color:'#00ff00',flex:1,textAlign:'center'}}>{season.totalNoSeason}</Text>
              <TouchableOpacity  style={{flex:.5}}><Text style={{color:'orange',flex:1,textAlign:'center'}}>Edit</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>deleteSeason(season.id)} style={{flex:.5}}><Text style={{color:'red',flex:1,textAlign:'center'}}>Delete</Text></TouchableOpacity>
            </View>
          )
        })}
        <Fab
          style={{backgroundColor:'#5067ff'}}
          position="bottomRight"
          onPress={()=>navigation.navigate('Add')}>
          <Icon name="add" />
        </Fab>
      </ScrollView>
  )
}
export default Home;

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
    },
    row:{
      flexDirection:'row',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#fdcb9e',
      textAlign: 'justify',
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });