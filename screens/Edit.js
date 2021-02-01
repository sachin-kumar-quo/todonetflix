import React from 'react';

import { Text, StyleSheet } from 'react-native';

const Edit = () =>{

  const updateData =(seasonToUpdate) =>{
    fetch(`https://6012951054044a00172dc3ce.mockapi.io/test/netflix/${seasonToUpdate.id}`,{
      method:"PUT",
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify(seasonToUpdate)
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }



  return(
      <Text>Edit</Text>
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