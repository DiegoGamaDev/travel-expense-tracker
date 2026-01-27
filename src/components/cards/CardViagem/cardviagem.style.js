import { COLORS, FONTSIZE } from "../../../constants/theme";

export const Style = {

    cardcontainer: {
        width: '100%',
        height: 190,
        padding: 12,
        borderRadius: 16,
        elevation:1,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 }, 
        shadowOpacity: 0.4, 
        shadowRadius: 6,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: COLORS.lightgrey,
        marginBottom:14

    },
    containerLocalInicio: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    Text: {
        color: COLORS.green,
        fontSize: FONTSIZE.extremeLarge,
         fontFamily: 'Anton-Regular'


    },

    TextInfos: {
        color: COLORS.darkgrey,
        fontSize: FONTSIZE.small,
         fontFamily: 'Anton-Regular'
    },

    TextInfoSaida: {
        color: COLORS.darkgrey,
        fontSize: FONTSIZE.small,
         fontFamily: 'Anton-Regular',
         marginBottom: 46
    },

    linha: {
        width: '100%',
        height:1,
        backgroundColor : COLORS.lightgrey,
        marginBottom: 6
    }





}