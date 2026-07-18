import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTailwindcss, SiPrisma, SiExpress, SiMongodb, SiPython, SiCplusplus, SiLinux, SiWireshark, SiPostman } from 'react-icons/si';
import { DiJavascript1, DiJava } from 'react-icons/di';
import { MdSecurity } from 'react-icons/md';

export const personalDetails = {
  name: "Sarmad Hayat",
  headline: "Full-Stack MERN Developer | Cybersecurity Enthusiast | AI Explorer",
  location: "Islamabad, Pakistan",
  phone: "+92-344-128-9740",
  email: "sarmadhayat2019@gmail.com",
  linkedin: "https://www.linkedin.com/in/sarmad-hayat-798969288",
  github: "https://github.com/sarmadhayat29",
  instagram: "https://www.instagram.com/sarmadmughalzada/",
  summary: "Final-year BS Computer Science student at NUTECH Islamabad. Holder of industry-recognized certifications from IBM and Google in Cybersecurity. Passionate about building modern web applications using the MERN stack while exploring AI and cybersecurity. Currently looking for opportunities as a Full-Stack MERN Developer.",
};

export const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export const skillsData = [
  { name: 'HTML', icon: FaHtml5, color: 'text-orange-500' },
  { name: 'CSS', icon: FaCss3Alt, color: 'text-blue-500' },
  { name: 'JavaScript', icon: DiJavascript1, color: 'text-yellow-400' },
  { name: 'React', icon: FaReact, color: 'text-cyan-400' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-300' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-primary' },
  { name: 'Express.js', icon: SiExpress, color: 'text-gray-300' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
  { name: 'Prisma', icon: SiPrisma, color: 'text-white' },
  { name: 'Supabase', icon: FaDatabase, color: 'text-primary' },
  { name: 'Python', icon: SiPython, color: 'text-yellow-500' },
  { name: 'Java', icon: DiJava, color: 'text-orange-600' },
  { name: 'C++', icon: SiCplusplus, color: 'text-blue-600' },
  { name: 'Cybersecurity', icon: MdSecurity, color: 'text-red-500' },
  { name: 'Git', icon: FaGitAlt, color: 'text-orange-500' },
  { name: 'Linux', icon: SiLinux, color: 'text-yellow-300' },
  { name: 'Wireshark', icon: SiWireshark, color: 'text-blue-400' },
  { name: 'Postman', icon: SiPostman, color: 'text-orange-400' },
];

export const projectsData = [
  {
    title: 'Career Path Guidance Website',
    description: 'A platform designed to help students and professionals navigate their career paths with personalized guidance.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    tags: ['MERN Stack', 'React', 'Tailwind'],
    github: 'https://github.com/sarmadhayat29',
    demo: '#',
  },
  {
    title: 'To Do List Full Stack',
    description: 'A comprehensive full-stack task management application with real-time updates and seamless user experience.',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/sarmadhayat29',
    demo: '#',
  },
  {
    title: 'Password Generator',
    description: 'A secure, customizable password generation tool built to enforce strong password policies.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Security'],
    github: 'https://github.com/sarmadhayat29',
    demo: '#',
  },
];

export const experienceData = [
  {
    role: 'MERN Stack Intern',
    company: 'Dafilabs',
    period: 'July 2026',
    description: 'Developing and optimizing web applications using the MERN stack. Contributing to frontend design and backend API integration.',
  },
  {
    role: 'Digital Forensic Intern',
    company: 'NCERT',
    period: 'July 2026',
    description: 'Assisting in digital forensics investigations, analyzing network traffic, and learning advanced vulnerability assessment techniques.',
  },
  {
    role: 'Cybersecurity Intern',
    company: 'DevelopersHub Corporation',
    period: 'Mar 2025 – May 2025',
    description: 'Explored the OWASP Top 10 vulnerabilities, performed security audits, and implemented best practices for application security.',
  }
];

export const certificationsData = [
  {
    name: 'IBM Security Analyst Fundamentals',
    issuer: 'IBM',
    date: 'Certified',
  },
  {
    name: 'Google Cybersecurity Certificate',
    issuer: 'Google',
    date: 'Certified',
  },
  {
    name: 'DevelopersHub Cybersecurity Internship',
    issuer: 'DevelopersHub',
    date: '2025',
  },
  {
    name: 'Data Structures & OOP with C++',
    issuer: 'Academic',
    date: 'Completed',
  }
];
