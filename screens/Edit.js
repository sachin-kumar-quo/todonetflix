import React,{useState, useEffect} from 'react';

import { Text, StyleSheet, TextInput,ScrollView } from 'react-native';
import { Container, Form, Item, Button, H1} from 'native-base';


const Edit = ({navigation,route}) =>{
  const [name,setName] = useState("");
  const [totalNoSeason,setTotalNoSeason] = useState('');

  useEffect(()=>{
    getData();
  },[])

  const updateData =(seasonToUpdate) =>{
    fetch(`https://6012951054044a00172dc3ce.mockapi.io/test/netflix/${route.params.seasonId}`,{
      method:"PUT",
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify(seasonToUpdate)
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }
  const getData = ()=>{
    fetch(`https://6012951054044a00172dc3ce.mockapi.io/test/netflix/${route.params.seasonId}`,{
      method:"GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
    .then(data =>{
      
      if(data?.error){
        alert('there is an error fetching data');
      }
      setName(data.name);
      setTotalNoSeason(data.totalNoSeason);
    })
    .catch(err => console.log(err))
  } 

  const updateList =()=>{
    const seasonToAdd = {
      name : name,
      totalNoSeason : totalNoSeason,
      isWatched : false
    };
    updateData(seasonToAdd);
    navigation.navigate('Home');
  }


  return(
    <Container style={styles.container} >
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        <H1 style={styles.heading}>Update Season</H1>
        <Form>
          <TextInput 
            placeholder="Season Name" 
            style={{color:"#eeeeee"}}
            onChangeText={text=>setName(text)}
            value={name}/>
          <TextInput 
            placeholder="Number of Seasons" 
            style={{color:"#eeeeee"}}
            onChangeText={text=>setTotalNoSeason(text)}
            value={totalNoSeason}/>
          <Button rounded block onPress={updateList}>
            <Text style={{color:"#eee"}}>Add</Text>
          </Button>
          <Text>{name} hello  {totalNoSeason}</Text>
        </Form>
      </ScrollView>
    </Container>
  )
}
export default Edit;


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });