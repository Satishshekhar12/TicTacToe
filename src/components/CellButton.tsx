import React, { JSX,PropsWithChildren } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

type CellButtonProps = PropsWithChildren <{
    value:string,
    onPress:() => void;
}>;

const CellButton =(props:CellButtonProps):JSX.Element =>  {
  return (
    <TouchableOpacity style={props.value=== "" ?style.cell :style.filledcell} onPress={props.onPress}>
        <Text style={style.cellText}>{props.value}</Text>
    </TouchableOpacity>
  )
}
const style = StyleSheet.create({
    cell : {
        width:100,
        height:100,
        margin:5,
        padding:5,
        backgroundColor :'#cc3300',
        justifyContent:'center',
        alignItems :'center',
        borderRadius :6,
    },
    filledcell:{
      width:100,
        height:100,
        margin:5,
        padding:5,
        backgroundColor :'#34abca',
        justifyContent:'center',
        alignItems :'center',
        borderRadius :6,
    },
    cellText: {
    fontSize: 45,
    fontStyle: 'italic',
    fontWeight: '600',
    }
})

export default CellButton