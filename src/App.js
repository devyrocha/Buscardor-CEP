import styles from "./App.module.css";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //01310930/json/

    if (input === "") {
      alert("Preencha algum CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      console.log(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar CEP");
      setInput("");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Buscador CEP</h1>
      <div className={styles.containerInput}>
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className={styles.buttonSearch} onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className={styles.main}>
          <h2>{cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>
            {" "}
            Complemento: {cep.complemento} - {cep.bairro}
          </span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
