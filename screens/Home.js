import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,FlatList } from 'react-native';
import { 
  List,
  H1,
  Container
} from 'native-base';

const ListItems =({id,name,totalNoSeason,navigation,deleteSeason}) =>(
  <View style={styles.row}>
    <Text style={{color:'#00ff00',flex:1,textAlign:'center',fontSize:15}}>{name}</Text>
    <Text style={{color:'#00ff00',flex:1,textAlign:'center',fontSize:15}}>{totalNoSeason}</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('Edit',{seasonId:id})} style={{flex:.5}}><Text style={{color:'orange',flex:1,textAlign:'center',fontSize:15}}>Edit</Text></TouchableOpacity>
    <TouchableOpacity onPress={()=>deleteSeason(id)} style={{flex:.5}}><Text style={{color:'red',flex:1,textAlign:'center',fontSize:15}}>Delete</Text></TouchableOpacity>
  </View>
)

const Home = ({navigation, route}) =>{
  const [listOfSeasons,setListOfSeasons] = useState([]);
  const [offSet,setOffSet] = useState(0);

  useEffect(()=>{
    if(offSet===0)
      getData();
  })
  const getData = ()=>{
    fetch("https://6012951054044a00172dc3ce.mockapi.io/test/netflix",{
      method:"GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
    .then(data =>{
      
      if(data?.error){
        alert('there is an error fetching data');
      }
      data = data.slice((offSet*20),((offSet+1)*20)-1);
      setListOfSeasons(data);
      setOffSet(offSet+1);
      // console.log(listOfSeasons.length)
    })
    .catch(err => console.log(err))
  } 

  const loadMoreData = ()=>{
    fetch("https://6012951054044a00172dc3ce.mockapi.io/test/netflix",{
      method:"GET",
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
    .then(data =>{
      
      if(data?.error){
        alert('there is an error fetching data');
      }
      data = data.slice((offSet*20),((offSet+1)*20)-1);
      setListOfSeasons([...listOfSeasons,...data]);
      setOffSet(offSet+1);
      // console.log(listOfSeasons.length)
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
      getData();
    } catch (error) {
      console.log(error);
    }
  }
  
  const listHead = () =>{
    return(
      <>
      <Container style={styles.container}>
        <H1 style={{color:"#00ff00",alignSelf:'center'}}>
          Watch List is Empty please Add 
        </H1>
      </Container>
      <Text style={{color:"#00ff00",alignSelf:'center'}}>
        List of seasons goes here
      </Text>
      <View style={styles.row}>
        <Text style={{color:'#00ffff',flex:1,textAlign:'center',fontSize:16}}>Season Name</Text>
        <Text style={{color:'#00ffff',flex:1,textAlign:'center',fontSize:16}}>No of Season</Text>
        <Text style={{color:'#00ffff',flex:.5,textAlign:'center',fontSize:16}}>Edit</Text>
        <Text style={{color:'#00ffff',flex:.5,textAlign:'center',fontSize:16}}>Delete</Text>
      </View>
      </>
    )
  }

  const listFoot =()=>{
    return(
      <View style={{backgroundColor:"#42e6f5",height:40}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Add')}><Text style={{fontSize:20,textAlign:'center',fontWeight:'bold'}}>Add New Season To List</Text></TouchableOpacity>
      </View>
    )
  }

  const renderListItem =(season)=>{
    // console.log(season);
    return(
    <ListItems id={season.item.id} name={season.item.name} totalNoSeason={season.item.totalNoSeason} navigation={navigation} deleteSeason={deleteSeason}/>
    )
  }



  return(
    <View style={{flex:.8}}>
      <View style={styles.container}>
        {listOfSeasons.length === 0 ?(
          <Container style={styles.container}>
            <H1 style={{color:"#00ff00",alignSelf:'center'}}>
              Watch List is Empty please Add 
            </H1>
          </Container>
        ) :(
          <>
            <H1 style={{color:"#00ff00",textAlign:'center'}}>
              Next Series to Watch
            </H1>
            <List>

            </List>
          </>
        )}
        <Text style={{color:"#00ff00",alignSelf:'center'}}>
          List of seasons goes here
        </Text>
        <View style={styles.row}>
          <Text style={{color:'#00ffff',flex:1,textAlign:'center',fontSize:16}}>Season Name</Text>
          <Text style={{color:'#00ffff',flex:1,textAlign:'center',fontSize:16}}>No of Season</Text>
          <Text style={{color:'#00ffff',flex:.5,textAlign:'center',fontSize:16}}>Edit</Text>
          <Text style={{color:'#00ffff',flex:.5,textAlign:'center',fontSize:16}}>Delete</Text>
        </View>
        {listOfSeasons.length!==0 && <FlatList
          data={listOfSeasons}
          renderItem={renderListItem}
          keyExtractor={item=>item.id}
          extraData={listOfSeasons}
          onEndReached={loadMoreData}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          />}
      </View>
      <View style={{backgroundColor:"#42e6f5",height:40}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Add')}><Text style={{fontSize:20,textAlign:'center',fontWeight:'bold'}}>Add New Season To List</Text></TouchableOpacity>
      </View>
    </View>
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
    separator: {
      height: 0.5,
      backgroundColor: 'rgba(0,0,0,0.4)',
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