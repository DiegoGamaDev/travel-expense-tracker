import { COLORS, FONTSIZE } from "../../constants/theme";

export const styles = {

    container: {
        marginBottom:18,
        backgroundColor:COLORS.lightgrey,
        
    },

    containerMeio: {
        padding: 2,
        marginTop:4,
        marginBottom:-4,
        alignItems:'center',
        backgroundColor:COLORS.lightgrey,
        
    },

    containerTela: {
        flex: 1,
        
        backgroundColor:COLORS.lightgrey,

    },

    Text: {
        color: COLORS.darkgrey,
        fontSize: FONTSIZE.extremeLarge,
         fontFamily: 'Anton-Regular'


    },


    TextMeio: {
        color: COLORS.green,
        fontSize: FONTSIZE.extremeLarge,
         fontFamily: 'Anton-Regular',
         alignItems: "center",


    },


    datacontainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor:COLORS.lightgrey,
        paddingLeft: 12,
        paddingRight: 12
    },

    modalScreen : {
        height: '60%',
        backgroundColor: COLORS.darkgrey

    },

    textFieldsContainer: {
        width: '100%',
        flex:1,
        padding: 18,
        marginTop: 8,
        backgroundColor: COLORS.white,
        borderTopLeftRadius:26,
        borderTopRightRadius:26,
    },

    logo: {
        marginTop:40,
        width:140,
        height:140,
        opacity:0.2,
        justifyContent: "center",
        alignItems: "center"   
 },

 button: {
    alignSelf: 'center',
    width: '85%'

 },

 scrollview: {
    padding:12

 }


};

export default styles;