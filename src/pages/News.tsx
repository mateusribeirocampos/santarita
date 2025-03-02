import { Newspaper, Bell, Search } from 'lucide-react';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Anunciado o calendário da Semana Santa",
      date: "15 de Março, 2025",
      category: "Anúncios",
      image: "assets/semanaSanta.jpg",
      summary: "Participe de nossas celebrações da Semana Santa começando com o Domingo de Ramos.",
      content: "Temos o prazer de anunciar nossa programação da Semana Santa, com serviços especiais do Domingo de Ramos até o Domingo de Páscoa..."
    },
    {
      id: 2,
      title: "Lançamento de novo programa do Ministério Jovem",
      date: "10 de Março, 2025",
      category: "Jovens",
      image: "assets/youthCatholic.jpg",
      summary: "Nosso ministério jovem apresenta novas atividades semanais focadas na formação da fé e na construção da comunidade.",
      content: "A partir do próximo mês, nosso ministério jovem começará um emocionante novo programa com atividades semanais..."
    },
    {
      id: 3,
      title: "Atualização do Projeto de Renovação da Igreja",
      date: "5 de Março, 2025",
      category: "Notícias da Paróquia",
      image: "assets/virgemmariaRenovacao.jpg",
      summary: "A primeira fase do projeto de renovação da nossa igreja foi concluída. Veja o progresso e os próximos planos.",
      content: "Estamos empolgados em anunciar que a primeira fase do nosso projeto de renovação foi concluída com sucesso..."
    }
  ];

  const categories = ["Todos", "Anúncios", "Notícia paroquial", "jovens", "Comunidade", "Eventos"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Notícias e atualizações da paróquia</h1>
        <p className="text-xl text-gray-600">Mantenha-se informado sobre a nossa comunidade paroquial</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === "All"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured News */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div className="relative h-96">
          <img
            src={newsItems[0].image}
            alt={newsItems[0].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center mb-2">
              <Bell className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{newsItems[0].category}</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">{newsItems[0].title}</h2>
            <p className="text-lg mb-4">{newsItems[0].summary}</p>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
              Leia mais →
            </button>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.slice(1).map((item) => (
          <div key={item.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-2">
                <Newspaper className="h-4 w-4 text-blue-700 mr-2" />
                <span className="text-sm font-medium text-blue-700">{item.category}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{item.date}</span>
                <button className="text-blue-700 font-medium hover:text-blue-800">
                  Leia mais →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">Inscreva-se na nossa Newsletter</h3>
        <p className="text-gray-600 mb-6">Fique atualizado com as últimas notícias e anúncios</p>
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Digite seu email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
            Inscreva-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;