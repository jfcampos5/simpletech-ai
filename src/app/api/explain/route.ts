import { NextRequest, NextResponse } from 'next/server';

/* ================================
   TIPOS
================================ */
type Nivel = 'iniciante' | 'intermediario' | 'avancado';

type Intencao =
  | 'definicao'
  | 'aprofundar'
  | 'exemplo'
  | 'exercicio'
  | 'ensinar'
  | 'confirmar'
  | 'geral';

interface ConteudoNivel {
  definicao: string[];
  aprofundamento: string[];
  exemplos: string[];
}

interface Conteudo {
  conteudo: Record<Nivel, ConteudoNivel>;
  exercicios: any[];
}

/* ================================
   MEMÓRIA
================================ */
let ultimoTopico: string | null = null;
let profundidade = 0;
let nivelAtual: Nivel = 'iniciante';

/* === MODO APRENDIZADO === */
let modoAprendizado: {
  topico: string;
  etapa: 'definicao' | 'aprofundamento' | 'exemplo';
} | null = null;

/* ================================
   BASE FIXA
================================ */
const baseConhecimento: Record<string, Conteudo> = {
  JavaScript: {
    conteudo: {
      iniciante: {
        definicao: ['JavaScript deixa páginas web interativas.'],
        aprofundamento: ['Reage a eventos do usuário.'],
        exemplos: ['alert("Olá");']
      },
      intermediario: {
        definicao: ['JavaScript é uma linguagem de programação web.'],
        aprofundamento: ['Manipula DOM e consome APIs.'],
        exemplos: ['fetch("/api")']
      },
      avancado: {
        definicao: ['JavaScript é orientado a eventos e protótipos.'],
        aprofundamento: ['Executa no browser e no Node.js.'],
        exemplos: ['async/await']
      }
    },
    exercicios: []
  }
};

/* ================================
   BASE DINÂMICA (APRENDIDA)
================================ */
const baseDinamica: Record<string, Conteudo> = {};

/* ================================
   UTILIDADES
================================ */
function detectarIntencao(texto: string): Intencao {
  if (texto === 'sim') return 'confirmar';
  if (texto.includes('ensinar')) return 'ensinar';
  if (texto.includes('explique mais')) return 'aprofundar';
  if (texto.includes('exemplo')) return 'exemplo';
  if (texto.includes('o que é')) return 'definicao';
  return 'geral';
}

/* ================================
   API
================================ */
export async function POST(req: NextRequest) {
  try {
    const { pergunta } = await req.json();
    const texto = pergunta.toLowerCase();
    const intencao = detectarIntencao(texto);

    /* ================================
       FLUXO DE APRENDIZADO
    ================================ */
    if (modoAprendizado) {
      const { topico, etapa } = modoAprendizado;

      if (!baseDinamica[topico]) {
        baseDinamica[topico] = {
          conteudo: {
            iniciante: {
              definicao: [],
              aprofundamento: [],
              exemplos: []
            },
            intermediario: {
              definicao: [],
              aprofundamento: [],
              exemplos: []
            },
            avancado: {
              definicao: [],
              aprofundamento: [],
              exemplos: []
            }
          },
          exercicios: []
        };
      }

      const base = baseDinamica[topico].conteudo.iniciante;

      if (etapa === 'definicao') {
        base.definicao.push(pergunta);
        modoAprendizado.etapa = 'aprofundamento';
        return NextResponse.json({
          resposta: 'Perfeito! Agora me diga um aprofundamento.'
        });
      }

      if (etapa === 'aprofundamento') {
        base.aprofundamento.push(pergunta);
        modoAprendizado.etapa = 'exemplo';
        return NextResponse.json({
          resposta: 'Ótimo! Agora me dê um exemplo.'
        });
      }

      if (etapa === 'exemplo') {
        base.exemplos.push(pergunta);
        modoAprendizado = null;
        return NextResponse.json({
          resposta: 'Aprendido com sucesso! ✅ Já posso responder sobre esse tema.'
        });
      }
    }

    /* ================================
       DETECÇÃO DE TEMA
    ================================ */
    const tema =
      Object.keys(baseConhecimento).find(t =>
        texto.includes(t.toLowerCase())
      ) ||
      Object.keys(baseDinamica).find(t =>
        texto.includes(t.toLowerCase())
      );

    if (!tema) {
      const novoTema = pergunta.replace('o que é', '').trim();
      modoAprendizado = {
        topico: novoTema,
        etapa: 'definicao'
      };
      return NextResponse.json({
        resposta: `Ainda não conheço "${novoTema}". Você quer me ensinar?`
      });
    }

    const base =
      baseConhecimento[tema]?.conteudo[nivelAtual] ||
      baseDinamica[tema]?.conteudo[nivelAtual];

    if (!base) {
      return NextResponse.json({
        resposta: 'Erro ao acessar o conteúdo.'
      });
    }

    /* ================================
       RESPOSTAS NORMAIS
    ================================ */
    if (intencao === 'definicao') {
      profundidade = 0;
      return NextResponse.json({
        resposta: base.definicao[0]
      });
    }

    if (intencao === 'aprofundar') {
      const resp =
        base.aprofundamento[profundidade] ||
        'Quer um exemplo prático?';
      profundidade++;
      return NextResponse.json({ resposta: resp });
    }

    if (intencao === 'exemplo') {
      return NextResponse.json({
        resposta: base.exemplos[0]
      });
    }

    return NextResponse.json({
      resposta:
        base.definicao[0] +
        ' ' +
        (base.aprofundamento[0] || '')
    });

  } catch {
    return NextResponse.json(
      { resposta: 'Erro interno.' },
      { status: 500 }
    );
  }
}
