import { COLORS, FONTSIZE } from "../../constants/theme";

export const Style = {
   
    container: {
        alignItems:'center',
        justifyContent: 'center',
        borderWidth:1,
        borderRadius:16,
        borderColor:COLORS.lightgrey,
        padding:10,
        
    },

    containerLabel: {
        alignItems:'center',
        justifyContent: 'center',
        marginTop:2,
        marginBottom:-2,
        
    },

    icon : {
        width: 80,
        height: 80,
        margin:4,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 1,
    },

    label: {
        fontSize: FONTSIZE.small,
        color: COLORS.darkgrey,
        fontFamily: 'Anton-Regular',
        alignText:'center',
        justifyContent:'center'
       
       
    }



}



export default Style;