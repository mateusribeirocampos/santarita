import { Calendar, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
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

          <Link to="/events" className="flex items-top scroll-m-0">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <Calendar className="h-12 w-12 mx-auto text-blue-700 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Eventos</h2>
              <p className="text-gray-600">
              Junte-se a nós para celebrações especiais e reuniões
              comunitárias
              </p>
            </div>
            </Link>


          <Link to="/schedule" className="flex items-top scroll-m-0">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <Clock className="h-12 w-12 mx-auto text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Horário da missa</h3>
            <p className="text-gray-600">
              Veja nossos horários regulares de missa e serviços especiais
            </p>
          </div>
          </Link>

          <Link to="/donate" className="flex items-top scroll-m-0">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
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
          <button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
            Leia mais
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
