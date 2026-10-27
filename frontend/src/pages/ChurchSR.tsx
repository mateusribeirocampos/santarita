import { Scroll, BookOpen, Church } from "lucide-react";
import { timelineData, priestsData } from "../data/churchData";
import { getSafeImageUrlWithFallback } from '../utils/imageUtils';

const ChurchSR = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-semibold text-ink mb-4">
          História da Igreja Santa Rita
        </h1>
        <p className="text-xl text-ink-soft">
          Uma jornada de fé através dos anos
        </p>
      </div>

      {/* Introduction */}
      <div className="border border-line p-8 mb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Church className="h-10 w-10 text-wine" strokeWidth={1.5} />
          </div>
          <p className="text-lg text-ink-soft text-center mb-6">
            A Igreja Católica Santa Rita de Cássia tem servido nossa comunidade
            por mais de 30 anos. Nossa paróquia cresceu de uma pequena reunião
            de fiéis para uma comunidade vibrante de milhares de famílias,
            unidas na fé e no serviço.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Scroll className="h-5 w-5 text-wine mr-2" strokeWidth={1.5} />
          <h2 className="font-serif text-2xl font-semibold text-ink">História da nossa igreja</h2>
        </div>
        <div className="space-y-12">
          {timelineData.map((event, index) => (
            <div key={index} className="relative">
              <div
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                } items-center gap-8`}
              >
                <div className="flex-1">
                  <img
                    src={getSafeImageUrlWithFallback(event.image)}
                    alt={event.title}
                    className="w-full h-64 object-cover border border-line"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="font-serif text-2xl font-semibold text-wine mb-2">
                    {event.year}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 text-ink">{event.title}</h3>
                  <p className="text-ink-soft">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Priests */}
      <div className="border border-line p-8">
        <div className="flex items-center mb-8">
          <BookOpen className="h-5 w-5 text-wine mr-2" strokeWidth={1.5} />
          <h2 className="font-serif text-2xl font-semibold text-ink">Nossos Padres ao longo dos anos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {priestsData.map((priest, index) => (
            <div key={index} className="border border-line p-6">
              <h3 className="font-serif text-lg font-semibold mb-2 text-ink">{priest.name}</h3>
              <p className="text-wine font-medium mb-3">{priest.years}</p>
              <p className="text-ink-soft">{priest.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <p className="text-lg text-ink-soft mb-4">
          Quer contribuir para a história da nossa paróquia? <br />
          Compartilhe suas memórias e fotos conosco.
        </p>
        <button className="border border-ink text-ink px-6 py-3 hover:bg-ink hover:text-parchment transition-colors">
          Compartilhe nossa história
        </button>
      </div>
    </div>
  );
};

export default ChurchSR;
