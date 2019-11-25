# Aula 1

## Instalação:

```
git clone https://github.com/AnnaNee/reprograma-coding-dojo.git
cd reprograma-n3-backend
npm install
npm start

```

## Exercício 01 - Treinar Pokémons

Você deve criar um novo método que permita treinar o nível de um Pokémon dado os seguintes inputs:

- Data de início em formato timestap (2019-11-25T19:25:04.861Z)
- Data de fim em formato timestamp (2019-11-25T19:25:04.861Z)

Entre uma data e outra, calcule a diferença em horas. A cada 4 horas de treino, 1 nível deve ser adicionado ao treino.
Para o cálculo entre as datas, utilize a fórmula abaixo:

`(Math.abs(new Date(dataInicio) - new Date(dataFim)) / 3600000) / 4`

## Exercício 2 - Treino retroativo

Agora que conseguimos treinar nossos pokémons a partir de uma data de início e fim, precisamos considerar o nível que o pokémon já tem.
Exemplo:

> Pokémon de nível 1 + 20 novos níveis = 21
