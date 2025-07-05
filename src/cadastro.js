export function setupCadastro(salvarProdutoFirestore) {
  console.log("Setup Cadastro");
  const cadastroContainer = document.getElementById("cadastro-container");
  const resultado = document.getElementById("resultado");
  const btnCadastrar = document.getElementById("btn-cadastrar-produto");

  btnCadastrar.onclick = async () => {
    cadastroContainer.style.display = "block";
    resultado.style.display = "none";
    btnCadastrar.style.display = "none";
    // Carrega o HTML do formulário
    const resp = await fetch("./cadastro.html");
    cadastroContainer.innerHTML = await resp.text();

    // Adiciona eventos ao formulário carregado
    document.getElementById("btn-voltar").onclick = () => {
      cadastroContainer.style.display = "none";
      resultado.style.display = "block";
      btnCadastrar.style.display = "inline-block";
    };

    document.getElementById("form-cadastro").onsubmit = async (e) => {
      console.log("Cadastrando produto");
      e.preventDefault();
      const nome = document.getElementById("nome-produto").value.trim();
      const marca = document.getElementById("marca-produto").value.trim();

      console.log("Cadastrando produto:", nome, marca);
      if (!nome || !marca) return;

      try {
        await salvarProdutoFirestore({ nome, marca });
        document.getElementById("cadastro-status").textContent =
          "✅ Produto cadastrado!";
        document.getElementById("form-cadastro").reset();
      } catch (err) {
        document.getElementById("cadastro-status").textContent =
          "Erro ao cadastrar produto.";
      }
    };
  };
}
