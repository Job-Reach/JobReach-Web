import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (email) {
      setJoined(true);
      setEmail('');
      // Here you would normally send the email to your backend waitlist endpoint
    }
  };

  return (
    <>
      <div className="ambient-bg">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
      </div>

      <div className="container" style={{ paddingTop: '10vh', paddingBottom: '10vh' }}>
        <header className="flex justify-between items-center" style={{ marginBottom: '6rem' }}>
          <div className="flex items-center gap-2">
            <Sparkles size={24} color="var(--primary)" />
            <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>MyVictor</span>
          </div>
          <Link to="/app" className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
            Login <ArrowRight size={16} />
          </Link>
        </header>

        <main>
          <div className="hero-text animate-fade-in stagger-1">
            <h1 style={{ marginBottom: '1.5rem' }}>The Intelligent Job Application Pipeline</h1>
            <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', marginBottom: '3rem' }}>
              Currently building for myself, soon it will be for everyone…!
            </p>

            <form onSubmit={handleWaitlist} className="glass-panel" style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: 'var(--radius-full)', alignItems: 'center', maxWidth: '100%', width: '400px' }}>
              <Mail size={20} color="var(--text-muted)" style={{ marginLeft: '1rem', flexShrink: 0 }} />
              <input 
                type="email" 
                placeholder="Enter your email for early access..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  padding: '0.75rem 1rem',
                  flexGrow: 1,
                  outline: 'none',
                  fontSize: '0.875rem'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.5rem' }}>
                {joined ? <CheckCircle size={18} /> : 'Join Waitlist'}
              </button>
            </form>
            {joined && (
              <p style={{ color: 'var(--status-valid)', marginTop: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>
                You're on the list! We'll be in touch soon.
              </p>
            )}
          </div>

          <div className="story-block animate-fade-in stagger-2">
            <p>
              My approach to job search has always been straightforward.
            </p>
            <p className="highlight-text" style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
              Apply to the job → then reach out directly to the people responsible for hiring.
            </p>
            <p>
              Sounds simple, right?
            </p>
            <p>
              But it's not. I'd go to LinkedIn, search for the right people, craft personalized emails, and send them one at a time.
              <br/><br/>
              <span style={{ color: 'var(--status-invalid)', fontWeight: 500 }}>5 - 10 Hours of work. 60 emails sent. Maybe one reply.</span>
            </p>
            <p>
              Cold emailing works in theory — but the execution is exhausting, time-consuming, and the payoff feels non-existent with a less than 1% reply rate.
            </p>
          </div>

          <div className="story-block animate-fade-in stagger-3" style={{ borderLeftColor: 'var(--primary)' }}>
            <p>
              So I built a pipeline from scratch that automates this entire process — saving hours that job seekers like me can spend on something more meaningful.
            </p>
            <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem', marginBottom: '2rem' }}>
              <p style={{ marginBottom: '1rem', color: 'var(--primary)', fontWeight: 500 }}>You paste the job URL. A RAG application with AI agents then:</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li className="flex items-center gap-2"><ArrowRight size={16} color="var(--text-muted)" /> Analyzes the job posting</li>
                <li className="flex items-center gap-2"><ArrowRight size={16} color="var(--text-muted)" /> Finds the right people — same department, same location, relevant experience</li>
                <li className="flex items-center gap-2"><ArrowRight size={16} color="var(--text-muted)" /> Generates a tailored email specific to that person</li>
                <li className="flex items-center gap-2"><ArrowRight size={16} color="var(--text-muted)" /> Is customizable before sending automatically.</li>
              </ul>
            </div>
            <p className="highlight-text" style={{ textAlign: 'center', fontSize: '1.25rem' }}>
              No templates. No spam. Just intelligent targeting.
            </p>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <p style={{ color: 'var(--status-valid)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                The day I started using this, 4 people replied within hours.
              </p>
              <p style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>
                5 hours of work done in 10 minutes.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
