import { COLORS, FONTSIZE } from "../../constants/theme";

export const styles = {

    container: {
        flex: 1,
        alignItems: "center"
      
    },

    containerFavorito:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        height: 60
    },

    textFieldsContainer: {
        justifyContent: "center",
        alignItems: 'center',
        width:"100%",
        marginTop:10,
        marginBottom:10,
        padding:10,
        
    },

    text: {
        color: COLORS.darkgrey,
        fontSize: FONTSIZE.medium,
         fontFamily: 'Anton-Regular'

    },

    logo: {
        width:40,
        height:40,
        opacity:1,
        justifyContent: "center",
        alignItems: "center"   
 },

 button: {
    marginTop:30,
    width:"85%",
    marginBottom:50
 }


};

export default styles;