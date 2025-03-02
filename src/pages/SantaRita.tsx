import { Scroll } from "lucide-react";

export default function SantaRita() {
  const timeline = [
    {
      year: "1381",
      title: "Nascimento",
      description:
        "Santa Rita de Cássia nasceu por volta de 1381, em Roccaporena, um vilarejo localizado no sopé do Monte Rucino, no município de Cássia (Úmbria, Itália). Sinal das Abelhas brancas. Após a solenidade de seu batismo, Rita foi deixada para dormir. Quando seus pais foram observá-la, viram abelhas brancas voando em seu redor, pousando sobre seus lábios, como que depositando mel.",
      image: "assets/birth.jpg",
    },
    {
      year: "1398-1399",
      title: "Infância, juventude e casamento",
      description:
        "Rita teria desejado ser monja, todavia ainda jovem (aos 13 anos) os pais, já idosos, a prometeram em casamento a Paulo Ferdinando Mancini, um homem conhecido pelo seu caráter iroso e brutal. Santa Rita, habituada ao dever não opôs resistência e se casou com o jovem oficial que comandava a guarnição de Collegiacone, presumivelmente entre os 17-18 anos",
      image: "assets/monja.jpg",
    },
    {
      year: "1406-1407",
      title: "Cruzes de morte",
      description:
        "A insistência de suas lágrimas frutificou. Vários biógrafos indicam que aos poucos o temperamento de Paolo mudou substancialmente. Soma-se a isso, o nascimento dos dois filhos do casal: Giangiacomo Antonio e Paolo Maria. Aparentemente, eram dias de harmonia e esperança. Mas o pecado sempre cobra seu salário! E na história de Rita, foi a esposa e mãe exemplar quem teve que sacrificar seu tesouro espiritual. Sua serenidade doméstica não duraria, no entanto, devido à implacável luta faccional da época, na qual o marido de Rita estava envolvido devido a seus laços de parentesco foi assassinado. Para evitar que as crianças procurassem vingança, Rita escondeu a camisa ensanguentada de seu pai.",
      image:
        "assets/ritafilhos.jpg",
    },
    {
      year: "1407-1413",
      title: "Rita e o mosteiro",
      description: "Celebração de Rita procurou as Irmãs Agostinianas do Mosteiro de S. Maria Madalena, em Cássia. Em virtude do histórico violento de seu esposo e das rixas entre seus cunhados e a família dos assassinos, foi-lhe negado o ingresso por três vezes, sendo-lhe permitido somente após uma reconciliação pública entre as famílias. Uma antiga tradição assegura que sua entrada no Mosteiro foi miraculosa: Rita estaria em oração na “rocha”, e foi tomada por seus três santos padroeiros (Santo Agostinho, S. João Batista e São Nicolau de Tolentino) que a transportaram pelos ares para Cássia, introduzindo-o no interior do mosteiro; quando as irmãs a viram, apesar das portas fechadas, convencidas pelo sinal a acolherem.",
      image:
        "assets/ritatressantos.jpg",
    },
    {
      year: "1442-1457",
      title: "Frutos",
      description: "A fim de aprimorar, e provar, o dom da obediência, a Madre Priora pediu que Rita regasse diariamente uma planta seca no jardim. Para surpresa de todos, Rita obedeceu com tamanha perfeição que aquele toco sem vida floresceu e frutificou. Segundo algumas fontes, brotou uma ameixeira, mas para uma antiga tradição, tal planta é a videira que ainda existe, depois de cinco séculos, no Mosteiro de Cássia.",
      image:
        "assets/videira.jpg",
    },
    {
      year: "1446-1457",
      title: "O estigma",
      description: "Se não bastasse todo o sofrimento que a vida lhe ofertara, Rita ansiava por viver na carne uma parcela das dores vividas por Cristo em sua paixão. Este desejo foi a causa de muitas de suas orações, e sua prece foi atendida em 1432: enquanto contemplava o Crucifixo, sentiu um espinho da coroa de Cristo cravar em sua testa, produzindo uma ferida profunda. Para muitos biógrafos, tal ferida era dolorosíssima, com constante sangramento, e expelia um odor pútrido, obrigando Rita a viver isolada das demais religiosas. Tal ferida só desapareceu momentaneamente por ocasião de uma peregrinação à Roma, para a canonização de São Nicolau de Tolentino, em 1446.",
      image:
        "assets/estigma.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Santa Rita de Cássia
        </h1>
        <p className="text-xl text-gray-600"> História de Santa Rita de Cássia</p>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Scroll className="h-6 w-6 text-blue-700 mr-2" />
          <h2 className="text-3xl font-bold">Santa Rita de Cássia</h2>
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
                    className="w-full h-full object-cover rounded-lg shadow-md"
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
    </div>
  );
}
