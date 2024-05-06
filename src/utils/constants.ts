export const EXP_LEVELS_OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];

export const REMOTE_OPTIONS: { value: string; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "inOffice", label: "In-office" },
];

export const MIN_BASE_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: "0L" },
  { value: 10, label: "10L" },
  { value: 20, label: "20L" },
  { value: 30, label: "30L" },
  { value: 40, label: "40L" },
  { value: 50, label: "50L" },
  { value: 60, label: "60L" },
  { value: 70, label: "70L" },
];

export const NUMBER_OF_EMPLOYEES_OPTIONS: { value: string; label: string }[] = [
  { value: "1-10", label: "1-10" },
  { value: "11-20", label: "11-20" },
  { value: "21-50", label: "21-50" },
  { value: "51-100", label: "51-100" },
  { value: "101-500", label: "101-500" },
  { value: "500+", label: "500+" },
];

export const TECH_STACK_OPTIONS: { value: string; label: string }[] = [
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "goLang", label: "GoLang" },
  { value: "ruby/rails", label: "Ruby/Rails" },
  { value: "c++", label: "C++" },
  { value: "kotlin", label: "Kotlin" },
  { value: "django", label: "Django" },
  { value: "c#", label: "C#" },
  { value: "graphql", label: "GraphQl" },
  { value: "flask", label: "Flask" },
  { value: "typescript", label: "Typescript" },
  { value: "aws", label: "AWS" },
  { value: "javascript", label: "Javascript" },
  { value: "rust", label: "Rust" },
  { value: "nodejs", label: "NodeJS" },
  { value: "react", label: "React" },
];

export const ROLES_OPTIONS: { value: string; label: string }[] = [
  {
    label: "Engineering",
    options: [
      { value: "backend", label: "Backend" },
      { value: "frontend", label: "Frontend" },
      { value: "fullstack", label: "Fullstack" },
      { value: "ruby/rails", label: "Ruby/Rails" },
      { value: "ios", label: "IOS" },
      { value: "flutter", label: "Flutter" },
      { value: "react-native", label: "React Native" },
      { value: "android", label: "Android" },
      { value: "tech-lead", label: "Tech Lead" },
      { value: "dev-ops", label: "DevOps" },
      { value: "data engineer", label: "Data Engineer" },
    ],
  },
  {
    label: "Design",
    options: [
      { value: "designer", label: "Designer" },
      { value: "design-manager", label: "Design Manager" },
      { value: "graphic-designer", label: "Graphic Designer" },
      { value: "product-designer", label: "Product Designer" },
    ],
  },
  {
    label: "Product",
    options: [{ value: "product-manager", label: "Product Manager" }],
  },
  {
    label: "Legal",
    options: [{ value: "legal", label: "Legal" }],
  },
  {
    label: "HR",
    options: [{ value: "hr", label: "HR" }],
  },
  {
    label: "Finance",
    options: [{ value: "finance", label: "Finance" }],
  },
];
