import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, ArrowRight, Search, Target, PenTool, Sliders, Clock, TrendingUp, Zap, Shield, Play } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, status: 'pending' }]);

      if (error) throw error;
      
      setStatus('success');
      setMsg('You have been added to the waitlist!');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="landing-wrapper">
      {/* Ambient background for depth */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-container">
          <div className="brand-logo">JobReach</div>
          <div className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#features">Features</a>
            <a href="#roi">ROI</a>
          </div>
          <button className="btn btn-primary nav-cta" onClick={() => document.getElementById('waitlist').scrollIntoView({behavior: 'smooth'})}>
            Get Early Access
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-content animate-fade-in stagger-1">
          <div className="pill-badge">
            <span className="pulse-dot"></span> Building in public beta
          </div>
          <h1 className="hero-title">Automate Your Job Search Outreach with AI</h1>
          <p className="hero-subtitle">
            Skip the generic templates and guesswork. Paste a job URL, let AI analyze the role, automatically navigate to the right hiring managers, and select exactly who you want to reach out to for hyper-personalized emails.
          </p>
          <div className="hero-cta-group">
            <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('waitlist').scrollIntoView({behavior: 'smooth'})}>
              Join the Waitlist <ArrowRight size={20} />
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => document.getElementById('how-it-works').scrollIntoView({behavior: 'smooth'})}>
              <Play size={20} fill="currentColor" /> See how it works
            </button>
          </div>
        </div>

        {/* CSS-based Widget UI Visual */}
        <div className="hero-visual animate-fade-in stagger-2">
          <div className="widget-ui">
            <div className="widget-header">
              <div className="window-controls">
                <span></span><span></span><span></span>
              </div>
              <div className="widget-title">jobreach.ai / pipeline</div>
            </div>
            <div className="widget-body">
              <div className="widget-step active">
                <Search size={16} /> <span>Analyzing greenhouse.io/stripe/swe...</span>
              </div>
              <div className="widget-step active">
                <Target size={16} /> <span>Found 3 Engineering Managers in NYC</span>
              </div>
              <div className="widget-step active">
                <PenTool size={16} /> <span>Drafting personalized emails with AI...</span>
              </div>
              <div className="widget-email-preview">
                <div className="ep-header">
                  <strong>To:</strong> sarah.j@stripe.com
                </div>
                <div className="ep-subject">
                  <strong>Subject:</strong> Software Engineer role @ Stripe | Distributed Systems
                </div>
                <div className="ep-body">
                  Hi Sarah,<br/><br/>
                  Saw Stripe is scaling the global payments team. Based on my experience building distributed systems in Go and Kubernetes, I'd love to chat...
                </div>
                <div className="ep-footer">
                  <button className="ep-btn ep-send">Send Now</button>
                  <button className="ep-btn ep-edit">Edit Draft</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative floating elements */}
          <div className="floating-badge fb-1"><CheckCircle size={14} color="var(--status-valid)"/> 99% Deliverability</div>
          <div className="floating-badge fb-2"><Zap size={14} color="#f59e0b"/> 10x Faster</div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <p>Targeting hiring managers at top companies like</p>
        <div className="logo-marquee">
          <span>Stripe</span>
          <span>Google</span>
          <span>Meta</span>
          <span>OpenAI</span>
          <span>Rippling</span>
          <span>Airbnb</span>
        </div>
      </section>

      {/* Problem / Solution (ROI) */}
      <section id="roi" className="roi-section container">
        <div className="section-header text-center animate-fade-in">
          <h2>Stop wasting hours on cold outreach.</h2>
          <p>The traditional approach is broken. JobReach collapses hours of manual labor into minutes.</p>
        </div>
        
        <div className="vs-grid animate-fade-in stagger-3">
          <div className="vs-card old-way">
            <div className="vs-badge">The Old Way</div>
            <div className="vs-metric">
              <span className="number">5-10</span>
              <span className="label">Hours spent</span>
            </div>
            <ul className="vs-list">
              <li><div className="vs-icon cross">✕</div> Manually search LinkedIn for hours</li>
              <li><div className="vs-icon cross">✕</div> Guess email formats and hope they don't bounce</li>
              <li><div className="vs-icon cross">✕</div> Write generic templates that get ignored</li>
              <li><div className="vs-icon cross">✕</div> Less than 1% reply rate</li>
            </ul>
          </div>

          <div className="vs-card new-way glass-panel">
            <div className="vs-badge glow">With JobReach</div>
            <div className="vs-metric primary">
              <span className="number">10</span>
              <span className="label">Minutes flat</span>
            </div>
            <ul className="vs-list">
              <li><div className="vs-icon check">✓</div> AI perfectly targets the right department & location</li>
              <li><div className="vs-icon check">✓</div> Verifies emails automatically via advanced server checks</li>
              <li><div className="vs-icon check">✓</div> LLMs draft hyper-personalized, non-templated emails</li>
              <li><div className="vs-icon check">✓</div> &gt; 10x increase in positive reply rates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bento Box Features */}
      <section id="features" className="features-section container">
        <div className="section-header animate-fade-in">
          <h2>An intelligent pipeline.</h2>
          <p>Built from the ground up for zero spam and maximum precision.</p>
        </div>

        <div className="bento-grid animate-fade-in stagger-4">
          <div className="bento-card bento-wide glass-panel">
            <div className="bento-icon"><Search /></div>
            <h3>Intelligent Context Analysis</h3>
            <p>Paste any job URL from Greenhouse, Lever, Ashby or direct sites. Our system instantly extracts the required skills, role context, and company info.</p>
          </div>
          
          <div className="bento-card glass-panel">
            <div className="bento-icon"><Target /></div>
            <h3>Precision Targeting</h3>
            <p>Automatically finds recruiters, engineering managers, and team leads at the exact company using advanced targeted search.</p>
          </div>
          
          <div className="bento-card glass-panel">
            <div className="bento-icon"><Shield /></div>
            <h3>Bulletproof Verification</h3>
            <p>Emails are pattern-matched and strictly verified via enterprise-grade server checks to ensure 99% deliverability and protect your sender reputation.</p>
          </div>

          <div className="bento-card bento-wide glass-panel">
            <div className="bento-icon"><PenTool /></div>
            <h3>Hyper-Personalized Drafting</h3>
            <p>Powered by advanced AI models, the system writes a completely unique email for each person, perfectly blending their company context with your specific resume skills. You maintain full control to review and edit before anything is sent. <strong>100% no spam.</strong></p>
          </div>
        </div>
      </section>

      {/* Waitlist Capture */}
      <section id="waitlist" className="waitlist-section container animate-fade-in stagger-4">
        <div className="glass-panel capture-panel">
          <h2>Reserve Your Spot</h2>
          <p>Save hours of busywork and land your next role faster. Join the private beta waitlist.</p>
          
          <form onSubmit={handleSubmit} className="capture-form">
            <div className="input-with-icon">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                className="input-field" 
                placeholder="name@email.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Joining...' : 'Get Early Access'}
            </button>
          </form>

          {status === 'success' && (
            <div className="status-msg success">
              <CheckCircle size={18} /> {msg}
            </div>
          )}
          {status === 'error' && (
            <div className="status-msg error">
              {msg}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-logo small">JobReach</div>
            <p>Automated, intelligent job search outreach.</p>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} JobReach. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
