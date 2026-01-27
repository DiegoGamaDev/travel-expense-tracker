import { COLORS, FONTSIZE } from "../../constants/theme";

export const styles = {

    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor:COLORS.lightgrey,
        
    },

    searchContainer: {
        margin:4,
        marginHorizontal:12,
        paddingHorizontal:18,
        flexDirection: 'row',
        justifyContent: 'center', // Alinha os elementos com espaçamento igual entre eles
        alignItems: 'center',           // Alinha os itens no eixo transversal
        backgroundColor: COLORS.lightgrey,
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


};

export default styles;