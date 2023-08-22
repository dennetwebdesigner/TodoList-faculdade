// Elementos HTML
const organizadorDeTarefasEl = document.querySelector(
  "#organizador-de-tarefas"
);
const lista = document.querySelector("#lista");
const butaoAdd = document.querySelector("#add");
const inputAddCompra = document.querySelector("#add-compra");
const butaoAcao = document.querySelectorAll(".acao button");
const rodape = document.querySelector("footer");

// Guarda cada item da lista
const listaDeitems = [];

// quando botão de inserir atualização ou cancelar atualização for clicado
function removerPosAcao(element) {
  delete inputAddCompra.dataset["atualizar"];
  inputAddCompra.value = "";
  inputAddCompra.style.width = "85%";
  element.remove();
}

// Reseta e renderiza na tela a toda a lista
function mostrarLista() {
  lista.innerHTML = "";
  for (let index = 0; index < listaDeitems.length; index++) {
    const element = listaDeitems[index];
    criarTarefa(element, index);
  }
}

// ação de clicar no botao 'E' de editar
//edita item especifico
function editar(index) {
  inputAddCompra.dataset["atualizar"] = index;
  inputAddCompra.value = listaDeitems[index];
  inputAddCompra.focus();

  const botaoCancelar = document.createElement("button");
  botaoCancelar.classList.add("cancelar");
  botaoCancelar.textContent = "-";

  inputAddCompra.style.width = "70%";

  botaoCancelar.onclick = () => removerPosAcao(botaoCancelar);

  rodape.append(botaoCancelar);
}

// ação de clicar no botao 'R' de remover
//remove item especifico
function remover(index) {
  listaDeitems.splice(index, 1);
  mostrarLista();
}

// gera html dinamicamente atraves do javascript e o insere no documento html
function criarTarefa(tarefa, index) {
  const article = document.createElement("article");
  const p = document.createElement("p");
  const div = document.createElement("div");
  const button1 = document.createElement("button");
  const button2 = document.createElement("button");

  article.classList.add("tarefa");
  p.textContent = tarefa;
  div.classList.add("acao");
  button1.textContent = "E";
  button2.textContent = "R";

  button1.onclick = function () {
    editar(index);
  };
  button2.onclick = function () {
    remover(index);
  };

  div.append(button1, button2);
  article.append(p, div);

  lista.append(article);
  inputAddCompra.value = "";
}

// Ação de adicionar um novo item, ou atualizar texto de um item ja existente
butaoAdd.onclick = function () {
  if (inputAddCompra.dataset["atualizar"]) {
    listaDeitems[inputAddCompra.dataset["atualizar"]] = inputAddCompra.value;
    removerPosAcao(document.querySelector(".cancelar"));
    inputAddCompra.value = "";
  } else listaDeitems.push(inputAddCompra.value);
  mostrarLista();
};
