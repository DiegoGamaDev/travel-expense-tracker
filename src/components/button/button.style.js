import { COLORS, FONTSIZE } from "../../constants/theme";

export const styles = {

    btnDefault : {
    height: 60,
    width: "100%",
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    position: 'relative',
    zIndex:0
    },

    textBtn: {
    fontSize: FONTSIZE.extraLarge,
    fontFamily: 'Anton-Regular',
    color: "white",
    padding: 4,
    textAlign: "center",
    fontWeight: "bold"
    }

};

export default styles;