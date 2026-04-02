import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    IconArrowLeft,
    IconStarFilled,
    IconCircleCheckFilled,
    IconBookmark,
    IconBookmarkFilled,
    IconExternalLink,
    IconShare
} from "@tabler/icons-react";
import Header from "../../Components/Header/Header";
import WebFooter from "../../Components/Footer/Footer";
import AlertModal from "../../Components/AlertModal/AlertModal";
import { tools } from "../../data/tools";
import "./ToolDetail.css";

export default function ToolDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tool, setTool] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ visible: false, message: "" });

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
        const foundTool = tools.find(t => t.id === id);
        if (foundTool) {
            setTool(foundTool);
            setIsBookmarked(JSON.parse(localStorage.getItem(`bookmark_${id}`)) || false);
        }
    }, [id]);

    if (!tool) {
        return (
            <div className="tool-detail-wrapper">
                <Header />
                <div className="container not-found-wrapper">
                    <h2>Tool not found</h2>
                    <button className="btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                <WebFooter />
            </div>
        );
    }

    const handleBookmarkClick = () => {
        if (isBookmarked) {
            setAlertConfig({ visible: true, message: `Remove ${tool.name} from your saved tools?` });
        } else {
            toggleBookmark(true);
        }
    };

    const toggleBookmark = (status) => {
        setIsBookmarked(status);
        localStorage.setItem(`bookmark_${id}`, JSON.stringify(status));

        // Update global bookmarks array
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        let newBookmarks = [];
        if (status) {
            newBookmarks = [...new Set([...savedBookmarks, id])];
        } else {
            newBookmarks = savedBookmarks.filter(bid => bid !== id);
        }
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    };

    const getPricingStyle = (pricing) => {
        const p = pricing?.toLowerCase();
        if (p === "free") return "pricing-free";
        if (p === "freemium") return "pricing-freemium";
        if (p === "paid") return "pricing-paid";
        return "pricing-default";
    };

    return (
        <div className="tool-detail-wrapper">
            <Header />

            <main className="tool-detail-main">
                <div className="container">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <IconArrowLeft size={20} />
                        Back to Tools
                    </button>

                    <div className="detail-header-card">
                        <div className="detail-header-content">
                            <div className="detail-image-box">
                                <img src={tool.image} alt={tool.name} />
                            </div>

                            <div className="detail-info-box">
                                <div className="detail-title-row">
                                    <h1 className="detail-title">
                                        {tool.name}
                                        {tool.verified && <IconCircleCheckFilled size={24} className="verified-icon" />}
                                    </h1>
                                    <div className="detail-actions">
                                        <button className="action-circle-btn">
                                            <IconShare size={20} />
                                        </button>
                                        <button
                                            className={`action-circle-btn ${isBookmarked ? "active" : ""}`}
                                            onClick={handleBookmarkClick}
                                        >
                                            {isBookmarked ? <IconBookmarkFilled size={20} /> : <IconBookmark size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <p className="detail-tagline">{tool.tagline}</p>

                                <div className="detail-meta-row">
                                    <span className={`pricing-badge ${getPricingStyle(tool.pricing)}`}>{tool.pricing}</span>
                                    <div className="detail-rating">
                                        <IconStarFilled size={18} className="star-icon" />
                                        <strong>{tool.rating}</strong>
                                        <span>({tool.reviews} reviews)</span>
                                    </div>
                                    <div className="detail-category-pill">{tool.category}</div>
                                </div>

                                <div className="detail-tags">
                                    {tool.tags?.map((tag, idx) => (
                                        <span key={idx} className="tag-pill">{tag}</span>
                                    ))}
                                </div>

                                <div className="detail-cta-row">
                                    <a href={tool.visitLink} target="_blank" rel="noopener noreferrer" className="btn-primary visit-btn">
                                        Visit Website <IconExternalLink size={18} />
                                    </a>
                                    <div className="saves-count">
                                        <IconBookmarkFilled size={16} className="fav-icon" />
                                        {(tool.favorites || 0).toLocaleString()} people saved this
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-content-layout">
                        <div className="main-description">
                            <h2>About {tool.name}</h2>
                            <div className="desc-text">
                                <p>{tool.description}</p>
                                {/* Simulated longer description for structure */}
                                <p>Designed for professionals and enthusiasts alike, {tool.name} streamlines your workflow by integrating state-of-the-art AI capabilities directly into your daily tasks. Whether you're looking to automate repetitive processes, generate high-quality content, or analyze complex data points, this tool provides a robust solution.</p>
                                <p>With an intuitive interface and powerful backend algorithms, users can expect significant time savings and improved productivity immediately upon implementation.</p>
                            </div>
                        </div>

                        <div className="side-panel">
                            <div className="panel-card info-card">
                                <h3>Key Features</h3>
                                <ul className="feature-list">
                                    <li><IconCircleCheckFilled size={16} /> Fast Processing</li>
                                    <li><IconCircleCheckFilled size={16} /> Intuitive Interface</li>
                                    <li><IconCircleCheckFilled size={16} /> Regular Updates</li>
                                    <li><IconCircleCheckFilled size={16} /> Dedicated Support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <WebFooter />

            {alertConfig.visible && (
                <AlertModal
                    description={alertConfig.message}
                    buttonok="Unsave"
                    onClose={(confirmed) => {
                        if (confirmed) toggleBookmark(false);
                        setAlertConfig({ visible: false, message: "" });
                    }}
                />
            )}
        </div>
    );
}
