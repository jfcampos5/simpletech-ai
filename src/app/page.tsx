'use client';

import { useState } from 'react';

export default function Home() {
  const [pergunta, setPergunta] = useState('');
  const [mensagens, setMensagens] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(false);

  async function enviarPergunta() {
    if (!pergunta.trim()) return;

    setMensagens(prev => [...prev, `🧠 ${pergunta}`]);
    setPergunta('');
    setCarregando(true);

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta })
      });

      const data = await res.json();

      setMensagens(prev => [...prev, `🤖 ${data.resposta}`]);
    } catch {
      setMensagens(prev => [...prev, '❌ Erro ao responder.']);
    }

    setCarregando(false);
  }

  return (
    <main style={styles.container}>
      <h1>SimpleTech AI</h1>

      <div style={styles.chat}>
        {mensagens.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
        {carregando && <p>🤖 Pensando...</p>}
      </div>

      <div style={styles.inputArea}>
        <input
          value={pergunta}
          onChange={e => setPergunta(e.target.value)}
          placeholder="Digite sua pergunta..."
          style={styles.input}
        />
        <button onClick={enviarPergunta} style={styles.button}>
          Enviar
        </button>
      </div>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    fontFamily: 'Arial'
  },
  chat: {
    background: '#f4f4f4',
    padding: '20px',
    borderRadius: '8px',
    minHeight: '300px'
  },
  inputArea: {
    display: 'flex',
    marginTop: '10px',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px'
  },
  button: {
    padding: '10px 20px',
    cursor: 'pointer'
  }
};
