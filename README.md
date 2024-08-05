<h1 align="center" style="font-weight: bold;">Projeto App de Receitas</h1>

<p align="center">
    <b>Um app de receitas utilizando o que há de mais moderno dentro do ecossistema React: Hooks e Context API!</b>
</p>
<p align="center">
    <b>O layout tem como foco dispositivos móveis. Assim, todos os protótipos estarão desenvolvidos em telas menores(resolução 360 x 640).</b><br>
    Nesse projeto, desenvolvemos um app front-end para mobile com as seguintes funções:
    
- A pessoa que estiver utilizando o app pode procurar uma receita específica
- Explorar receitas com base em diferentes critérios
- Favoritar e fazer as receitas, entre outras funcionalidades.

<br>
<h2>Confira todas as funcionalidades no vídeo abaixo:</h2>

https://github.com/rodriguesrai/project-recipes-app/assets/79939934/22529960-a65a-4a65-8abc-ce663f07d581



<h2 id="technologies">Foi analisado nossa capacidade de:</h2>

- Utilizar a Context API do React para gerenciar estado.
- Utilizar o React Hook useState.
- Utilizar o React Hook useContext.
- Utilizar o React Hook useEffect.
- Criar Hooks customizados.
- Usar a metodologia Kanban para divisão de requisitos entre a equipe de desenvolvimento.
- Desenvolver testes unitários.
</p>

<h2>💻 Principais Tecnologias</h2>

- React
- Typescript
- Styled-components
- Vitest

<h2>Requisitos implementados:</h2>
<details>
  <summary><strong>Detalhes</strong></summary><br />

<h2>Tela de login</h2>

1 - Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login<br>
2 - Desenvolva a tela de maneira que a pessoa consiga escrever seu e-mail no input de email e sua senha no input de senha<br>
3 - Desenvolva a tela de maneira que o formulário só seja válido após o preenchimento de um e-mail válido e de uma senha com mais de 6 caracteres<br>
4 - Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave user<br>
5 - Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login<br>

<h2>Header</h2>
6 - Implemente o header de acordo com a necessidade de cada tela<br>
7 - Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil<br>
8 - Desenvolva o botão de busca que, ao ser clicado, permita a visualização da barra de busca ou a esconda<br>


<h2>Barra de busca – Header</h2>
9 - Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo<br>
10 - Implemente três radio buttons na barra de busca: Ingredient, Name e First letter<br>
11 - Busque na API de comidas caso a pessoa esteja na página de comidas e na API de bebidas caso a pessoa esteja na de bebidas<br>
12 - Redirecione a pessoa usuária para a tela de detalhes da receita caso apenas uma receita seja encontrada (o ID da receita deve constar na URL)<br>
13 - Caso a busca retorne mais de uma receita, renderize as 12 primeiras encontradas e exiba a imagem e o nome de cada uma delas<br>
14 - Exiba um alert caso nenhuma receita seja encontrada<br>

<h2>Menu inferior</h2>
15 - Implemente o menu inferior posicionando-o de forma fixa e contendo dois ícones: um para comidas e outro para bebidas<br>
16 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo<br>
17 - Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior<br>


<h2>Tela principal de receitas</h2>
18 - Carregue as 12 primeiras receitas de comidas ou bebidas, uma em cada card<br>
19 - Implemente os botões de categoria para serem utilizados como filtro<br>
20 - Implemente o filtro das receitas por meio da API ao clicar no filtro de categoria<br>
21 - Implemente o filtro como um toggle, o qual, se for selecionado novamente, fará o app retornar as receitas sem nenhum filtro<br>
22 - Redirecione a pessoa usuária para a tela de detalhes quando ela clicar no card (a rota da tela deve mudar e sua URL deve conter o ID da receita)<br>


