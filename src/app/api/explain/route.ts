// /app/api/explain/route.ts
import { NextRequest, NextResponse } from 'next/server';

type Tema = 'Backend' | 'Frontend' | 'IA';
type Nivel = 'iniciante' | 'intermediario';

interface Resposta {
  textos: {
    [key in Nivel]: string[];
  };
  exemplos: string[];
}

// Respostas por tema e nível
const respostasPorTema: Record<Tema, Resposta> = {
  Backend: {
    textos: {
      iniciante: [
        'O Backend é como o motor de um carro: ele faz tudo funcionar por trás das cenas.',
        'É a parte do sistema que processa dados e garante que tudo funcione corretamente.',
        'Responsável por controlar o banco de dados e a lógica do sistema.'
      ],
      intermediario: [
        'O Backend gerencia a lógica do servidor, comunicação com bancos de dados e APIs.',
        'Responsável por processamento de dados, autenticação e autorização de usuários.',
        'É a camada que conecta o Frontend aos dados e funcionalidades do sistema.'
      ]
    },
    exemplos: [
      'Ex.: APIs que conectam o banco de dados ao site.',
      'Ex.: Servidores que processam pedidos de compra.',
      'Ex.: Gerenciamento de usuários e autenticação.'
    ]
  },
  Frontend: {
    textos: {
      iniciante: [
        'O Frontend é o que o usuário vê e interage no site ou app.',
        'É a interface com botões, telas e formulários.',
        'Permite criar páginas e elementos visuais que o usuário utiliza diretamente.'
      ],
      intermediario: [
        'O Frontend envolve o design de interfaces e experiência do usuário.',
        'Responsável por comunicação com o Backend e renderização dinâmica de dados.',
        'Inclui frameworks como React, Vue e Angular para criar aplicações interativas.'
      ]
    },
    exemplos: [
      'Ex.: Botões, menus e páginas do site.',
      'Ex.: Formulários de login ou cadastro.',
      'Ex.: Animações e efeitos visuais.'
    ]
  },
  IA: {
    textos: {
      iniciante: [
        'IA é tecnologia que aprende com dados e ajuda a tomar decisões.',
        'É como ensinar o computador a pensar de forma inteligente.',
        'Permite automatizar tarefas e resolver problemas complexos.'
      ],
      intermediario: [
        'IA utiliza algoritmos de aprendizado de máquina para processar grandes volumes de dados.',
        'Inclui tarefas como classificação, regressão, processamento de linguagem natural e visão computacional.',
        'Permite criar sistemas que aprendem e se adaptam sem programação explícita para cada cenário.'
      ]
    },
    exemplos: [
      'Ex.: Chatbots que respondem perguntas automaticamente.',
      'Ex.: Recomendação de produtos em lojas online.',
      'Ex.: Análise de imagens ou reconhecimento de voz.'
    ]
  }
};

// Respostas específicas para termos/técnicas
const respostasEspecificas: Record<string, string> = {
  html: 'HTML é a linguagem de marcação usada para criar a estrutura de páginas web.',
  css: 'CSS é usado para estilizar páginas web, definindo cores, fontes e layouts.',
  javascript: 'JavaScript é a linguagem de programação usada para tornar páginas web interativas; pode ser usada tanto no Frontend quanto no Backend (Node.js).',
  node: 'Node.js é um ambiente que permite rodar JavaScript no Backend, em servidores.',
  react: 'React é um framework de JavaScript usado para criar interfaces de usuário interativas no Frontend.'
};

// Função para pegar item aleatório de um array
function aleatorio<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Função para detectar tema com base na pergunta
function detectarTema(pergunta: string): Tema {
  const texto = pergunta.toLowerCase();

  if (texto.includes('ia') || texto.includes('inteligência artificial') || texto.includes('machine learning')) {
    return 'IA';
  }

  if (texto.includes('node') || texto.includes('servidor') || texto.includes('banco') || texto.includes('backend')) {
    return 'Backend';
  }

  if (
    texto.includes('javascript') ||
    texto.includes('js') ||
    texto.includes('html') ||
    texto.includes('css') ||
    texto.includes('frontend') ||
    texto.includes('react')
  ) {
    return 'Frontend';
  }

  // Caso ambíguo, default para Frontend
  return 'Frontend';
}

export async function POST(req: NextRequest) {
  try {
    const { pergunta, nivel } = await req.json() as { pergunta: string; nivel: Nivel };

    // Verifica se a pergunta contém termo específico
    const termoEspecifico = Object.keys(respostasEspecificas).find(tech =>
      pergunta.toLowerCase().includes(tech)
    );

    if (termoEspecifico) {
      return NextResponse.json({ resposta: respostasEspecificas[termoEspecifico] });
    }

    // Detecta o tema da pergunta
    const tema = detectarTema(pergunta);

    if (!respostasPorTema[tema]) {
      return NextResponse.json(
        { erro: 'Tema não encontrado. Use: Backend, Frontend ou IA.' },
        { status: 400 }
      );
    }

    const resposta = respostasPorTema[tema];

    // Seleciona texto baseado no nível e exemplo aleatório
    const textosDoNivel = resposta.textos[nivel] || resposta.textos['iniciante'];
    const textoEscolhido = aleatorio(textosDoNivel);
    const exemploEscolhido = aleatorio(resposta.exemplos);

    const respostaFinal = `${textoEscolhido} ${exemploEscolhido}`;

    return NextResponse.json({ resposta: respostaFinal });
  } catch (error) {
    return NextResponse.json({ erro: 'Erro ao processar a requisição.' }, { status: 500 });
  }
}
