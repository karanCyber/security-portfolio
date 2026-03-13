import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import ParticleNetwork from './components/ParticleNetwork';
import SmoothScroll from './components/SmoothScroll';
import SectionReveal from './components/SectionReveal';

import Hero from './components/Hero';
import ScrollText from './components/ScrollText';
import Pillars from './components/Pillars';
import Marquee from './components/Marquee';
import Experience from './components/Experience';
import SkillsAndCerts from './components/SkillsAndCerts';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <CustomCursor />
        {/* Fixed particle globe background */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <ParticleNetwork />
        </div>
        <div className="app-wrapper" style={{ position: 'relative', zIndex: 1, overflowX: 'hidden' }}>
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  {/* Hero: no reveal wrapper — it's the entry point */}
                  <Hero />

                  {/* About Me / ScrollText: pinned internally — rendered bare, no wrapper */}
                  <ScrollText />

                  {/* Core Expertise / Pillars */}
                  <SectionReveal>
                    <Pillars />
                  </SectionReveal>

                  {/* Experience Timeline */}
                  <SectionReveal>
                    <Experience />
                  </SectionReveal>

                  {/* Marquee typography strip */}
                  <SectionReveal>
                    <Marquee />
                  </SectionReveal>

                  {/* Skills + Certs + Footer */}
                  <SectionReveal>
                    <SkillsAndCerts />
                  </SectionReveal>
                </>
              } />
            </Routes>
          </main>
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
