import { useNavigate, useLocation } from "react-router-dom"

const links = [
  { label: "Home",              hash: "#hero"          },
  { label: "Projects",          hash: "#projects"      },
  { label: "Side Explorations", hash: "#explorations"  },
  { label: "About Me",          hash: "#system-inputs" },
  { label: "Contact",           hash: "#contact"       },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (hash) => {
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="navbar">
      <button
        onClick={() => handleClick("#hero")}
        style={{
          background: "transparent", border: "none",
          fontFamily: "var(--serif)", fontSize: "17px",
          color: "var(--text)", cursor: "pointer",
          letterSpacing: "-.02em", fontWeight: 400,
        }}
      >
        Aarushi Sharma
      </button>

      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {links.map((link, i) => (
          <button
            key={i}
            onClick={() => handleClick(link.hash)}
            style={{
              background: "transparent", border: "none",
              fontSize: "11px", letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              cursor: "pointer", fontFamily: "var(--sans)",
              fontWeight: 400, transition: "color .2s",
              padding: "4px 0",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--indigo)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  )
}