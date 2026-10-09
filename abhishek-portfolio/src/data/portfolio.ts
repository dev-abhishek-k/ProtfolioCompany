export const profile = {
  name: 'Abhishek',
  role: 'Full Stack Developer',
  intro: 'I design and build fast, thoughtful web experiences—from expressive interfaces to dependable APIs.',
  about: 'I enjoy turning complex ideas into useful digital products. My work spans modern frontend interfaces, backend services, and the details that make them feel seamless.',
  background: 'Add your education, location, and professional background here.',
  goal: 'I am looking to collaborate on ambitious products with people who care about craft and impact.',
  email: '',
  github: '',
  linkedin: '',
  resume: '',
};

export const skills = {
  Frontend: ['HTML','CSS','JavaScript','TypeScript','React.js','Next.js','Tailwind CSS'],
  Backend: ['Node.js','Express.js','REST APIs','Authentication','JWT'],
  Database: ['PostgreSQL','MongoDB','Supabase'],
  Tools: ['Git','GitHub','Docker','Postman','AWS'],
};

export type Project = { number: string; title: string; kind: string; description: string; technologies: string[]; github?: string; demo?: string; accent: string };
export const projects: Project[] = [
  {number:'01',title:'EdTech Management Platform',kind:'Education / Product',description:'A concept for bringing courses, learners, and operations together in one focused workspace.',technologies:['Next.js','TypeScript','PostgreSQL'],accent:'cyan'},
  {number:'02',title:'E-commerce Application',kind:'Commerce / Experience',description:'A modern storefront concept with a considered shopping journey and clear product discovery.',technologies:['React','Node.js','MongoDB'],accent:'purple'},
  {number:'03',title:'AI-Powered Web Application',kind:'AI / Experiment',description:'An interface concept that makes intelligent workflows approachable and practical.',technologies:['Next.js','REST APIs','Tailwind'],accent:'blue'},
  {number:'04',title:'Admin Dashboard',kind:'Analytics / Systems',description:'A clean command center concept for surfacing metrics, activity, and decisions.',technologies:['TypeScript','React','Supabase'],accent:'pink'},
];

export type Experience = {role:string;company:string;duration:string;description:string;technologies:string[]};
export const experience: Experience[] = [];
