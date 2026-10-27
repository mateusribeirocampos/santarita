import { Clock, Sun, Moon, Calendar } from 'lucide-react';

const Schedule = () => {
  const weeklySchedule = {
    sunday: [
      { time: '8:00 h', title: 'Missa da Manhã' },
      { time: '10:00 h', title: 'Missa da Família' },
      { time: '18:00 h', title: 'Missa da Noite' }
    ],
    weekdays: [
      { time: '7:30 h', title: 'Missa da Manhã' },
      { time: '12:00 h', title: 'Oração do Ângelus' },
      { time: '18:00 h', title: 'Oração da Noite' }
    ],
    saturday: [
      { time: '9:00 h', title: 'Missa da Manhã' },
      { time: '17:00 h', title: 'Missa da Vigília' }
    ]
  };

  const specialSchedule = [
    {
      date: '31 de Março, 2025',
      title: 'Páscoa',
      schedule: [
        { time: '6:00 h', title: 'Missa do Amanhecer' },
        { time: '9:00 h', title: 'Missa da Família' },
        { time: '11:00 h', title: 'Missa Solene' }
      ]
    },
    {
      date: '7 de Abril, 2025',
      title: 'Domingo da Misericórdia',
      schedule: [
        { time: '8:00 h', title: 'Missa da Manhã' },
        { time: '15:00 h', title: 'Oração da Misericórdia' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-semibold text-ink mb-4">Horário da Missa</h1>
        <p className="text-xl text-ink-soft">Junte-se a nós em oração e adoração</p>
      </div>

      {/* Regular Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Sunday Schedule */}
        <div className="border border-line p-6">
          <div className="flex items-center mb-4">
            <Sun className="h-5 w-5 text-wine mr-2" strokeWidth={1.5} />
            <h2 className="font-serif text-xl font-semibold text-ink">Domingo</h2>
          </div>
          <div className="space-y-3">
            {weeklySchedule.sunday.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium text-ink">{item.time}</span>
                <span className="text-ink-soft">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekday Schedule */}
        <div className="border border-line p-6">
          <div className="flex items-center mb-4">
            <Clock className="h-5 w-5 text-wine mr-2" strokeWidth={1.5} />
            <h2 className="font-serif text-xl font-semibold text-ink">Semana</h2>
          </div>
          <div className="space-y-3">
            {weeklySchedule.weekdays.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium text-ink">{item.time}</span>
                <span className="text-ink-soft">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Saturday Schedule */}
        <div className="border border-line p-6">
          <div className="flex items-center mb-4">
            <Moon className="h-5 w-5 text-wine mr-2" strokeWidth={1.5} />
            <h2 className="font-serif text-xl font-semibold text-ink">Sábado</h2>
          </div>
          <div className="space-y-3">
            {weeklySchedule.saturday.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium text-ink">{item.time}</span>
                <span className="text-ink-soft">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Schedule */}
      <div className="border border-line p-8 mb-12">
        <div className="flex items-center mb-6">
          <Calendar className="h-5 w-5 text-wine mr-2" strokeWidth={1.5} />
          <h2 className="font-serif text-2xl font-semibold text-ink">Celebrações especiais</h2>
        </div>
        <div className="space-y-8">
          {specialSchedule.map((event, index) => (
            <div key={index} className="border-b border-line pb-6 last:border-0 last:pb-0">
              <h3 className="font-serif text-xl font-semibold mb-2 text-ink">{event.title}</h3>
              <p className="text-wine mb-3">{event.date}</p>
              <div className="space-y-2">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="font-medium text-ink">{item.time}</span>
                    <span className="text-ink-soft">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-parchment-dim border border-line p-6">
        <h3 className="font-serif text-lg font-semibold mb-4 text-ink">Recados importantes</h3>
        <ul className="list-disc list-inside space-y-2 text-ink-soft">
          <li>A programação pode mudar durante dias santos e celebrações especiais</li>
          <li>Chegue 10 minutos antes do início da missa</li>
        </ul>
      </div>
    </div>
  );
};

export default Schedule;