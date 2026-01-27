import { COLORS, FONTSIZE } from "../../constants/theme";

export const Style = {

    container: {
        flex:1,
        
    }

    , 
    
    containerIcones: {
        width:'100%',
        height:'100%',
        borderTopLeftRadius:28,
        borderTopRightRadius:28,
        backgroundColor:COLORS.white,
        elevation:12,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.4, 
        shadowRadius: 4,
        zIndex:1,
        position: 'relative'
    },

    containerHorizontal: {
        flexDirection: 'row',
        padding:16,
        paddingTop:12,
        justifyContent: 'space-between'
        
    }

}


export default Style;