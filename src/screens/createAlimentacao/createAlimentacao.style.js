import { COLORS, FONTSIZE } from "../../constants/theme";

export const styles = {

    container: {
        flex: 1,
        alignItems: "center",
        zIndex:1
      
    },

    textFieldsContainer: {
        justifyContent: "center",
        width:"100%",
        marginTop:10,
        padding:8
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
    
    width:"85%",
    marginBottom:20,
    marginTop:50,
    zIndex:0,
    position: 'relative'
 }


};

export default styles;