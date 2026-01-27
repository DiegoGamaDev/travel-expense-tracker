import { COLORS, FONTSIZE } from "../../constants/theme";

export const styles = {
    containerTextBox: {
        width:"100%",
        padding:20,
        marginBottom:-20
    },

    label: {
        fontSize: FONTSIZE.medium,
        color: COLORS.darkgrey,
        fontFamily: 'Anton-Regular',
        textAlign:"left",
        marginTop:0,
        marginBottom:8
    },
    
    input:{
        height:42,
        width:"100%",
        padding:8,
        backgroundColor: COLORS.lightgrey,
        borderWidth:1,
        borderColor: COLORS.lightgrey,
        borderRadius:8
    } ,

    inputDiario: {
        height: 140,
        width: '100%',
        padding: 8,
        paddingTop: 12, 
        textAlignVertical: 'top', 
        backgroundColor: COLORS.lightgrey,
        borderWidth: 1,
        borderColor: COLORS.lightgrey,
        borderRadius: 8
    }


};

export default styles;