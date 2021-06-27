# Lab API

## Introdução

Esta api foi desenvolvida utilizando Typescript, com o framework AdonisJS e está hospedado no Heroku. Mais informações sobre o funcionamento e instruções de uso abaixo.

## Tecnologias utilizadas

- Node
- Typescript
- AdonisJS
- MySQL
- ESLint (Standard Javascript Style)

## Projeto  
**Estrutura do banco de dados:**  
[![Estrutura do banco](https://i.imgur.com/dHXVfnQ.png)]()

**Estrutura do projeto**:

***app/Models*** - Entidades  
***app/Controllers*** - Controladores  
***app/Services*** - Regras de negócio   
***start/routes.ts*** - Rotas da aplicação  

A maior parte dos arquivos restantes são apenas para configuração do projeto

## Rotas

URL base: https://matheussantiago-labl-api.herokuapp.com/

### **Laboratório**

**GET** - `/laboratories`
*Lista todos os laboratórios ativos*

**GET** - `/laboratories/:nomeExame`
*Lista todos os laboratórios associados ao exame informado*

**POST** - `/laboratories`
*Cadastra um novo laboratório:*  
`{
  "name": string,
  "address": string
}`

**PUT** - `/laboratories/:id`
*Atualiza o laboratório informado:*  
`{
  "name": string,
  "address": string,
  "active": boolean
}`

**DELETE** - `/laboratories/:id`
*Remove logicamente um laboratório (desativa)*  

### **Exame**

Para o campo `examTypeId`, temos duas opções: 1 - Análise clínica e 2 - Imagem

**GET** - `/exams`
*Lista todos os exames ativos*

**POST** - `/exams`
*Cadastra um novo exame:*  
`{
  "name": string,
  "examTypeId": number
}`

**POST** - `/exams/:exameId/associate/:laboratorioId`
*Associa um exame à um laboratório:*  

**POST** - `/exams/:exameId/disassociate/:laboratorioId`
*Desassocia um exame de um laboratório:*  

**PUT** - `/exams/:id`
*Atualiza o exame informado:*  
`{
  "name": string,
  "examTypeId": number,
  "active": boolean
}`

**DELETE** - `/exams/:id`
*Remove logicamente um exame (desativa)*

