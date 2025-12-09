// data/profileSystems.ts
export type Segment = "econom" | "standard" | "premium";
export type Brand = "ViknaNovi" | "WDS" | "Kommerling" | "Profine";

export interface ProfileSystem {
  id: string;
  brand: Brand;
  segment: Segment;
  code: string; // WR 400, 5S, 88 тощо
  name: {
    uk: string;
    ru: string;
  };
  image: string;
  // flag: string; // іконка прапора
  params: {
    frameChambers: number;
    sashChambers: number;
    mountDepthMm: number;
    glassWidthMm: string;
    frameOuterHeightMm: number;
    frameInnerHeightMm: number;
  };
  soundStars: number; // 0–5
  thermalStars: number; // 0–5
  lamination: boolean;
}

export const PROFILE_SYSTEMS: ProfileSystem[] = [
  // ---------- ViknaNovi ----------
  {
    id: "wr400",
    brand: "ViknaNovi",
    segment: "econom",
    code: "WR 400",
    name: {
      uk: "ВікнаНові WR 400",
      ru: "ВікнаНові WR 400",
    },
    image: "/profile/wr400.webp",
    params: {
      frameChambers: 4,
      sashChambers: 4,
      mountDepthMm: 58,
      glassWidthMm: "6/24/32",
      frameOuterHeightMm: 63,
      frameInnerHeightMm: 43,
    },
    soundStars: 2,
    thermalStars: 2,
    lamination: true,
  },
  {
    id: "wr500",
    brand: "ViknaNovi",
    segment: "standard",
    code: "WR 500",
    name: {
      uk: "ВікнаНові WR 500",
      ru: "ВикнаНови WR 500",
    },
    image: "/profile/wr500.webp",
    params: {
      frameChambers: 5,
      sashChambers: 5,
      mountDepthMm: 60,
      glassWidthMm: "6/24/32",
      frameOuterHeightMm: 64,
      frameInnerHeightMm: 44,
    },
    soundStars: 3,
    thermalStars: 3,
    lamination: true,
  },
  {
    id: "wr700",
    brand: "ViknaNovi",
    segment: "premium",
    code: "WR 700",
    name: {
      uk: "ВікнаНові WR 700",
      ru: "ВикнаНови WR 700",
    },
    image: "/profile/wr700.webp",
    params: {
      frameChambers: 6,
      sashChambers: 6,
      mountDepthMm: 70,
      glassWidthMm: "24/32/40",
      frameOuterHeightMm: 68,
      frameInnerHeightMm: 48,
    },
    soundStars: 4,
    thermalStars: 4,
    lamination: true,
  },

  // ---------- WDS ----------
  {
    id: "wds5s",
    brand: "WDS",
    segment: "econom",
    code: "5S",
    name: { uk: "WDS 5S", ru: "WDS 5S" },
    image: "/profile/wds5s.webp",
    params: {
      frameChambers: 5,
      sashChambers: 5,
      mountDepthMm: 60,
      glassWidthMm: "6/24/32",
      frameOuterHeightMm: 61,
      frameInnerHeightMm: 41,
    },
    soundStars: 3,
    thermalStars: 3,
    lamination: true,
  },
  {
    id: "wds6s",
    brand: "WDS",
    segment: "standard",
    code: "6S",
    name: { uk: "WDS 6S", ru: "WDS 6S" },
    image: "/profile/wds6s.webp",
    params: {
      frameChambers: 6,
      sashChambers: 6,
      mountDepthMm: 70,
      glassWidthMm: "24/32/40",
      frameOuterHeightMm: 61,
      frameInnerHeightMm: 41,
    },
    soundStars: 4,
    thermalStars: 4,
    lamination: true,
  },
  {
    id: "wds7s",
    brand: "WDS",
    segment: "premium",
    code: "7S",
    name: { uk: "WDS 7S", ru: "WDS 7S" },
    image: "/profile/wds7s.webp",
    params: {
      frameChambers: 6,
      sashChambers: 6,
      mountDepthMm: 70,
      glassWidthMm: "24/32/40",
      frameOuterHeightMm: 66,
      frameInnerHeightMm: 46,
    },
    soundStars: 4,
    thermalStars: 4,
    lamination: true,
  },
  {
    id: "wds8s",
    brand: "WDS",
    segment: "premium",
    code: "8S",
    name: { uk: "WDS 8S", ru: "WDS 8S" },
    image: "/profile/wds8s.webp",
    params: {
      frameChambers: 6,
      sashChambers: 6,
      mountDepthMm: 82,
      glassWidthMm: "44",
      frameOuterHeightMm: 69,
      frameInnerHeightMm: 46,
    },
    soundStars: 5,
    thermalStars: 5,
    lamination: true,
  },

  // ---------- Kömmerling ----------
  // {
  //   id: "kom88",
  //   brand: "Kommerling",
  //   segment: "premium",
  //   code: "88",
  //   name: { uk: "Kömmerling 88", ru: "Kömmerling 88" },
  //   image: "/profile/kommerling88.png",
  //   params: {
  //     frameChambers: 7,
  //     sashChambers: 7,
  //     mountDepthMm: 88,
  //     glassWidthMm: "44/48/52",
  //     frameOuterHeightMm: 78,
  //     frameInnerHeightMm: 50,
  //   },
  //   soundStars: 5,
  //   thermalStars: 5,
  //   lamination: true,
  // },
  {
    id: "kom76md",
    brand: "Kommerling",
    segment: "premium",
    code: "76MD",
    name: { uk: "Kömmerling 76MD", ru: "Kömmerling 76MD" },
    image: "/profile/kommerling76md.webp",
    params: {
      frameChambers: 6,
      sashChambers: 6,
      mountDepthMm: 76,
      glassWidthMm: "40/44/48",
      frameOuterHeightMm: 74,
      frameInnerHeightMm: 46,
    },
    soundStars: 5,
    thermalStars: 5,
    lamination: true,
  },
  {
    id: "kom76ad",
    brand: "Kommerling",
    segment: "standard",
    code: "76AD",
    name: { uk: "Kömmerling 76AD", ru: "Kömmerling 76AD" },
    image: "/profile/kommerling76ad.webp",
    params: {
      frameChambers: 5,
      sashChambers: 5,
      mountDepthMm: 76,
      glassWidthMm: "40/44/48",
      frameOuterHeightMm: 67,
      frameInnerHeightMm: 46,
    },
    soundStars: 4,
    thermalStars: 4,
    lamination: true,
  },
  {
    id: "kom70st",
    brand: "Kommerling",
    segment: "standard",
    code: "70ST",
    name: { uk: "Kömmerling 70ST", ru: "Kömmerling 70ST" },
    image: "/profile/kommerling70st.webp",
    params: {
      frameChambers: 6,
      sashChambers: 6,
      mountDepthMm: 70,
      glassWidthMm: "24/32/40",
      frameOuterHeightMm: 63,
      frameInnerHeightMm: 43,
    },
    soundStars: 4,
    thermalStars: 4,
    lamination: true,
  },

  // ---------- Profine ----------
  {
    id: "profine70ft",
    brand: "Profine",
    segment: "premium",
    code: "70FT",
    name: { uk: "Profine 70FT", ru: "Profine 70FT" },
    image: "/profile/profine70.webp",
    params: {
      frameChambers: 4,
      sashChambers: 4,
      mountDepthMm: 70,
      glassWidthMm: "24/32/40",
      frameOuterHeightMm: 63,
      frameInnerHeightMm: 43,
    },
    soundStars: 4,
    thermalStars: 4,
    lamination: true,
  },
];
