import React, {JSX, useEffect, useRef, useState} from 'react';
 
import {
  Animated,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import CellButton from './components/CellButton';
import Snackbar from 'react-native-snackbar';

function App(): JSX.Element {
  const empty_board = Array(9).fill('');
  const [board, setBoard] = useState<string[]>(empty_board);
  const [currentPlayer, setcurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner,setwinner] =useState<string|null>(null);
  const fadeAnim= useRef(new Animated.Value(0)).current;
  const winningCombos= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];
    //animation
        useEffect (() =>{
      if(winner){
        Animated.timing(fadeAnim,{
          toValue :1,
          duration:800,
          useNativeDriver:true,
        }).start();
      }else {
        fadeAnim.setValue(0);
      }
    },[winner]);
    


    //logic for winner
  const checkWinner =(board : string[]) =>{
    for( let combo of winningCombos){
      const [a,b,c] = combo;
      if(board[a] && board[a] === board[b] && board[a]=== board[c]) return board[a];
      //return X orO whoever win
      //check draw if all cell != '' empty 
    }
    if(board.every(cell => cell !== '')) return 'Draw';
    return null //why
  }

  

  const handleCellPress = (index : number) =>{
    // /IF WINNER  found button will not work 
    if(winner) return Snackbar.show({
      text: `winner is ${winner} Please Reload`,
      backgroundColor : '#4CAF50',
      textColor: '#fff'
    }) ;

    //don't overwrite 
    if(board[index] !=='' || winner) return Snackbar.show({
      text: `please write on empty one`,
      backgroundColor : '#6345ae',
      textColor: '#fff'
    }) ; 
    
    const updateBoard = [...board]
    updateBoard[index] =currentPlayer
    setBoard(updateBoard)


    //check winner on each fill
    const winResult =checkWinner(updateBoard)
    if(winResult){
      setwinner(winResult)
    }else{
      setcurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <>
      <View style={style.container}>
        <View style={style.playerturn}>
          <Text style={style.playertextturn}>
            Player {currentPlayer}'s turn
          </Text>
        </View>
        {/* flatlist */}

        <FlatList 
          data ={board}
          numColumns={3}
          keyExtractor={(_,index)=>index.toString()}
          renderItem={({item,index})=>(
            <CellButton value={item} onPress={()=>handleCellPress(index)} />
          )}
        />

        {/* show winner if any  */}
        {winner && (
          <Animated.View style={[style.resultStyle, {opacity: fadeAnim}]}>
            <Text style={style.resultTextStyle}>
              {winner === 'Draw'  ?  `game iS Draw` :  `Player ${winner} wins 🎉`}
            </Text>
          </Animated.View>
        )}

        {/* Reload Buttony */}
        <TouchableOpacity 
        style ={style.reloadButton} 
        onPress={()=>{
          setBoard(empty_board)
          setcurrentPlayer('X')
          setwinner(null)
        }}
        >
          <Text style={style.reloadButtonText}>Reload</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffcc',
    alignItems: 'center',
    paddingVertical: 20,
  },
  playerturn: {
    width: '90%',
    backgroundColor: '#ff471a',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  reloadButton: {
    width: '90%',
    backgroundColor: '#ff471a',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  playertextturn: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  reloadButtonText: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  resultStyle: {
  width: '90%',
  backgroundColor: '#4CAF50',
  padding: 15,
  marginVertical: 10,
  borderRadius: 10,
  alignItems: 'center',
  elevation: 5,
},
resultTextStyle: {
  fontSize: 23,
  color: '#fff',
  fontWeight: '500',
  textAlign: 'center',
},

});

export default App;
