import { COLORS, FONTSIZE } from "../../constants/theme";

export const Style = {

    container : {
        width: '94%',
        height: 110,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:6,
        marginLeft:14,
        marginTop:14,
        marginBottom:-10,
        padding:8
    },

    containerHorizontal: {
        flexDirection:'row',
        height:60,
        width:'100%',
        backgroundColor:COLORS.lightgrey,
        borderRadius:8,
        marginTop:6,
        padding:4,
        justifyContent:'space-between'
    },

    title : {
       width: '100%',
        fontSize:FONTSIZE.medium,
        fontWeight: 'bold',
        alignItems: 'center',
        color:COLORS.darkgrey,
        fontFamily: 'Anton-Regular',
    },

    unidadePagamento: {
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

    textPagamento: {
        fontSize:14,
        fontWeight:'regular',
        fontFamily: 'Anton-Regular',
    }


}


export default Style;