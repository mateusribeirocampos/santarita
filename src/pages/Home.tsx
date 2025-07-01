import { Calendar, Clock, Heart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center resize"
        style={{
          backgroundImage: 'url("assets/igreja.png")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Igreja Santa Rita de Cássia
            </h1>
            <p className="text-xl md:text-2xl">Oração, fé e comunidade</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/events" className="block w-full">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center h-full">
              <Calendar className="h-12 w-12 mx-auto text-blue-700 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Eventos</h2>
              <p className="text-gray-600">
                Junte-se a nós para celebrações especiais e reuniões
                comunitárias
              </p>
            </div>
          </Link>

          <Link to="/schedule" className="block w-full">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center h-full">
              <Clock className="h-12 w-12 mx-auto text-blue-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Horário da missa</h3>
              <p className="text-gray-600">
                Veja nossos horários regulares de missa e serviços especiais
              </p>
            </div>
          </Link>

          <Link to="/tithe" className="block w-full">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center h-full">
              <Heart className="h-12 w-12 mx-auto text-blue-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Faça a sua doação</h3>
              <p className="text-gray-600">Apoie nossa igreja e suas missões</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Mensagem de Boas-vindas do Nosso Padre
          </h2>
          <p className="text-gray-600 mb-6">
            Queridos irmãos e irmãs em Cristo, somos abençoados por tê-los como
            parte de nossa comunidade. A Igreja Santa Rita de Cássia é uma
            família de fiéis que se reúnem para adorar, aprender e crescer em
            nossa fé.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
          >
            Leia mais
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-blue-700">Mensagem Completa do Padre</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="text-gray-700">
                <p className="mb-4">
                  Queridos paroquianos e visitantes,
                </p>
                <p className="mb-4">
                  É com imensa alegria que os recebo em nossa comunidade paroquial. Nossa igreja é mais do que um edifício - é um lar espiritual onde todos são bem-vindos para crescer na fé, compartilhar momentos de oração e construir laços fraternos.
                </p>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-xl font-semibold mb-3 text-blue-700">
                  Horários de Atendimento
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Segunda a Sexta: 14h às 17h</li>
                  <li>Sábado: 9h às 11h</li>
                  <li>Domingo: Após as missas</li>
                </ul>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-xl font-semibold mb-3 text-blue-700">
                  Agendamentos e Contato
                </h4>
                <div className="text-gray-600">
                  <p>Secretaria Paroquial:</p>
                  <p>Telefone: (11) 4002-8922</p>
                  <p>WhatsApp: (11) 98765-4321</p>
                  <p>Email: contato@igrejasantarita.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
