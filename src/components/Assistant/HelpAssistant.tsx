'use client';

import { useState } from 'react';
import { FiHelpCircle, FiX, FiMessageCircle, FiUser, FiShoppingBag } from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ComponentType;
  questions: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: 'Para Moradores',
    icon: FiUser,
    questions: [
      {
        question: 'Como faço para comprar um produto?',
        answer: 'Para comprar um produto, basta navegar pelas categorias ou usar a busca, encontrar o item desejado e clicar em "Comprar". Você será direcionado para o chat com o vendedor para combinar os detalhes.'
      },
      {
        question: 'Como posso confiar nos vendedores?',
        answer: 'Todos os vendedores são moradores do condomínio e passam por uma verificação. Além disso, temos um sistema de avaliações e comentários para ajudar na sua decisão.'
      },
      {
        question: 'Posso vender meus próprios produtos?',
        answer: 'Sim! Qualquer morador pode vender produtos ou serviços. Basta criar uma conta e começar a anunciar na categoria desejada.'
      }
    ]
  },
  {
    title: 'Para Vendedores',
    icon: FiShoppingBag,
    questions: [
      {
        question: 'Como anunciar meus produtos?',
        answer: 'Após criar sua conta como vendedor, você pode clicar em "Novo Anúncio", escolher a categoria, adicionar fotos, descrição e preço do seu produto ou serviço.'
      },
      {
        question: 'Como recebo os pagamentos?',
        answer: 'Os pagamentos são combinados diretamente com o comprador. Você pode aceitar PIX, dinheiro ou outras formas de pagamento de sua preferência.'
      },
      {
        question: 'Existe alguma taxa para vender?',
        answer: 'Não cobramos nenhuma taxa ou comissão sobre as vendas. O app é totalmente gratuito para moradores do condomínio.'
      }
    ]
  },
  {
    title: 'Dúvidas Gerais',
    icon: FiMessageCircle,
    questions: [
      {
        question: 'O app é seguro?',
        answer: 'Sim! Todos os usuários são moradores verificados do condomínio. Além disso, todas as conversas são registradas e monitoradas para garantir a segurança de todos.'
      },
      {
        question: 'Como funciona a entrega?',
        answer: 'Por ser dentro do condomínio, vendedor e comprador podem combinar o melhor local e horário para a entrega, tornando o processo mais prático e seguro.'
      },
      {
        question: 'Posso fazer reclamações?',
        answer: 'Sim, temos um canal de suporte onde você pode reportar problemas, fazer sugestões ou reclamações. Sua opinião é muito importante para melhorarmos o app.'
      }
    ]
  }
];

export function HelpAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<FAQItem | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
      >
        <FiHelpCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-xl">
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedCategory(null);
                setSelectedQuestion(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>

            {!selectedCategory ? (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                  Como podemos ajudar?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {faqData.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.title}
                        onClick={() => setSelectedCategory(category)}
                        className="p-4 border rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors text-center group"
                      >
                        <Icon size={24} className="mx-auto mb-2 text-red-600 group-hover:text-red-700" />
                        <h3 className="font-medium text-gray-800">{category.title}</h3>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : !selectedQuestion ? (
              <>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mb-4 text-red-600 hover:text-red-700 flex items-center"
                >
                  <FiX size={16} className="mr-1" /> Voltar para categorias
                </button>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{selectedCategory.title}</h2>
                <div className="space-y-2">
                  {selectedCategory.questions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedQuestion(item)}
                      className="w-full text-left p-3 border rounded hover:border-red-500 hover:bg-red-50 transition-colors text-gray-700"
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="mb-4 text-red-600 hover:text-red-700 flex items-center"
                >
                  <FiX size={16} className="mr-1" /> Voltar para perguntas
                </button>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{selectedQuestion.question}</h2>
                <p className="text-gray-600 leading-relaxed">{selectedQuestion.answer}</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
} 