export const RADIO_API_SERVERS = [
  "https://de1.api.radio-browser.info",
  "https://nl1.api.radio-browser.info",
  "https://us1.api.radio-browser.info",
];

export const DEFAULT_COUNTRY_CODE = "CL";

export const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || "f09c0d582d57f99582dc7ec273da3c6e";

export const TOP_STATIONS = [
  {
    stationuuid: "acogida-chile",
    name: "Acogida - Entre Lagos",
    country: "Chile",
    favicon: "/radioAcogida.png",
    url_resolved: "https://streaming.chiloestreaming.com/8018/stream",
    codec: "mp3",
  },
  {
    stationuuid: "lared-argentina",
    name: "La Red 910 - Buenos Aires",
    country: "Argentina",
    favicon: "/radioLaRed910.jpg",
    url_resolved: "https://26573.live.streamtheworld.com/LA_RED_AM910AAC_SC",
    codec: "aac",
  },
  {
    stationuuid: "correio-joaopessoa",
    name: "Correio - João Pessoa",
    country: "Brasil",
    favicon: "/radioCorreioJP.png",
    url_resolved: "https://shout25.crossradio.com.br:18066/live",
    codec: "mp3",
  },
  {
    stationuuid: "cbn-joaopessoa",
    name: "CBN - João Pessoa",
    country: "Brasil",
    favicon: "/radioCbnJP.jpg",
    url_resolved: "https://servidor25.brlogic.com:7018/live",
    codec: "mp3",
  },
  {
    stationuuid: "sucesso-joaopessoa",
    name: "Sucesso - João Pessoa",
    country: "Brasil",
    favicon: "/radioSucessoJP.png",
    url_resolved: "https://streaming.engelhosting.com.br:10032/stream",
    codec: "mp3",
  },
  {
    stationuuid: "arepuan-joaopessoa",
    name: "Arepuan João Pessoa",
    country: "Brasil",
    favicon: "/radioArepuanJP.png",
    url_resolved: "https://streaming.engelhosting.com.br:10026/stream",
    codec: "mp3",
  },
  {
    stationuuid: "clube-brasilia",
    name: "Clube FM - Brasilia",
    country: "Brasil",
    favicon: "/radioClubeBR.png",
    url_resolved: "https://8157.brasilstream.com.br/stream",
    codec: "mp3",
  },
  {
    stationuuid: "cabobranco-joaopessoa",
    name: "Cabo Branco - João Pessoa",
    country: "Brasil",
    favicon: "/radioCaboBranco.png",
    url_resolved: "https://servidor20.brlogic.com:7086/live",
    codec: "mp3",
  },
];