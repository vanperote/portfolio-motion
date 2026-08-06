import type { TranslationDict } from "@/lib/translations";
import happySeniorImage from "@/assets/happys.png";
import happySeniorThumb from "@/assets/happy-thumb.png";
import dataSebraeVideo from "@/assets/0601.webm";
import silvestreImage from "@/assets/silvestre.png";
import metasImage from "@/assets/metas.png";
import metasThumb from "@/assets/metas-thumb.png";

/** Siglas das versões estaduais do DataSebrae */
export const DATASEBRAE_STATES = [
  "AL",
  "AM",
  "AP",
  "BA",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO",
] as const;

export type ScrollProject = {
  name: string;
  description: string;
  objective: string;
  result: string;
  tags: string[];
  accent: string;
  siteUrl?: string;
  projectUrl?: string;
  preview?: string;
  previewWidth?: number;
  previewHeight?: number;
  previewThumb?: string;
  previewThumbWidth?: number;
  previewThumbHeight?: number;
  previewThumb2x?: string;
  deckThumbPosition?: "top" | "left-top";
  video?: string;
  /** Siglas com link https://datasebrae.com.br/{sigla} */
  stateCodes?: readonly string[];
  statesLabel?: string;
};

export function getScrollProjects(t: TranslationDict): ScrollProject[] {
  const tag = t.tags;
  const p = t.projects;

  return [
    {
      name: p.happySenior.name,
      description: p.happySenior.description,
      objective: p.happySenior.objective,
      result: p.happySenior.result,
      tags: [tag.landingPage, tag.uiDesign, tag.development],
      accent: "#34f56b",
      siteUrl: "happysenior.com.br",
      projectUrl: "https://www.happysenior.com.br/",
      preview: happySeniorImage,
      previewThumb: happySeniorThumb,
      previewThumbWidth: 900,
      previewThumbHeight: 578,
      previewWidth: 2700,
      previewHeight: 1732,
    },
    {
      name: p.dataSebrae.name,
      description: p.dataSebrae.description,
      objective: p.dataSebrae.objective,
      result: p.dataSebrae.result,
      tags: [tag.ux, tag.uiDesign, tag.designSystem, tag.development],
      accent: "#22d3ee",
      siteUrl: "datasebrae.com.br",
      projectUrl: "https://datasebrae.com.br",
      video: dataSebraeVideo,
      stateCodes: DATASEBRAE_STATES,
      statesLabel: p.dataSebrae.statesLabel,
    },
    {
      name: p.silvestre.name,
      description: p.silvestre.description,
      objective: p.silvestre.objective,
      result: p.silvestre.result,
      tags: [tag.landingPage, tag.uiDesign, tag.development],
      accent: "#7c3aed",
      siteUrl: "silvestre-petshop.vercel.app",
      projectUrl: "https://silvestre-petshop.vercel.app/",
      preview: silvestreImage,
      previewThumb: silvestreImage,
      previewThumbWidth: 889,
      previewThumbHeight: 1024,
      previewWidth: 889,
      previewHeight: 1024,
      deckThumbPosition: "top",
    },
    {
      name: p.metas.name,
      description: p.metas.description,
      objective: p.metas.objective,
      result: p.metas.result,
      tags: [tag.uiDesign, tag.development, tag.dashboard],
      accent: "#2563eb",
      siteUrl: "metas.datasebrae.com.br",
      projectUrl: "https://metas.datasebrae.com.br/",
      preview: metasImage,
      previewThumb: metasThumb,
      previewThumbWidth: 900,
      previewThumbHeight: 474,
      deckThumbPosition: "left-top",
      previewWidth: 2824,
      previewHeight: 1488,
    },
  ];
}
