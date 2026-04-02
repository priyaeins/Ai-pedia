import React from "react";
import Header from "../../Components/Header/Header";
import WebFooter from "../../Components/Footer/Footer";
import { newsItems } from "../../data/news";
import { IconCalendar, IconArrowRight, IconArticle } from "@tabler/icons-react";
import "./News.css";

export default function News() {
    return (
        <div className="news-page-wrapper">
            <Header />

            <section className="news-hero">
                <div className="container">
                    <div className="news-badge">
                        <IconArticle size={20} />
                        <span>Daily AI Digest</span>
                    </div>
                    <h1 className="news-title">The Latest in <span className="gradient-text">AI Innovation</span></h1>
                    <p className="news-subtitle">Stay ahead with daily updates, expert analysis, and major announcements from the world of Artificial Intelligence.</p>
                </div>
            </section>

            <main className="container news-main">
                <div className="news-grid">
                    {newsItems.map(item => (
                        <article key={item.id} className="news-card">
                            <div className="news-image-box">
                                <img src={item.image} alt={item.title} />
                                <span className="news-cat-badge">{item.category}</span>
                            </div>
                            <div className="news-content">
                                <div className="news-meta">
                                    <IconCalendar size={14} />
                                    <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.summary}</p>
                                <a href={item.link} className="news-read-more">
                                    Read Full Story <IconArrowRight size={16} />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="newsletter-cta">
                    <h2>Never miss a headline</h2>
                    <p>Join 50,000+ professionals who get our daily AI briefing.</p>
                    <div className="cta-form">
                        <input type="email" placeholder="Enter your email" />
                        <button className="btn-primary">Subscribe Now</button>
                    </div>
                </div>
            </main>

            <WebFooter />
        </div>
    );
}
