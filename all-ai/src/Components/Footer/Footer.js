import React from "react";
import { Link } from "react-router-dom";
import { IconBrandTwitter, IconBrandGithub, IconBrandLinkedin, IconBrandYoutube, IconArrowRight } from "@tabler/icons-react";
import "./Footer.css";

export default function WebFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              AI<span>.</span>PEDIA
            </Link>
            <p className="footer-tagline">
              The world's largest AI tools directory, updated daily.
              Helping you discover the future of productivity.
            </p>
            <div className="social-links">
              <a href="#!" className="social-icon"><IconBrandTwitter size={20} /></a>
              <a href="#!" className="social-icon"><IconBrandGithub size={20} /></a>
              <a href="#!" className="social-icon"><IconBrandLinkedin size={20} /></a>
              <a href="#!" className="social-icon"><IconBrandYoutube size={20} /></a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Platform</h4>
            <Link to="/AITools">Browse Tools</Link>
            <Link to="/AIAgent">AI Agents</Link>
            <Link to="/News">AI News</Link>
            <Link to="/submit">Submit Tool</Link>
          </div>

          <div className="footer-links-col">
            <h4>Resources</h4>
            <Link to="/blog">Blog</Link>
            <Link to="/AITutorials">Tutorials</Link>
            <Link to="/glossary">AI Glossary</Link>
            <Link to="/newsletter">Newsletter</Link>
          </div>

          <div className="footer-newsletter-col">
            <h4>Stay Updated</h4>
            <p>Get the weekly 5-minute digest of the most important AI news and tools.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="email@example.com" />
              <button><IconArrowRight size={20} /></button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AI-Pedia. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

