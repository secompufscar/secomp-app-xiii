export interface Sponsor {
  name: string;
  logo: undefined;
  description: string;
  tags: string[];
  starColor: string;
  link: string;
}

export const sponsors: Sponsor[] = [
  {
    name: "Magalu Cloud",
    logo: require(`../../../assets/sponsors/magalu.png`),
    description:
      "Magalu Cloud é a plataforma de serviços em nuvem do Magazine Luiza, focada em soluções digitais para empresas, como hospedagem de sites, armazenamento e infraestrutura de TI.",
    tags: ["Hackathon", "Feira Empresarial", "Palestra"],
    starColor: "#4B8BF5", // Diamante
    link: "https://magalu.cloud/",
  },
  {
    name: "Tractian",
    logo: require(`../../../assets/sponsors/tractian.png`),
    description:
      "A Tractian é uma startup brasileira fundada em 2019 que oferece soluções de manutenção preditiva para indústrias, utilizando sensores IoT e inteligência artificial para monitorar a saúde de máquinas e prever falhas.",
    tags: ["Hackathon", "Feira Empresarial"],
    starColor: "#F3C83D", // Ouro
    link: "https://tractian.com/tracos-cmms?utm_source=google&utm_medium=cpc&utm_campaign=bra-conversion-institutional-produtos-cold-google-search-standard&utm_term=kw-tracos&utm_content=tractian%20ai&gad_source=1&gad_campaignid=21379056843&gbraid=0AAAAACa-O1FgQ4Xa1ZqFsvAyAjlIc0c6_&gclid=Cj0KCQjwotDBBhCQARIsAG5pinNUSz_O2MAdlD9labkx_BfAungPFxfy_p3E2oTrOQJfpOGV0B3ximsaAoMTEALw_wcB",
  },
  {
    name: "Alura",
    logo: require(`../../../assets/sponsors/alura.png`),
    description:
      "A Alura é uma plataforma de ensino online focada em tecnologia, oferecendo cursos de programação, design, data science, UX, front-end, back-end e muito mais.",
    tags: ["Desafio M@U", "CTF"],
    starColor: "#B8D1E0", // Prata
    link: "https://www.alura.com.br/",
  },
];