<h2>Tela de detalhes de uma receita</h2>
23 - Realize uma request para a API passando o ID da receita que deve estar disponível nos parâmetros da URL<br>
24 - Desenvolva a tela de modo que ela contenha uma imagem da receita, um título, a categoria da receita (em caso de comidas) e se é ou não alcoólica (em caso de bebidas), uma lista de ingredientes (com as quantidades e instruções necessárias), um vídeo do YouTube incorporado e recomendações<br>
25 - Implemente as recomendações (para receitas de comida, a recomendação deverá ser bebida; já para as receitas de bebida, a recomendação deverá ser comida)<br>
26 - Implemente os 6 cards de recomendação, mostrando apenas 2 deles (o scroll é horizontal, similar a um carousel)<br>
27 - Desenvolva um botão de nome "Start Recipe", que deve ficar fixo na parte de baixo da tela o tempo todo<br>
28 - Implemente a solução de forma que, caso a receita já tenha sido feita, o botão "Start Recipe" desapareça<br>
29 - Implemente a solução de modo que, caso a receita tenha sido iniciada mas não finalizada, o texto do botão deve ser "Continue Recipe"<br>
30 - Redirecione a pessoa usuária caso o botão Start Recipe seja clicado (nesse caso, a rota deve mudar para a tela de receita em progresso)<br>
31 - Implemente um botão de compartilhar e um de favoritar a receita<br>
32 - Implemente a solução de forma que, ao clicar no botão de compartilhar, o link de detalhes da receita seja copiado para o clipboard e uma mensagem avisando que ele foi copiado apareça na tela em uma tag HTML<br>
33 - Salve as receitas favoritas no localStorage na chave favoriteRecipes<br>
34 - Implemente o ícone do coração (favorito) de modo que ele fique preenchido caso a receita esteja favoritada e vazio caso contrário<br>
35 - Implemente a lógica no botão de favoritar de modo que, caso ele seja clicado, o ícone de coração mude seu estado atual e, caso esteja preenchido, mude para vazio e vice-versa<br>

<h2>Tela de receita em progresso</h2>
36 - Desenvolva a tela de modo que ela contenha uma imagem da receita, um título, a categoria (em caso de comidas) e se é ou não alcoólico (em caso de bebidas), uma lista de ingredientes (com as quantidades e instruções necessárias)<br>
37 - Desenvolva um checkbox para cada item da lista de ingredientes<br>
38 - Implemente uma lógica que ao clicar no checkbox de um ingrediente, o nome dele deve ser "riscado" da lista<br>
39 - Salve o estado do progresso, que deve ser mantido caso a pessoa atualize a página ou volte para a mesma receita<br>
40 - Desenvolva a lógica de favoritar e compartilhar (a lógica da tela de detalhes de uma receita se aplica aqui)<br>
41 - Implemente a solução de modo que o botão de finalizar receita (Finish Recipe) só esteja habilitado quando todos os ingredientes estiverem "checkados" (marcados)<br>
42 - Redirecione a pessoa usuária após ela clicar no botão de finalizar receita (Finish Recipe) para a página de receitas feitas, cuja rota deve ser /done-recipes<br>

<h2>Tela de receitas feitas</h2>
43 - Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo<br>
44 - Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela apresente: foto da receita, nome, categoria, nacionalidade, data em que a pessoa fez a receita, duas primeiras tags retornadas pela API e botão de compartilhar<br>
45 - Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela apresente: foto da receita, nome, se é alcoólica, data em que a pessoa fez a receita e botão de compartilhar<br>
46 - Desenvolva a solução de modo que o botão de compartilhar copie a URL da tela de detalhes da receita para o clipboard<br>
47 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros<br>
48 - Redirecione a pessoa usuária para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita<br>

<h2>Tela de receitas favoritas</h2>
49 - Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos em comum com a tela de receitas feitas) respeitando os atributos descritos no protótipo<br>
50 - Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela apresente: foto da receita, nome, categoria, nacionalidade, botão de compartilhar e botão de desfavoritar<br>
51 - Desenvolva a tela de modo que, caso a receita do card seja uma bebida, ela apresente: foto da receita, nome, se é alcoólica ou não, botão de compartilhar e botão de desfavoritar<br>
52 - Desenvolva a solução de modo que o botão de compartilhar copie a URL da tela de detalhes da receita para o clipboard<br>
53 - Desenvolva a solução de modo que o botão de desfavoritar remova a receita da lista de receitas favoritas do localStorage e da tela<br>
54 - Implemente dois botões que filtrem as receitas por comida ou bebida e um terceiro que remova todos os filtros<br>
55 - Redirecione a pessoa usuária quando ela clicar na foto ou no nome da receita (nesse caso, a rota deve mudar para a tela de detalhes daquela receita)<br>

<h2>Tela de perfil</h2>
56 - Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo<br>
57 - Implemente a solução de maneira que o e-mail da pessoa usuária esteja visível<br>
58 - Implemente três botões: um de nome Done Recipes, um de nome Favorite Recipes e um de nome Logout<br>
59 - Redirecione a pessoa usuária de modo que, ao clicar no botão de Done Recipes, a rota mude para a tela de receitas feitas<br>
60 - Redirecione a pessoa usuária de modo que, ao clicar no botão de Favorite Recipes, a rota mude para a tela de receitas favoritas<br>
61 - Redirecione a pessoa usuária de modo que, ao clicar no botão Logout, o localStorage seja limpo e a rota mude para a tela de login<br>
</details>

