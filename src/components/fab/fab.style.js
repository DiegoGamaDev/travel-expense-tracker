import { COLORS } from "../../constants/theme";

const styles = {
    fab: {
      position: 'absolute',
      bottom: 70,
      right: 40,
      width: 56,
      height: 56,
      backgroundColor: COLORS.green,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      
      // Sombra para iOS
      shadowColor: '#000', // Cor da sombra
      shadowOffset: {
        width: 0,
        height: 3, // Deslocamento vertical
      },
      shadowOpacity: 0.3, // Opacidade da sombra
      shadowRadius: 6, // Raio de desfocagem da sombra

      // Sombra para Android
      elevation: 8, // Elevação para Android
    },

    fabText: {
      color: COLORS.white,
      fontSize: 28,
    },
};

export default styles;
