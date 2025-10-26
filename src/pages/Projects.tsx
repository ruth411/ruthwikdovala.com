import { BookOpen, ExternalLink } from 'lucide-react'

type Project = {
  title: string
  tags: string[]
  bullets: string[]
  publication?: boolean
  link?: string            // <- put your publication URL here
}

const projects: Project[] = [
  {
    title: 'Data analysis of crime against women in India using ML',
    tags: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'EDA', 'Visualization'],
    bullets: [
      'Preprocessed national/state crime datasets; explored spatial & temporal patterns.',
      'Trained classification/regression models (Logistic Regression, Decision Trees, Random Forest, K-Means) to find hot-spots and predict occurrences.',
      'Derived actionable insights on key risk factors and proposed data-driven interventions.'
    ]
  },
  {
    title: 'Segmentation & classification of roads using satellite images',
    tags: ['TensorFlow', 'Keras', 'CNN', 'U-Net', 'Computer Vision'],
    bullets: [
      'Built U-Net and CNN pipelines for road segmentation and surface-type classification.',
      'Implemented robust preprocessing/augmentation for high-resolution satellite imagery.'
    ]
  },
  {
    title: 'Swarm of drones for surveillance (simulation)',
    tags: ['ROS', 'Gazebo', 'Path Planning', 'Multi-agent Systems'],
    bullets: [
      'Developed a simulation for a surveillance swarm with coordination and communication.',
      'Implemented path planning, obstacle avoidance, and inter-drone comms primitives.'
    ]
  },
  {
    title: 'CA Comparative Analysis of Swarm Algorithms for Enhancing Communication in Drone Networks',
    publication: true,
    link: 'https://ieeexplore.ieee.org/document/10723925', 
    tags: ['PSO', 'ACO', 'ABC', 'Simulation', 'Robustness'],
    bullets: [
      'Benchmarked swarm algorithms for scalability, efficiency, and robustness under dynamics.',
      'Identified best-fit approaches and proposed hybrid enhancements for communication.'
    ]
  },
  {
    title: 'Unleashing power of Vision Transformers for disease prediction in Chest X ray images',
    publication: true,
    link: 'https://ieeexplore.ieee.org/document/10724826', 
    tags: [
      'ViT', 'ConvNeXt', 'DenseNet169', 'EfficientNetV2', 'InceptionV3', 'MobileNetV2', 'NasNetMobile',
      'TensorFlow', 'PyTorch', 'Medical Imaging'
    ],
    bullets: [
      'Compared modern CNNs and ViT for pneumonia/COVID-19 detection.',
      'Used TF/PyTorch training utilities; improvements contributed to AI-driven diagnostics.'
    ]
  },
  {
    title: 'A Comparative Analysis of Deep Learning Models for Detection of Diabetic Foot Ulcer using Foot Thermography Images',
    publication: true,
    link: 'https://ieeexplore.ieee.org/document/10724795', 
    tags: ['CNN', 'RNN', 'Transfer Learning', 'AUC-ROC', 'F1-Score', 'Grad-CAM'],
    bullets: [
      'Compared multiple DL models on foot thermography images; reported AUC-ROC & F1.',
      'Applied Grad-CAM for interpretability; toward non-invasive, real-time diagnostic tooling.'
    ]
  },
  {
    title: 'Resume ↔ Job listing compatibility (matching)',
    tags: ['Python', 'TF-IDF', 'Naive Bayes', 'NLP', 'Pipelines'],
    bullets: [
      'Built an ML system to score resume–job similarity and reduce recruiter bias.',
      'Modular architecture with preprocessing pipeline; scalable for production use.'
    ]
  }
]

export default function Projects() {
  return (
    <section className="container">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Projects</h1>
        <p className="text-muted">
          Selected academic, research, and applied projects across computer vision, simulation,
          and data/ML—summarized with key techniques and outcomes.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.title} className="card flex flex-col">
            <header className="mb-3">
              <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>

              {/* show just the link when a publication URL is present */}
              {p.publication && p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs underline text-accent"
                >
                  <BookOpen size={14} />
                  Publication
                  <ExternalLink size={13} />
                </a>
              )}
            </header>

            <div className="flex flex-wrap gap-2 mb-3">
              {p.tags.map((t) => (
                <span key={t} className="chip bg-card/50">{t}</span>
              ))}
            </div>

            <ul className="list-disc pl-5 text-sm text-muted space-y-1">
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
