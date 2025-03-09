export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  fullDescription?: string; // HTML permitido para descrições ricas
  image: string;
  type: string;
  location?: string;
}

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Celebração de Páscoa",
    date: "31  Março, 2025",
    time: "10:00 AM",
    description: "Junte-se a nós para nossa celebração especial da missa de Domingo de Páscoa.",
    fullDescription: "<p>Junte-se a nós para celebrar a Ressurreição de Cristo com uma missa especial, seguida de confraternização no salão paroquial.</p><p>Traga sua família e amigos para esta celebração importante.</p>",
    image: "/assets/pascoa.jpg",
    type: "Missa",
    location: "Igreja Principal"
  },
  {
    id: 2,
    title: "Comunidade",
    date: "6 de abril, 2025",
    time: "9:00 AM",
    description: "Junte-se a nós para ajudar a servir nossa comunidade local através de vários programas de assistência.",
    image: "/assets/procissaoOuroFino.jpg",
    type: "Serviço"
  },
  {
    id: 3,
    title: "Grupo de jovens",
    date: "13 de abril, 2025",
    time: "4:00 PM",
    description: "Reunião semanal para os jovens discutirem a fé e construírem comunidade.",
    image: "/assets/youtCatholic2.jpg",
    type: "Juventude"
  }
];