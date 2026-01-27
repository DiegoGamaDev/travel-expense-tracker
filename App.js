import React, { useEffect } from 'react';
import { Image, Text, ActivityIndicator } from 'react-native';
import  icons  from './src/constants/icons.js';
import  images  from './src/constants/images.js';
import { styles } from './styles.js';
import { FirstTimeScreen } from './src/screens/firstTimeScreen/firstTimeScreen.jsx';
import { CreateTrip } from './src/screens/createTrip/createTrip.jsx';
import { CreateAbastecimento} from './src/screens/createAbastecimento/createAbastecimento.jsx'
import { useFonts } from 'expo-font';
import CreateAlimentacao from './src/screens/createAlimentacao/createAlimentacao.jsx';
import CreateDespesa from './src/screens/createDespesa/createDespesa.jsx';
import CreateDiario from './src/screens/createDiario/createDiario.jsx';
import CreateEstacionamento from './src/screens/createEstacionamento/createEstacionamento.jsx';
import CreateHospedagem from './src/screens/createHospedagem/createHospedagem.jsx';
import CreateManutencao from './src/screens/createManutencao/createManutencao.jsx';
import CreatePasseio from './src/screens/createPasseio/createPasseio.jsx';
import CreatePedagio from './src/screens/createPedagio/createPedagio.jsx';
import MainMenu from './src/screens/mainMenu/mainmenu.jsx';
import { MenuViagens } from './src/screens/menuViagens/menuviagens.jsx';
import { databaseCreate, databaseDelete } from './src/SQLite/sqlitescripts.jsx';
import Routes from './src/routes.js';
import { DisplayDespesas } from './src/screens/displayDespesas/displayDespesas.jsx';
export default function App() {

  useEffect(() =>{
    async function setupDB(){
      await databaseCreate();
      
    }
    setupDB();
  },[]);

try {
  
    const [fontsLoaded] = useFonts({
      'Anton': require('./src/assets/fonts/Anton.ttf'),
      'Anton-Regular': require('./src/assets/fonts/Anton.ttf'),
    });
  
    if (!fontsLoaded) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
} catch (error) {
  console.error("ERRO ao carregar fonte: ", error)
}


  return (
    <>   
      <Routes/>
    </>
  );
};