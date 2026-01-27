import { COLORS, FONTSIZE } from "../../constants/theme";

export const styles = {

    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor:COLORS.lightgrey
        
    },

    textFieldsContainer: {
        width: '100%',
        padding: 8,
        marginTop: 8,
        
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
    padding: 10,
    width: '85%'

 },

 scrollview: {
    padding:6

 }


};

export default styles;