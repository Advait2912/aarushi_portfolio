import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

// images: first one is used as the card thumbnail; all float inside the detail page
const explorations = [
  {
    id: "screen-printing",
    title: "Screen Printing",
    subtitle: "Halftones & process",
    images: [
      "/images/explorations/screen-printing/01.jpeg",
      "/images/explorations/screen-printing/02.jpeg",
      "/images/explorations/screen-printing/03.jpeg",
      "/images/explorations/screen-printing/04.jpeg",
    ],
  },
  {
    id: "3d-modelling",
    title: "3D Modelling",
    subtitle: "Form & space",
    images: [
      "/images/explorations/3d-modelling/01.jpeg",
      "/images/explorations/3d-modelling/02.jpeg",
      "/images/explorations/3d-modelling/03.jpeg",
    ],
  },
  {
    id: "digital-illustration",
    title: "Digital Illustration",
    subtitle: "Editorial work",
    images: [
      "/images/explorations/digital-illustration/01.jpeg",
      "/images/explorations/digital-illustration/02.jpeg",
      "/images/explorations/digital-illustration/03.jpeg",
      "/images/explorations/digital-illustration/04.jpeg",
      "/images/explorations/digital-illustration/05.jpeg",
    ],
  },
  {
    id: "material-experiments",
    title: "Material Experiments",
    subtitle: "Tactile design",
    images: [
      "/images/explorations/material-experiments/01.jpeg",
      "/images/explorations/material-experiments/02.jpeg",
    ],
  },
]

export default function SideExplorations() {
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
    <section id="explorations" className="explorations" ref={ref}>
      <div className="section-header" style={{ textAlign: "left" }}>
        <p className="section-label fade-up">Beyond the Brief</p>
        <h2 className="fade-up" style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px,4vw,52px)", fontWeight: 400, marginTop: 12, transitionDelay: "0.1s" }}>
          Side Explorations
        </h2>
        <p className="fade-up" style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 300, marginTop: 12, transitionDelay: "0.15s" }}>
          Design is also play. These are the experiments that feed the work.
        </p>
      </div>

      <div className="explorations-grid">
        {explorations.map((exp, i) => (
          <div
            key={i}
            className="exploration-card fade-up"
            style={{ transitionDelay: `${0.1 + i * 0.07}s` }}
            onClick={() => navigate(`/exploration/${exp.id}`)}
          >
            {/* Thumbnail — first image, falls back to a neutral placeholder */}
            <div className="card-preview" style={{ padding: 0, overflow: "hidden", background: "#e8e4e0" }}>
              <img
                src={exp.images[0]}
                alt={exp.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={e => { e.currentTarget.style.display = "none" }}
              />
            </div>
            <div className="card-info">
              <p className="card-title">{exp.title}</p>
              <p className="card-subtitle">{exp.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}