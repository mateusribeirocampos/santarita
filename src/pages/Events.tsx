import { Calendar, Users, Music } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Celebração de Páscoa",
      date: "31  Março, 2025",
      time: "10:00 AM",
      description: "Junte-se a nós para nossa celebração especial da missa de Domingo de Páscoa.",
      image: "/assets/pascoa.jpg",
      type: "Missa"
    },
    {
      id: 2,
      title: "Comunidade",
      date: "6 de abril, 2025",
      time: "9:00 AM",
      description: "Junte-se a nós para ajudar a servir nossa comunidade local através de vários programas de assistência.",
      image: "/assets/comunidade.jpg",
      type: "Serviço"
    },
    {
      id: 3,
      title: "Grupo de jovens",
      date: "13 de abril, 2025",
      time: "4:00 PM",
      description: "Reunião semanal para os jovens discutirem a fé e construírem comunidade.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80",
      type: "Juventude"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Próximos eventos</h1>
        <p className="text-xl text-gray-600">Junte-se a nós em nossas reuniões e celebrações comunitárias</p>
      </div>

      {/* Event Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <Calendar className="h-12 w-12 mx-auto text-blue-700 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Eventos litúrgicos</h3>
          <p className="text-gray-600">Missas especiais e celebrações religiosas</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <Users className="h-12 w-12 mx-auto text-blue-700 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Eventos da Comunidade</h3>
          <p className="text-gray-600">Reuniões comunitárias</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <Music className="h-12 w-12 mx-auto text-blue-700 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Eventos Culturais</h3>
          <p className="text-gray-600">Música, arte, e celebrações culturais</p>
        </div>
      </div>

      {/* Event List */}
      <div className="space-y-8">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:w-48"
                  src={event.image}
                  alt={event.title}
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-blue-700 font-semibold">
                  {event.type}
                </div>
                <h2 className="block mt-1 text-2xl font-semibold text-gray-900">
                  {event.title}
                </h2>
                <div className="mt-2 text-gray-600">
                  <p className="font-medium">{event.date} at {event.time}</p>
                  <p className="mt-2">{event.description}</p>
                </div>
                <div className="mt-4">
                  <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
                    Leia mais
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Download */}
      <div className="mt-12 text-center">
        <button className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
          <Calendar className="h-5 w-5 mr-2" />
          Baixar calendário completo
        </button>
      </div>
    </div>
  );
};

export default Events;