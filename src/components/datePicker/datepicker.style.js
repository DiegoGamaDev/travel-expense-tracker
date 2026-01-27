import { COLORS, FONTSIZE } from "../../constants/theme";

export const styles = {
    container: {
        width: "100%",
        padding: 20,
        marginBottom: -20
    },

    label: {
        fontSize: FONTSIZE.medium,
        color: COLORS.darkgrey,
        fontFamily: 'Anton-Regular',
        textAlign: "left",
        marginTop: 0,
        marginBottom: 8
    },
    
    input: {
        height: 40,
        width: "100%",
        padding: 8,
        backgroundColor: COLORS.lightgrey,
        borderWidth: 1,
        borderColor: COLORS.lightgrey,
        borderRadius: 8
    },

    dateComponent: {
        width: 350,
        fontSize: FONTSIZE.medium,
        color: COLORS.darkgrey,
        fontFamily: 'Anton-Regular'
    },

    button: {
        height:40,
        backgroundColor: COLORS.lightgrey,
        borderRadius: 8, 
        alignItems: 'center', 
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: FONTSIZE.small,
        color: COLORS.darkgrey,
        fontFamily: 'Anton-Regular',
        
    },



};

export default styles;
