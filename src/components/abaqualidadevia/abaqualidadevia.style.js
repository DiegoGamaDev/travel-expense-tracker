import { COLORS, FONTSIZE } from "../../constants/theme";

export const Style = {

    container : {
        width: '90%',
        height: 110,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:6,
        marginLeft:14,
        marginTop:14,
        marginBottom:-14,
        padding:8
    },

    containerHorizontal: {
        flexDirection:'row',
        height:60,
        width:'100%',
        marginTop:6,
        marginLeft:8,
        justifyContent:'center'
    },

    title : {
       width: '100%',
        fontSize:FONTSIZE.medium,
        fontWeight: 'bold',
        alignItems: 'center',
        color:COLORS.darkgrey,
        fontFamily: 'Anton-Regular',
    },

    unidadeQualidadeVia: {
        height:44,
        width:68,
        backgroundColor:'white',
        borderRadius:8,
        borderColor:'lightgrey',
        borderWidth:2,
        alignItems:'center',
        justifyItems:'center',
        padding:4,
        paddingTop:6,
        margin:2
    },

    textComponent: {
        fontSize:14,
        fontWeight:'regular',
        fontFamily: 'Anton-Regular',
    }


}


export default Style;