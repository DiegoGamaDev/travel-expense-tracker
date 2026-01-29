import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MenuViagens } from "./screens/menuViagens/menuviagens.jsx";
import DisplayDespesas  from "./screens/displayDespesas/displayDespesas.jsx";
import MainMenu from "./screens/mainMenu/mainmenu.jsx";
import FirstTimeScreen from "./screens/firstTimeScreen/firstTimeScreen.jsx";
import CreateTrip from "./screens/createTrip/createTrip.jsx";
import CreateAbastecimento from "./screens/createAbastecimento/createAbastecimento.jsx";
import CreateAlimentacao from "./screens/createAlimentacao/createAlimentacao.jsx";
import CreateDespesa from "./screens/createDespesa/createDespesa.jsx";
import CreateDiario from "./screens/createDiario/createDiario.jsx";
import CreateEstacionamento from "./screens/createEstacionamento/createEstacionamento.jsx";
import CreateHospedagem from "./screens/createHospedagem/createHospedagem.jsx";
import CreateManutencao from "./screens/createManutencao/createManutencao.jsx";
import CreatePasseio from "./screens/createPasseio/createPasseio.jsx";
import CreatePedagio from "./screens/createPedagio/createPedagio.jsx";
import DisplayDiario from "./screens/displayDiario/displayDiario.jsx";
import AtualizarRodagem from "./screens/AtualizarRodagem/atualizarRodagem.jsx";
import Estatisticas from "./screens/displayEstatisticas/estatisticas.jsx";
const Stack = createNativeStackNavigator();


function Routes(){

    return <NavigationContainer>
        <Stack.Navigator>


            <Stack.Screen name = "menuViagens" component={MenuViagens} options={
                {headerShown: false}
            }/>
           
            <Stack.Screen name = "mainMenu" component={MainMenu} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "displayDespesas" component={DisplayDespesas} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "displayDiario" component={DisplayDiario} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "welcomeScreen" component={FirstTimeScreen} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "createTrip" component={CreateTrip} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "createAbastecimento" component={CreateAbastecimento} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "createAlimentacao" component={CreateAlimentacao} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "createDespesa" component={CreateDespesa} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "createDiario" component={CreateDiario} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "createEstacionamento" component={CreateEstacionamento} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "createHospedagem" component={CreateHospedagem} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "createManutencao" component={CreateManutencao} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "createPasseio" component={CreatePasseio} options={
                {headerShown: false}
            }/>

            <Stack.Screen name = "createPedagio" component={CreatePedagio} options={
                {headerShown: false}
                
            }/>

              <Stack.Screen name = "atualizarRodagem" component={AtualizarRodagem} options={
                {headerShown: false}
                
            }/>

            <Stack.Screen name = "estatisticas" component={Estatisticas} options={
                {headerShown: false}
                
            }/>




        </Stack.Navigator>
    </NavigationContainer>

}


export default Routes;