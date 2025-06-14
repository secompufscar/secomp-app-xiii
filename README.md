# APP da SECOMP UFSCar
Aplicativo desenvolvido pela equipe de TI da SECOMP UFSCar especialmente para o evento.

Ele é utilizado pelos participantes para realizar a inscrição no evento e em suas atividades, acompanhar novidades e acessar informações importantes. Para a organização, o aplicativo oferece ferramentas que facilitam o controle do evento, como o gerenciamento de atividades e a leitura de presença dos participantes.

<br>

## 📋 Requisitos
Antes de mais nada, certifique-se de ter os seguintes programas instalados:

[![git][git-logo]][git-url] 
[![expo][expo-logo]][expo-url] 
[![node][node-logo]][node-url]

<br>

## ⚙️ Guia de Execução

Clone o repositório
```
git clone https://github.com/secompufscar/secomp-app-xiii.git
```

<br>

Acesse a pasta clonada

```
cd ./secomp-app-xiii
```

<br>

Instale as dependências

```
npm install
```

<br>

Execute o programa

```
npm start
```

<br>

## 💻 Rodar Localmente
Para rodar o aplicativo localmente, siga os passos adicionais abaixo:

1. **Configure o backend** conforme as instruções disponíveis no README do repositório correspondente
2. Ajuste a URL da API no frontend, alterando o arquivo *src/services/api.ts* para refletir o novo endereço local (*seuip:3000*).

<div align="center">
  <br/>
    <div>
      <sub>Copyright © 2024 - <a href="https://github.com/secompufscar">secompufscar</sub></a>
    </div>
</div>

[git-url]: https://git-scm.com/
[git-logo]: https://img.shields.io/badge/Git-f14e32?style=for-the-badge&logo=git&logoColor=white
[expo-url]: https://docs.expo.dev/
[expo-logo]: https://img.shields.io/badge/Expo-3ddc84?style=for-the-badge&logo=expo&logoColor=white
[node-url]: https://nodejs.org/en
[node-logo]: https://img.shields.io/badge/Node-1389fd?style=for-the-badge&logo=javascript&logoColor=white
[demo]: assets/images/demo.gif
