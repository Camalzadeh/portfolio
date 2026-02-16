import Hero from "@/components/Hero";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main>
      <div className="bg-glow" />

      <Hero />
      <Achievements />
      <Skills />

      <footer className="container" style={{ padding: '60px 0', borderTop: '1px solid var(--glass-border)', marginTop: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>© 2026 Humbat Jamalov. Built with Next.js & Passion.</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={{ transition: 'color 0.3s' }}>LinkedIn</a>
          <a href="#" style={{ transition: 'color 0.3s' }}>GitHub</a>
          <a href="#" style={{ transition: 'color 0.3s' }}>Academic Paper</a>
        </div>
      </footer>
    </main>
  );
}

