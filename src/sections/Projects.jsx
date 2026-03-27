import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const projects = [
  { id: "meta-counsel",  title: "Krate Kart",    subtitle: "Vendor Ecosystem",       image: "/images_projects/title_1.jpeg" },
  { id: "emotion-ai",   title: "PennyWise", subtitle: "Personal Finance Simplified", image: "/images_projects/project2.png" },
  { id: "sleep-system", title: "YuluWalk",        subtitle: "Urban Explorations",     image: "/images_projects/title_3.jpeg" },
  { id: null,           title: "Coming Soon",     subtitle: "In Progress",            image: null, placeholder: true },
]

export default function Projects() {
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll(".fade-up").forEach(el => el.classList.add("visible"))
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" className="projects-section" ref={ref}>

      <div className="section-header" style={{ textAlign: "left" }}>
        <p className="section-label fade-up">Work</p>
        <h2 className="fade-up" style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px,4vw,52px)", fontWeight: 400, marginTop: 12, transitionDelay: "0.1s" }}>
          Projects
        </h2>
        <p className="fade-up" style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 300, marginTop: 12, transitionDelay: "0.15s" }}>
          Click any project to explore the full case study.
        </p>
      </div>

      <div className="explorations-grid">
        {projects.map((p, i) => (
          <div
            key={i}
            className="exploration-card fade-up"
            style={{ transitionDelay: `${0.1 + i * 0.07}s`, cursor: p.placeholder ? "default" : "pointer" }}
            onClick={() => p.id && navigate(`/case-study/${p.id}`)}
          >
            <div className="card-preview" style={{ padding: 0, overflow: "hidden" }}>
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <span style={{ fontSize: "22px", opacity: 0.3 }}>✦</span>
              )}
            </div>
            <div className="card-info">
              <p className="card-title">{p.title}</p>
              <p className="card-subtitle">{p.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}