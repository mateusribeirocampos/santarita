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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Horário da Missa</h1>
        <p className="text-xl text-gray-600">Junte-se a nós em oração e adoração</p>
      </div>

      {/* Regular Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Sunday Schedule */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Sun className="h-6 w-6 text-blue-700 mr-2" />
            <h2 className="text-2xl font-semibold">Domingo</h2>
          </div>
          <div className="space-y-3">
            {weeklySchedule.sunday.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.time}</span>
                <span className="text-gray-600">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekday Schedule */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-blue-700 mr-2" />
            <h2 className="text-2xl font-semibold">Semana</h2>
          </div>
          <div className="space-y-3">
            {weeklySchedule.weekdays.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.time}</span>
                <span className="text-gray-600">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Saturday Schedule */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Moon className="h-6 w-6 text-blue-700 mr-2" />
            <h2 className="text-2xl font-semibold">Sábado</h2>
          </div>
          <div className="space-y-3">
            {weeklySchedule.saturday.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.time}</span>
                <span className="text-gray-600">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Schedule */}
      <div className="bg-gray-100 rounded-lg shadow-md p-8 mb-12">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-blue-700 mr-2" />
          <h2 className="text-2xl font-semibold">Celebraçõs especiais</h2>
        </div>
        <div className="space-y-8">
          {specialSchedule.map((event, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-blue-700 mb-3">{event.date}</p>
              <div className="space-y-2">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="font-medium">{item.time}</span>
                    <span className="text-gray-600">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recados importantes</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>A programação pode mudar durante dias santos e celebrações especiais</li>
          <li>Chegue 10 minutos antes do início da missa</li>
        </ul>
      </div>
    </div>
  );
};

export default Schedule;