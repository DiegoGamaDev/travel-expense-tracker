import { COLORS, FONTSIZE } from "../../../constants/theme";

export const Style = {

    cardcontainer: {
        width: '100%',
        height: 180,
        padding: 12,
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
         marginBottom: 4
    },

    linha: {
        width: '100%',
        height:1,
        backgroundColor : COLORS.lightgrey,
        marginBottom: 6,
        marginTop: 6
    },

    icon : {
        width: 34,
        height: 34,
        margin:4,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 1,
    },





}