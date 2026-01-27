import { COLORS } from "../../constants/theme";
import { FONTSIZE } from "../../constants/theme";


export const Style = {

    dropdownstyle: {
        width: '92%', 
        height: 44, 
        marginTop: 8, 
        marginLeft: 16,
        borderColor: 'white', 
        backgroundColor: COLORS.lightgrey, 
        borderWidth: 1, 
        borderRadius: 8, 
        paddingHorizontal: 12, 
        paddingVertical: 2, 
        zIndex:5,
        position: 'relative'
    },

    dropdownstyledown: {
        width: '98%', 
        height: 44, 
        marginTop: 8, 
        marginLeft: 4,
        borderColor: 'white', 
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 8,  
        zIndex:3,
        position: 'relative'
    },

    label: {
        fontSize: FONTSIZE.medium,
        color: COLORS.darkgrey,
        fontFamily: 'Anton-Regular',
        textAlign:"left",
        marginLeft:20,
        marginTop:12,
        marginBottom:-2
    },

    placeholderstyle: {
        fontSize: FONTSIZE.small,
        color: COLORS.darkgrey,
        fontFamily: 'Anton-Regular',
        textAlign:"center",
        alignItems: 'center',
        justifyContent: 'center',
    },

}