import {
  AppWindow, BrainCircuit, Cloud, Code2, LayoutTemplate, ShoppingBag,
} from "lucide-react";

export const services = [
  { number: "01", title: "Web Development", detail: "Fast, expressive websites engineered for every screen.", icon: Code2, tags: ["Next.js", "WebGL", "Performance"] },
  { number: "02", title: "Mobile Apps", detail: "Useful, elegant products that belong in your pocket.", icon: AppWindow, tags: ["iOS", "Android", "Product"] },
  { number: "03", title: "AI Development", detail: "Intelligent tools designed around real human workflows.", icon: BrainCircuit, tags: ["AI interfaces", "Automation", "Agents"] },
  { number: "04", title: "UI / UX Design", detail: "Clear journeys, beautiful systems, and memorable details.", icon: LayoutTemplate, tags: ["Research", "Systems", "Prototypes"] },
  { number: "05", title: "Cloud Solutions", detail: "Dependable infrastructure built to scale with your ideas.", icon: Cloud, tags: ["Architecture", "APIs", "Delivery"] },
  { number: "06", title: "E-commerce", detail: "Shopping experiences that make discovery feel effortless.", icon: ShoppingBag, tags: ["Storefronts", "Payments", "Growth"] },
] as const;

export const projects = [
  { id: "01", title: "NOVA / OS", category: "Platform", summary: "A command center for the next generation of connected work.", image: "/projects/nova.svg", tone: "blue", services: "Product strategy · Design system · Engineering" },
  { id: "02", title: "AETHER", category: "Experience", summary: "An immersive digital identity built around light and motion.", image: "/projects/aether.svg", tone: "violet", services: "Brand direction · WebGL · Frontend" },
  { id: "03", title: "SYNAPSE", category: "AI", summary: "A calmer, more human interface for complex intelligence.", image: "/projects/synapse.svg", tone: "silver", services: "AI interface · UX · Prototyping" },
  { id: "04", title: "MONOFORM", category: "Commerce", summary: "A new way to discover objects made to last.", image: "/projects/monoform.svg", tone: "ember", services: "Commerce · Art direction · Development" },
] as const;

export const categories = ["All", "Platform", "Experience", "AI", "Commerce"] as const;
