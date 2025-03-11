import { Scroll, BookOpen, Church } from "lucide-react";

const ChurchSR = () => {
  const timeline = [
    {
      year: "2014",
      title: "Fundação",
      description:
        "A Igreja foi criada para servir a crescente comunidade católica da região.",
      image: "assets/bairrosantarita.jpg",
    },
    {
      year: "2016",
      title: "Construção da Igreja",
      description:
        "A construção de nossa bela igreja começou, financiada por generosas doações da comunidade.",
      image: "assets/IgrejaConstrucao.jpg",
    },
    {
      year: "2018",
      title: "Centro Comunitário",
      description:
        "O centro comunitário da paróquia foi construído para acomodar as crescentes atividades e programas comunitários.",
      image:
        "assets/Frente.png",
    },
    {
      year: "2023",
      title: "Jubileu de Ouro",
      description: "Celebração de 50 anos de fé, comunidade e serviço.",
      image:
        "assets/igreja.png",
    },
  ];

  const priests = [
    {
      name: "Pe. José Silva",
      years: "1950-1965",
      description:
        "Fundador da paróquia que estabeleceu a comunidade e supervisionou a construção da igreja.",
    },
    {
      name: "Pe. Moisés Oliveira",
      years: "1965-1990",
      description:
        "Levou a paróquia através de um crescimento significativo e estabeleceu muitos programas comunitários.",
    },
    {
      name: "Pe. Roberto Da Silva",
      years: "1990-2010",
      description:
        "Modernizou as instalações da paróquia e expandiu os programas de alcance.",
    },
    {
      name: "Pe. Antônio Santos",
      years: "2010-Present",
      description:
        "Padre atual focado em ministério juvenil e evangelização digital.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          História da Igreja Santa Rita
        </h1>
        <p className="text-xl text-gray-600">
        Uma jornada de fé através dos anos
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Church className="h-12 w-12 text-blue-700" />
          </div>
          <p className="text-lg text-gray-700 text-center mb-6">
            A Igreja Católica Santa Rita de Cássia tem servido nossa comunidade
            por mais de 30 anos. Nossa paróquia cresceu de uma pequena reunião
            de fiéis para uma comunidade vibrante de milhares de famílias,
            unidas na fé e no serviço..
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Scroll className="h-6 w-6 text-blue-700 mr-2" />
          <h2 className="text-3xl font-bold">História da nossa igreja</h2>
        </div>
        <div className="space-y-12">
          {timeline.map((event, index) => (
            <div key={index} className="relative">
              <div
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className="flex-1">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    {event.year}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Pastors */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="flex items-center mb-8">
          <BookOpen className="h-6 w-6 text-blue-700 mr-2" />
          <h2 className="text-3xl font-bold">Our Pastors Through the Years</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {priests.map((priest, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{priest.name}</h3>
              <p className="text-blue-700 font-medium mb-3">{priest.years}</p>
              <p className="text-gray-600">{priest.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <p className="text-lg text-gray-600 mb-4">
          Quer contribuir para a história da nossa paróquia? <br />
          Compartilhe suas memórias e fotos conosco.
        </p>
        <button className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors">
          Compartilhe nossa história
        </button>
      </div>
    </div>
  );
};

export default ChurchSR;
