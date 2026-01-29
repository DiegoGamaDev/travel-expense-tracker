import { Alert, ScrollView, Text, View } from "react-native";
import Style from './mainmenu.style.js';
import Header from "../../components/header/header.jsx";
import MainMenuInfo from "../../components/mainmenuinfo/mainmenuinfo.jsx";
import Icon from "../../constants/icons.js";
import ComponentIcon from "../../components/componenteicone/componenteicone.jsx";
import { useCallback, useState } from "react";
import { calcularGastoTotal, getViagemById } from "../../SQLite/sqlitescripts.jsx";
import { useFocusEffect, useRoute } from "@react-navigation/native";

function MainMenu(props) {
  const route = useRoute();
  const { viagemId } = route.params || {};
  const [viagemSelecionada, setViagemSelecionada] = useState();
  const [nomeViagem, setNomeViagem] = useState('');
  const [gastoParcialViagem, setGastoParcialViagem] = useState(0.00);

  const loadViagem = async () => {
    try {
      if (viagemId) {
        const viagemLoaded = await getViagemById(viagemId);
        setViagemSelecionada(viagemLoaded);
        setNomeViagem(viagemLoaded.nome);
        const gastoParcialSQL = await calcularGastoTotal(viagemId);
        setGastoParcialViagem(gastoParcialSQL);
      }
    } catch (error) {
      console.warn('ERRO: ' + error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (viagemId) {
        loadViagem();
      }
    }, [viagemId]) 
  );

  return (
    <View style={Style.container}>
      <ScrollView>
        <Header title={nomeViagem.toUpperCase()} />
        <MainMenuInfo
          valor={gastoParcialViagem ? gastoParcialViagem.toFixed(2) : '0.00'}
        />
        <View style={Style.containerIcones}>
          <View style={Style.containerHorizontal}>
            <ComponentIcon
              source={Icon.icnAbastecimento}
              label={'Abastecimento'}
              onPress={() => viagemId && props.navigation.navigate('displayDespesas', { viagemId, tipoDespesa: 'abastecimento' })}
            />
            <ComponentIcon
              source={Icon.icnAlimentacao}
              label={'Alimentação'}
              onPress={() => viagemId && props.navigation.navigate('displayDespesas', { viagemId, tipoDespesa: 'alimentacao' })}
            />
            <ComponentIcon
              source={Icon.icnDespesas}
              label={'Despesas'}
              onPress={() => viagemId && props.navigation.navigate('displayDespesas', { viagemId, tipoDespesa: 'despesa' })}
            />
          </View>
          <View style={Style.containerHorizontal}>
            <ComponentIcon
              source={Icon.icnDiario}
              label={'Diario'}
              onPress={() => viagemId && props.navigation.navigate('displayDiario', { viagemId, tipoDespesa: 'diario' })}
            />
            <ComponentIcon
              source={Icon.icnEstacionamento}
              label={'Estacionamento'}
              onPress={() => viagemId && props.navigation.navigate('displayDespesas', { viagemId, tipoDespesa: 'estacionamento' })}
            />
            <ComponentIcon
              source={Icon.icnHospedagem}
              label={'Hospedagem'}
              onPress={() => viagemId && props.navigation.navigate('displayDespesas', { viagemId, tipoDespesa: 'hospedagem' })}
            />
          </View>
          <View style={Style.containerHorizontal}>
            <ComponentIcon
              source={Icon.icnManutencao}
              label={'Manutenção'}
              onPress={() => viagemId && props.navigation.navigate('displayDespesas', { viagemId, tipoDespesa: 'manutencao' })}
            />
            <ComponentIcon
              source={Icon.icnPasseio}
              label={'Passeio'}
              onPress={() => viagemId && props.navigation.navigate('displayDespesas', { viagemId, tipoDespesa: 'passeio' })}
            />
            <ComponentIcon
              source={Icon.icnPedagio}
              label={'Pedágio'}
              onPress={() => viagemId && props.navigation.navigate('displayDespesas', { viagemId, tipoDespesa: 'pedagio' })}
            />
          </View>
          <View style={Style.containerHorizontal}>
            <ComponentIcon
              source={Icon.icnEstatistica}
              label={'Estatisticas'}
              onPress={() => viagemId && props.navigation.navigate('estatisticas', {viagemId})}

            />

            <ComponentIcon
              source={Icon.icnAtualizar}
              label={'Atualizar Rodagem'}
              onPress={() => viagemId && props.navigation.navigate('atualizarRodagem', {kilometragemParcial : viagemSelecionada.kilometragemParcial, kilometragemInicial : viagemSelecionada.kilometragemInicial, viagemId })}
            />

            <ComponentIcon
              source={Icon.icnViagem}
              label={'Editar Viagem'}
              onPress={() => viagemId && props.navigation.navigate("createTrip", { viagemId })}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default MainMenu;
