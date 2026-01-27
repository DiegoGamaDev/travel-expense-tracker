import { COLORS, FONTSIZE } from "../../constants/theme";


export const styles = {

    appBar: {
        height:108,
        width:"100%",
        backgroundColor: COLORS.green,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderBottomRightRadius: 26,
        borderBottomLeftRadius: 26,
        elevation:12,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.6, 
        shadowRadius: 4,
    },

    textBar: {
        fontSize: FONTSIZE.extraLarge,
        color: COLORS.white,
        fontWeight: "bold",
        marginTop:45,
        marginBottom: 2,
        fontFamily: 'Anton-Regular'
    }

}

export default styles;