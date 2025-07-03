const produtos = `
Sabão em pó Omo
Carne de Hambúrguer 
Gatorade
Frango 
Açúcar União
Desinfetante 
Petisco Pedigree
Lasanha Perdigão
Requeijão Nestlé
Leite Italac
Água Sanitária 
Guaraná Antarctica
Pepsi
Pizza 
Ração Golden
Desodorante Rexona
Areia Sanitária Pipicat
Detergente 
Creme Dental 
Ração 
Papel Higiênico
Queijo 
Manteiga 
Macarrão 
Esponja 
Sabonete
Coca-Cola
Água 
Iogurte 
Arroz 
Feijão 
Peixe 
Shampoo
Fanta
Suco Del Valle
Sal Cisne
chocolate
Suco Naturale
`;

GEMINI_PROMPT =
  `
Você receberá uma imagem contendo diversos produtos físicos, como alimentos, bebidas, produtos de limpeza, etc.

Abaixo está uma lista com os nomes dos produtos disponíveis no meu estoque. Sua tarefa é:

Identificar quais produtos da lista estão presentes na imagem.

Para cada produto identificado, tente extrair as seguintes informações visíveis na imagem:

Nome do produto

Tipo (ex: bebida, alimento, limpeza, etc.)

Marca

Data de validade

Se alguma dessas informações não estiver legível ou disponível na imagem, deixe o campo em branco.` +
  `Lista de produtos no estoque:` +
  produtos +
  `
Formato da resposta:
Nome:

Tipo:

Marca:

Data de validade:

Faça isso para cada produto identificado. Ignore produtos que não estejam na lista acima. Baseie-se na aparência visual, logotipos, textos visíveis nos rótulos e outros elementos reconhecíveis.

`;
