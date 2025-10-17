const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const statusDiv = document.getElementById('status');
const resultadoDiv = document.getElementById('resultado');

function mostrarStatus(mensagem, sucesso = true) {
    statusDiv.innerHTML = `**Status:** ${mensagem}`;
    statusDiv.style.color = sucesso ? 'green' : 'red';
}

function mostrarResultado(dados) {
    resultadoDiv.innerHTML = '<h4>Dados/Resposta do Servidor:</h4>';
    // Converte o objeto de dados para uma string JSON formatada para melhor visualização
    resultadoDiv.innerHTML += `<pre>${JSON.stringify(dados, null, 2)}</pre>`;
}

// ----------------------------------------------------
// 1. OBTER DADOS (GET)
// ----------------------------------------------------
async function Obter_dados() {
    mostrarStatus("Iniciando requisição GET...", true);
    try {
        // GET: Por padrão, o fetch faz uma requisição GET se o método não for especificado.
        // Adicionamos ?_limit=5 para buscar apenas 5 posts para simplificar a visualização.
        const response = await fetch(API_URL + '?_limit=5'); 

        // Verifica se a resposta foi bem-sucedida (status 200-299)
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        // Converte a resposta do corpo para o formato JSON
        const dados = await response.json(); 
        mostrarStatus("GET realizado com sucesso!", true);
        mostrarResultado(dados);

    } catch (error) {
        mostrarStatus(`Falha na requisição GET: ${error.message}`, false);
        resultadoDiv.innerHTML = 'Erro ao buscar dados.';
    }
}

// ----------------------------------------------------
// 2. SALVAR DADOS (POST)
// ----------------------------------------------------
async function Salvar_dados() {
    mostrarStatus("Iniciando requisição POST...", true);
    
    // Dados a serem enviados no corpo da requisição (novo post)
    const novoPost = {
        title: 'Meu Novo Post com Fetch',
        body: 'Este é o conteúdo do post criado via POST.',
        userId: 1
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST', // Especifica o método POST
            headers: {
                // Informa ao servidor que estamos enviando dados JSON
                'Content-Type': 'application/json' 
            },
            // Converte o objeto JavaScript em uma string JSON para envio
            body: JSON.stringify(novoPost) 
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const dados = await response.json(); 
        // JSONPlaceholder retorna o objeto que criamos + um ID (geralmente 101)
        mostrarStatus("POST realizado com sucesso! Novo recurso criado.", true);
        mostrarResultado(dados);

    } catch (error) {
        mostrarStatus(`Falha na requisição POST: ${error.message}`, false);
        resultadoDiv.innerHTML = 'Erro ao salvar dados.';
    }
}

// ----------------------------------------------------
// 3. ATUALIZAR DADOS (PUT)
// ----------------------------------------------------
async function Atualizar_dados() {
    // PUT precisa do ID do recurso que será atualizado na URL
    const POST_ID = 1; 
    mostrarStatus(`Iniciando requisição PUT para o ID ${POST_ID}...`, true);

    const dadosAtualizados = {
        id: POST_ID, // É boa prática incluir o ID no corpo
        title: 'Título ATUALIZADO com PUT',
        body: 'Este post foi completamente substituído pelo método PUT.',
        userId: 1
    };

    try {
        const response = await fetch(`${API_URL}/${POST_ID}`, {
            method: 'PUT', // Especifica o método PUT
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const dados = await response.json();
        // JSONPlaceholder retorna o objeto atualizado
        mostrarStatus(`PUT realizado com sucesso! Post ID ${POST_ID} atualizado.`, true);
        mostrarResultado(dados);

    } catch (error) {
        mostrarStatus(`Falha na requisição PUT: ${error.message}`, false);
        resultadoDiv.innerHTML = 'Erro ao atualizar dados.';
    }
}

// ----------------------------------------------------
// 4. EXCLUIR DADOS (DELETE)
// ----------------------------------------------------
async function Excluir_dados() {
    // DELETE precisa do ID do recurso que será excluído na URL
    const POST_ID = 1; 
    mostrarStatus(`Iniciando requisição DELETE para o ID ${POST_ID}...`, true);

    try {
        const response = await fetch(`${API_URL}/${POST_ID}`, {
            method: 'DELETE' // Especifica o método DELETE
            // DELETE geralmente não precisa de 'body' ou 'headers'
        });

        // O status de sucesso para DELETE é geralmente 200 (OK) ou 204 (No Content)
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        
        // Embora a API jsonplaceholder retorne um objeto vazio, o recurso é considerado excluído
        const dados = await response.json(); 
        mostrarStatus(`DELETE realizado com sucesso! Post ID ${POST_ID} excluído.`, true);
        mostrarResultado(dados);

    } catch (error) {
        mostrarStatus(`Falha na requisição DELETE: ${error.message}`, false);
        resultadoDiv.innerHTML = 'Erro ao excluir dados.';
    }
}
