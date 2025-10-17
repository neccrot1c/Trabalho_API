// Define o endereço base da API.
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
// Encontra um elemento na sua página HTML (que deve ter o ID resultado-div) para exibir uma mensagem simples de sucesso.
const resultadoDiv = document.getElementById('resultado-div');

// Esta função serve apenas para mostrar o resultado da operação de forma organizada.
function exibir(op, dados) {
    // Imprime os dados recebidos no Console do seu navegador.
    console.log(`[${op}] Dados:`, dados);
    // Atualiza a caixa (div) na página com uma mensagem de sucesso.
    resultadoDiv.textContent = `Operação ${op} OK. Veja o console para detalhes.`;
}

// 1. GET 
// O que faz: Pede dados ao servidor.
function obterDados() {
    fetch(API_URL) // Faz a requisição. Por padrão, fetch usa o método GET.
        .then(res => res.json()) // Quando o servidor responde, converte a resposta para o formato de dados que o JavaScript entende (JSON).
        .then(dados => exibir('GET', dados.slice(0, 5))); // Chama a função exibir com os dados recebidos (apenas os 5 primeiros, para simplificar a visualização no console)
}

// 2. POST
function salvarDados() {
    fetch(API_URL, {
        method: 'POST', // indica que queremos criar um novo recurso.
        headers: { 'Content-Type': 'application/json' }, // Diz ao servidor que estamos enviando dados no formato JSON.
        body: JSON.stringify({ title: 'Novo Simples', body: 'Conteúdo simples', userId: 1 }), // É o corpo da mensagem, contendo os dados que queremos salvar (um título, um corpo e um ID de usuário). O JSON.stringify converte o objeto JavaScript em uma string JSON.
    })
    .then(res => res.json()) // A estrutura .then(res => res.json()) é usada para processar a resposta da rede e convertê-la em um objeto JavaScript utilizável.
    .then(dados => exibir('POST', dados));
}

// 3. PUT (Atualizar)
function atualizarDados() {
    fetch(`${API_URL}/1`, { // o que indica que queremos atualizar o post com o ID 1.
        method: 'PUT', //  Indica que queremos substituir o recurso completo com ID 1 pelos novos dados fornecidos no body.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1, title: 'Atualizado Simples', body: 'Corpo simples' }), // contém os novos dados, incluindo o ID 1 para confirmar o que está sendo atualizado
    })
    .then(res => res.json())
    .then(dados => exibir('PUT', dados));
}

// 4. DELETE (Excluir)
function excluirDados() {
    fetch(`${API_URL}/1`, { method: 'DELETE' }) // A URL aponta para o recurso com ID 1, e o método DELETE` diz ao servidor para excluí-lo.
    .then(res => exibir('DELETE', { status: res.status })); // Após a requisição, ele apenas exibe o código de status da resposta (por exemplo, 200 ou 204), pois geralmente não há dados retornados em uma exclusão bem-sucedida.
}