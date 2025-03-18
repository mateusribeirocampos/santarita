export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface Priest {
  name: string;
  years: string;
  description: string;
}

export const timelineData: TimelineEvent[] = [
  {
    year: "2014",
    title: "Fundação",
    description: "A Igreja foi criada para servir a crescente comunidade católica da região.",
    image: "assets/bairrosantarita.jpg",
  },
  {
    year: "2016",
    title: "Construção da Igreja",
    description: "A construção de nossa bela igreja começou, financiada por generosas doações da comunidade.",
    image: "assets/IgrejaConstrucao.jpg",
  },
  {
    year: "2018",
    title: "Centro Comunitário",
    description: "O centro comunitário da paróquia foi construído para acomodar as crescentes atividades e programas comunitários.",
    image: "assets/Frente.png",
  },
  {
    year: "2023",
    title: "Jubileu de Ouro",
    description: "Celebração de 50 anos de fé, comunidade e serviço.",
    image: "assets/igreja.png",
  },
];

export const priestsData: Priest[] = [
  {
    name: "Pe. José Silva",
    years: "1950-1965",
    description: "Fundador da paróquia que estabeleceu a comunidade e supervisionou a construção da igreja.",
  },
  {
    name: "Pe. Moisés Oliveira",
    years: "1965-1990",
    description: "Levou a paróquia através de um crescimento significativo e estabeleceu muitos programas comunitários.",
  },
  {
    name: "Pe. Roberto Da Silva",
    years: "1990-2010",
    description: "Modernizou as instalações da paróquia e expandiu os programas de alcance.",
  },
  {
    name: "Pe. Antônio Santos",
    years: "2010-Present",
    description: "Padre atual focado em ministério juvenil e evangelização digital.",
  },
]; 