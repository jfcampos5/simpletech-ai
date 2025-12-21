// /app/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

interface Mensagem {
  id: number;
  tipo: 'usuario' | 'ia';
  texto: string;
  tema?: string;
}

export default function Home() {
  const [pergunta, setPergunta] = useState('');
  const [nivel, setNivel] = useState<'iniciante' | 'intermediario'>('iniciante');
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [carregando, setCarregando] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollParaFim = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollParaFim();
  }, [mensagens, carregando]);

  const enviarPergunta = async () => {
    if (!pergunta.trim()) return;

    const novaMensagem: Mensagem = {
      id: Date.now(),
      tipo: 'usuario',
      texto: pergunta
    };

    setMensagens(prev => [...prev, novaMensagem]);
    setCarregando(true);
    setPergunta('');

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta, nivel })
      });

      const data = await res.json();

      const mensagemIA: Mensagem = {
        id: Date.now() + 1,
        tipo: 'ia',
        texto: '',
        tema: data.tema || ''
      };

      setMensagens(prev => [...prev, mensagemIA]);

      // efeito de digitação
      let index = 0;
      const textoCompleto = data.resposta;
      const interval = setInterval(() => {
        setMensagens(prev => {
          const copia = [...prev];
          const ultimaIndex = copia.findIndex(m => m.id === mensagemIA.id);
          if (ultimaIndex !== -1) {
            copia[ultimaIndex].texto = textoCompleto.slice(0, index + 1);
          }
          return copia;
        });
        index++;
        if (index >= textoCompleto.length) clearInterval(interval);
      }, 20);

    } catch (err) {
      console.error(err);
      setMensagens(prev => [
        ...prev,
        { id: Date.now(), tipo: 'ia', texto: 'Erro ao processar a resposta.' }
      ]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 items-center p-4">
      <div className="w-full max-w-xl flex flex-col h-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-4 text-white font-bold text-xl text-center">
          SimpleTech AI
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {mensagens.map(msg => (
            <div
              key={msg.id}
              className={`max-w-[75%] p-3 rounded-xl shadow-sm break-words ${
                msg.tipo === 'usuario'
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-gray-200 text-gray-900 self-start mr-auto'
              }`}
            >
              {msg.tema && msg.tipo === 'ia' && (
                <div className="text-sm font-semibold text-gray-600 mb-1">
                  Tema detectado: {msg.tema}
                </div>
              )}
              <div>{msg.texto}</div>
            </div>
          ))}
          {carregando && (
            <div className="self-start text-gray-500 italic">IA digitando...</div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="flex p-4 gap-2 border-t bg-gray-50">
          <input
            type="text"
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua pergunta..."
            value={pergunta}
            onChange={e => setPergunta(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') enviarPergunta();
            }}
          />
          <select
            className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nivel}
            onChange={e => setNivel(e.target.value as 'iniciante' | 'intermediario')}
          >
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
          </select>
          <button
            className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
            onClick={enviarPergunta}
            disabled={carregando}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
