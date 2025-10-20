import { Globe, Boxes, Cloud, Lock, Wrench, Code } from 'lucide-react'

type SkillItem = { label: string; icon?: string | null; emoji?: string }

/**
 * Minimal icon map using Devicon CDN.
 * Add/adjust entries as you like. Unknown keys fall back to text-only.
 */
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
  sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', // generic DB icon

  // data viz
  powerbi: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powerbi/powerbi-original.svg',
  matplotlib: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg',
  tableau: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg',

  // cloud & devops
  aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  kubernetes: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  githubactions: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-plain.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',

  // tools
  postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
  jupyter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
  excel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/excel/excel-original.svg',
  mssql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
}

function Tag({ item }: { item: SkillItem }) {
  const src = item.icon ? ICON[item.icon] : undefined
  return (
    <span className="chip bg-card/50 hover:bg-card transition-colors">
      {src ? (
        <img
          src={src}
          alt={item.label}
          width={18}
          height={18}
          className="inline-block mr-1 align-middle"
          onError={(e) => {
            // if icon 404s, drop the image and just show text
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
      ) : item.emoji ? (
        <span className="mr-1">{item.emoji}</span>
      ) : null}
      {item.label}
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
  // Pulled from your résumé’s SKILLS section; grouped to match the reference layout.
  const Frontend: SkillItem[] = [
    { label: 'React', icon: 'react' },
    { label: 'TypeScript', icon: 'typescript' },
    { label: 'JavaScript', icon: 'javascript' },
    { label: 'HTML', icon: 'html5' },
    { label: 'CSS', icon: 'css3' },
    { label: 'jQuery', icon: 'jquery' },
    { label: 'Bootstrap', icon: 'bootstrap' },
    { label: 'Angular', icon: 'angular' },
  ]

  const Programming: SkillItem[] = [
    { label: 'C', icon: 'c' },
    { label: 'C++', icon: 'cpp' },
    { label: 'Java', icon: 'java' },
    { label: 'R', icon: 'r' },
    { label: 'Python', icon: 'python' },
    { label: 'SQL', icon: 'sql' },
    { label: 'Ruby', icon: 'ruby' },
  ]

  const CloudDevOps: SkillItem[] = [
    { label: 'AWS', icon: 'aws' },
    { label: 'Docker', icon: 'docker' },
    { label: 'Kubernetes', icon: 'kubernetes' },
    { label: 'CI/CD Pipelines', emoji: '🔁' },
    { label: 'GitHub Actions', icon: 'githubactions' },
    { label: 'Git', icon: 'git' },
    // AWS services as text chips
    { label: 'S3', emoji: '☁️' },
    { label: 'EC2', emoji: '☁️' },
    { label: 'EKS', emoji: '☁️' },
    { label: 'SNS', emoji: '☁️' },
    { label: 'DynamoDB', emoji: '☁️' },
    { label: 'Redshift', emoji: '☁️' },
    { label: 'SageMaker', emoji: '☁️' },
    { label: 'QuickSight', emoji: '☁️' },
  ]

  const DataViz: SkillItem[] = [
    { label: 'Power BI', icon: 'powerbi' },
    { label: 'Matplotlib', icon: 'matplotlib' },
    { label: 'Tableau', icon: 'tableau' },
  ]

  const SecurityAuth: SkillItem[] = [
    { label: 'JWT', emoji: '🔐' },
    { label: 'OAuth', emoji: '🔐' },
    { label: 'API Security', emoji: '🛡️' },
  ]

  const ToolsPlatforms: SkillItem[] = [
    { label: 'Jupyter Notebook', icon: 'jupyter' },
    { label: 'Postman', icon: 'postman' },
    { label: 'Advanced Excel', icon: 'excel' },
    { label: 'ETL Pipelines', emoji: '🧱' },
    { label: 'SQL Server', icon: 'mssql' },
    { label: 'Entity Framework', emoji: '🧩' },
    { label: 'CRM Integration', emoji: '🤝' },
    { label: 'E-commerce Dev', emoji: '🛒' },
    { label: 'Real-time KPI Dashboards', emoji: '📈' },
  ]

  return (
    <section className="container">
      {/* Header like the reference */}
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

      {/* Always Learning banner */}
      <div className="mt-8">
        <div className="rounded-2xl border border-border p-6 md:p-8 text-center bg-gradient-to-br from-accent/10 to-accent2/10">
          <h3 className="text-lg font-semibold mb-2">Always Learning</h3>
          <p className="text-muted max-w-3xl mx-auto">
            Technology evolves rapidly, and I’m committed to continuous learning. I regularly
            explore new frameworks, tools, and best practices to stay current with industry trends
            and deliver cutting-edge solutions.
          </p>
        </div>
      </div>
    </section>
  )
}
