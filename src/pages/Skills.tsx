export default function Skills() {
  const sk = ['Python','Pandas','PySpark / Spark SQL','Docker','Git & GitHub','React','PostgreSQL','Hadoop / HDFS','ML & Evaluation']
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {sk.map(s => <span key={s} className="chip">{s}</span>)}
      </div>
    </section>
  )
}