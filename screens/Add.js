import React,{useState} from 'react';

import { Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import { Container, Form, Button, H1} from 'native-base';
import shortid from 'shortid';

// https://6012951054044a00172dc3ce.mockapi.io/test/test

const Add = ({navigation,route}) =>{
  const [name,setName] = useState("");
  const [totalNoSeason,setTotalNoSeason] = useState('');

  const sendData = (seasonToAdd) =>{
    fetch("https://6012951054044a00172dc3ce.mockapi.io/test/netflix",{
      method:"POST",
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify(seasonToAdd)
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  const addToList = (event) =>{
    event.preventDefault();
    try {
      if(!name || !totalNoSeason){
        return alert('please add both field');
      }
      const seasonToAdd = {
        id:shortid.generate(),
        name : name,
        totalNoSeason : totalNoSeason,
        isWatched : false
      };
      sendData(seasonToAdd);
      navigation.navigate('Home');

    }catch (error){
      console.log(error);
    }
  }

  return(
      <Container style={styles.container} >
        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <H1 style={styles.heading}>Add to watch List</H1>
          <Form>
            <TextInput 
              placeholder="Season Name" 
              style={{color:"#eeeeee"}}
              onChangeText={text=>setName(text)}/>
            <TextInput 
              placeholder="Number of Seasons" 
              style={{color:"#eeeeee"}}
              onChangeText={text=>setTotalNoSeason(text)}/>
            <Button rounded block onPress={addToList}>
              <Text style={{color:"#eee"}}>Add</Text>
            </Button>
            <Text>{name} hello  {totalNoSeason}</Text>
          </Form>
        </ScrollView>
      </Container>
  )
}
export default Add;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00ff00',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
});