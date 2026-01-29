import { COLORS, FONTSIZE } from "../../../constants/theme";

export const Style = {

    cardcontainer: {
        width: '98%',
        alignSelf:'center',
        padding: 12,
        marginTop: 14,
        borderRadius: 16,
        elevation:4,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 6,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: COLORS.lightgrey,
        marginBottom:18

    },

   

    Text: {
        color: COLORS.darkgrey,
        fontSize: FONTSIZE.extraLarge,
         fontFamily: 'Anton-Regular'


    }


}