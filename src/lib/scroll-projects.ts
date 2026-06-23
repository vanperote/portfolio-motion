import type { TranslationDict } from "@/lib/translations";
import happySeniorImage from "@/assets/happys.png";
import happySeniorThumb from "@/assets/happy-thumb.png";
import dataSebraeVideo from "@/assets/0601.webm";
import sitraamImage from "@/assets/sitraam.png";
import sitraamThumb from "@/assets/sitraam-thumb.png";
import metasImage from "@/assets/metas.png";
import metasThumb from "@/assets/metas-thumb.png";

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
      tags: [tag.branding, tag.designSystem, tag.uiDesign, tag.development],
      accent: "#22d3ee",
      siteUrl: "datasebrae.com.br",
      projectUrl: "https://home-data.netlify.app/",
      video: dataSebraeVideo,
    },
    {
      name: p.sitraam.name,
      description: p.sitraam.description,
      objective: p.sitraam.objective,
      result: p.sitraam.result,
      tags: [tag.landingPage, tag.uiDesign, tag.development],
      accent: "#e85d3b",
      siteUrl: "sitraam.org.br",
      projectUrl: "https://www.sitraam.org.br/",
      preview: sitraamImage,
      previewThumb: sitraamThumb,
      previewThumbWidth: 900,
      previewThumbHeight: 792,
      previewWidth: 2808,
      previewHeight: 2474,
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
