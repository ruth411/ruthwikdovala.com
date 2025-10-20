import { Globe, Boxes, Cloud, Lock, Wrench, Code } from 'lucide-react'
import { JSX } from 'react'

type SkillItem = {
  label: string
  iconKey?: string      // key into ICON map (Devicon)
  svg?: JSX.Element     // custom inline SVG (e.g., for AWS services)
}

const ICON: Record<string, string> = {
  // frontend
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg',
  css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg',
  jquery: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
  bootstrap: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',

  // languages
  c: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  r: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  ruby: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-plain.svg',
  sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', // generic DB glyph

  // data viz
  powerbi: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powerbi/powerbi-original.svg',
  matplotlib: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg',
  tableau: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg',

  // devops / tools
  aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  kubernetes: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  githubactions: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-plain.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  jupyter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
  excel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/excel/excel-original.svg',
  mssql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
}

// Compact, consistent 16×16 cloud glyph
const CloudGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 18a4 4 0 0 1-.4-7.984A6 6 0 0 1 18.9 9.6a3.5 3.5 0 0 1-.4 7H7z"
    />
  </svg>
)

function Tag({ item }: { item: SkillItem }) {
  const src = item.iconKey ? ICON[item.iconKey] : undefined
  return (
    <span className="chip bg-card/50 hover:bg-card transition-colors whitespace-nowrap">
      {src ? (
        <img
          src={src}
          alt=""
          width={16}
          height={16}
          className="w-4 h-4 opacity-80"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      ) : item.svg ? (
        <span className="opacity-80">{item.svg}</span>
      ) : null}
      <span className="leading-none">{item.label}</span>
    </span>
  )
}

function Card({
  title,
  icon,
  items,
}: {
  title: string
  icon: React.ReactNode
  items: SkillItem[]
}) {
  return (
    <article className="card">
      <div className="flex items-center gap-3 mb-3">
        <div className="rounded-xl border border-border p-2">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <Tag key={i.label} item={i} />
        ))}
      </div>
    </article>
  )
}

export default function Skills() {
  // Frontend
  const Frontend: SkillItem[] = [
    { label: 'React', iconKey: 'react' },
    { label: 'TypeScript', iconKey: 'typescript' },
    { label: 'JavaScript', iconKey: 'javascript' },
    { label: 'HTML', iconKey: 'html5' },
    { label: 'CSS', iconKey: 'css3' },
    { label: 'jQuery', iconKey: 'jquery' },
    { label: 'Bootstrap', iconKey: 'bootstrap' },
    { label: 'Angular', iconKey: 'angular' },
  ]

  // Languages
  const Programming: SkillItem[] = [
    { label: 'C', iconKey: 'c' },
    { label: 'C++', iconKey: 'cpp' },
    { label: 'Java', iconKey: 'java' },
    { label: 'R', iconKey: 'r' },
    { label: 'Python', iconKey: 'python' },
    { label: 'SQL', iconKey: 'sql' },
    { label: 'Ruby', iconKey: 'ruby' },
  ]

  // Cloud & DevOps (AWS services now use the uniform CloudGlyph)
  const CloudDevOps: SkillItem[] = [
    { label: 'AWS', iconKey: 'aws' },
    { label: 'Docker', iconKey: 'docker' },
    { label: 'Kubernetes', iconKey: 'kubernetes' },
    { label: 'CI/CD Pipelines', svg: <CloudGlyph /> },
    { label: 'GitHub Actions', iconKey: 'githubactions' },
    { label: 'Git', iconKey: 'git' },

    // AWS services → use the consistent cloud glyph for alignment
    { label: 'S3', svg: <CloudGlyph /> },
    { label: 'EC2', svg: <CloudGlyph /> },
    { label: 'EKS', svg: <CloudGlyph /> },
    { label: 'SNS', svg: <CloudGlyph /> },
    { label: 'DynamoDB', svg: <CloudGlyph /> },
    { label: 'Redshift', svg: <CloudGlyph /> },
    { label: 'SageMaker', svg: <CloudGlyph /> },
    { label: 'QuickSight', svg: <CloudGlyph /> },
  ]

  const DataViz: SkillItem[] = [
    { label: 'Power BI', iconKey: 'powerbi' },
    { label: 'Matplotlib', iconKey: 'matplotlib' },
    { label: 'Tableau', iconKey: 'tableau' },
  ]

  const SecurityAuth: SkillItem[] = [
    { label: 'JWT', svg: <CloudGlyph /> },
    { label: 'OAuth', svg: <CloudGlyph /> },
    { label: 'API Security', svg: <CloudGlyph /> },
  ]

  const ToolsPlatforms: SkillItem[] = [
    { label: 'Jupyter Notebook', iconKey: 'jupyter' },
    { label: 'Postman', iconKey: 'postman' },
    { label: 'Advanced Excel', iconKey: 'excel' },
    { label: 'ETL Pipelines', svg: <CloudGlyph /> },
    { label: 'SQL Server', iconKey: 'mssql' },
    { label: 'Entity Framework', svg: <CloudGlyph /> },
    { label: 'CRM Integration', svg: <CloudGlyph /> },
    { label: 'E-commerce', svg: <CloudGlyph /> },
    { label: 'Real-time KPI Dashboards', svg: <CloudGlyph /> },
  ]

  return (
    <section className="container">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Skills &amp; Technologies</h1>
        <p className="text-muted">
          A comprehensive overview of the technologies, languages, and tools I use to build reliable
          data products, performant services, and clean UIs.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Frontend Development" icon={<Globe size={18} />} items={Frontend} />
        <Card title="Programming Languages" icon={<Code size={18} />} items={Programming} />
        <Card title="Cloud & DevOps" icon={<Cloud size={18} />} items={CloudDevOps} />
        <Card title="Data Visualization" icon={<Boxes size={18} />} items={DataViz} />
        <Card title="Security & Authentication" icon={<Lock size={18} />} items={SecurityAuth} />
        <Card title="Tools & Platforms" icon={<Wrench size={18} />} items={ToolsPlatforms} />
      </div>
    </section>
  )
}
