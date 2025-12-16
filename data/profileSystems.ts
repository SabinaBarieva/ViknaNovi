// data/profileSystems.ts
export type Segment = "econom" | "standard" | "premium";
export type Brand = "ViknaNovi" | "WDS" | "Rehau";

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
    soundStars: 3,
    thermalStars: 3,
    lamination: false,
  },
  {
    id: "wr700",
    brand: "ViknaNovi",
    segment: "standard",
code: "WR 700",
    name: {
      uk: "ВікнаНові WR 700",
      ru: "ВікнаНові WR 700",
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
    id: "wds76md",
    brand: "WDS",
    segment: "premium",
    code: "76MD",
    name: { uk: "WDS 76MD", ru: "WDS 76MD" },
    image: "/profile/wds76md.webp",
    params: {
      frameChambers: 6,
      sashChambers: 6,
      mountDepthMm: 76,
      glassWidthMm: "40/48",
      frameOuterHeightMm: 67,
      frameInnerHeightMm: 42,
    },
    soundStars: 5,
    thermalStars: 5,
    lamination: true,
  },
  {
    id: "wds76ad",
    brand: "WDS",
    segment: "premium",
    code: "76AD",
    name: { uk: "WDS 76AD", ru: "WDS 76AD" },
    image: "/profile/wds76ad.webp",
    params: {
      frameChambers: 5,
      sashChambers: 5,
      mountDepthMm: 76,
      glassWidthMm: "40/48",
      frameOuterHeightMm: 62,
      frameInnerHeightMm: 42,
    },
    soundStars: 4.5,
    thermalStars: 5,
    lamination: true,
  },
  {
  id: "rehauSynego",
  brand: "Rehau",
  segment: "premium",
  code: "Synego",
  name: { uk: "REHAU Synego", ru: "REHAU Synego" },
  image: "/profile/rehauSynego.webp",
  params: {
    frameChambers: 6,
    sashChambers: 6,
    mountDepthMm: 80,
    glassWidthMm: "40–52",
    frameOuterHeightMm: 78,
    frameInnerHeightMm: 58,
  },
  soundStars: 4.5,
  thermalStars: 5,
  lamination: true,
},
{
  id: "rehau70",
  brand: "Rehau",
  segment: "premium",
  code: "70",
  name: { uk: "REHAU 70", ru: "REHAU 70" },
  image: "/profile/rehau70.webp",
  params: {
    frameChambers: 5,
    sashChambers: 5,
    mountDepthMm: 70,
    glassWidthMm: "32–40",
    frameOuterHeightMm: 63,
    frameInnerHeightMm: 43,
  },
  soundStars: 4,
  thermalStars: 4,
  lamination: true,
},

{
  id: "rehau60",
  brand: "Rehau",
  segment: "premium",
  code: "60",
  name: { uk: "REHAU 60", ru: "REHAU 60" },
  image: "/profile/rehau60.webp",
  params: {
    frameChambers: 3,
    sashChambers: 3,
    mountDepthMm: 60,
    glassWidthMm: "24–32",
    frameOuterHeightMm: 55,
    frameInnerHeightMm: 35,
  },
  soundStars: 3.5,
  thermalStars: 3.5,
  lamination: false,
},


];
