import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconBolt, IconVideo, IconTextSize, IconBriefcase, IconCode, IconMusic, IconCamera, IconDatabase } from "@tabler/icons-react";
import Header from "../../Components/Header/Header";
import WebFooter from "../../Components/Footer/Footer";
import "./AITools.css";

const toolCategories = [
  {
    id: "productivity",
    title: "AI Productivity",
    icon: <IconBolt size={32} />,
    description: "Boost your daily workflow with AI-powered task management, research, and scheduling.",
    subcategories: ["Research (306)", "Spreadsheets (48)", "Scheduling (124)", "Automation (89)"],
    color: "#E0F2FE"
  },
  {
    id: "video",
    title: "AI Video",
    icon: <IconVideo size={32} />,
    description: "Create professional videos from text prompts and automate video editing tasks.",
    subcategories: ["Video Editing (156)", "Avatars (67)", "Personalized Video (42)", "Subtitles (31)"],
    color: "#F0FDF4"
  },
  {
    id: "content",
    title: "AI Writing & Text",
    icon: <IconTextSize size={32} />,
    description: "Generate high-quality articles, copy, and creative stories with advanced LLMs.",
    subcategories: ["Copywriting (326)", "SEO (112)", "Paraphasing (54)", "Email (98)"],
    color: "#FEF2F2"
  },
  {
    id: "business",
    title: "AI Business",
    icon: <IconBriefcase size={32} />,
    description: "Scale your business with AI marketing, sales automation, and website building.",
    subcategories: ["Marketing (412)", "Sales (187)", "Finance (96)", "Legal (45)"],
    color: "#FFFBEB"
  },
  {
    id: "development",
    title: "AI Coding",
    icon: <IconCode size={32} />,
    description: "Write code faster with AI pair programmers and automated bug testing.",
    subcategories: ["Code Assistants (84)", "No-Code (62)", "Documentation (31)", "Web Search (22)"],
    color: "#F5F3FF"
  },
  {
    id: "audio",
    title: "AI Audio & Voice",
    icon: <IconMusic size={32} />,
    description: "Transform audio with AI text-to-speech, music generation, and voice cloning.",
    subcategories: ["Text to Speech (143)", "Music (56)", "Editing (38)", "Transcriber (72)"],
    color: "#ECFDF5"
  },
  {
    id: "image",
    title: "AI Images & Art",
    icon: <IconCamera size={32} />,
    description: "Design stunning visual content and generate art with simple text prompts.",
    subcategories: ["Image Gen (210)", "Logo Maker (85)", "Design (112)", "Editors (76)"],
    color: "#EFF6FF"
  },
  {
    id: "data",
    title: "AI Data Analysis",
    icon: <IconDatabase size={32} />,
    description: "Uncover insights and automate data processing with powerful AI models.",
    subcategories: ["Analytics (94)", "SQL (28)", "Scraping (45)", "Prediction (31)"],
    color: "#FDF2F8"
  }
];

const AITools = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = toolCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="tools-page-wrapper">
      <Header onSearch={(q) => setSearchQuery(q)} />

      <section className="tools-hero">
        <div className="container">
          <h1 className="tools-title">AI Tool <span className="gradient-text">Categories</span></h1>
          <p className="tools-subtitle">Discover over 10,000+ AI tools organized into structured categories to find exactly what you need.</p>
        </div>
      </section>

      <main className="container tools-main">
        <div className="tools-grid-layout">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="tools-category-card"
              onClick={() => navigate("/AIAgent")}
              style={{ "--accent-fill": category.color }}
            >
              <div className="tools-card-header">
                <div className="tools-icon-box">
                  {category.icon}
                </div>
                <div className="tools-title-group">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </div>

              <div className="tools-sub-list">
                {category.subcategories.map((sub, idx) => (
                  <span key={idx} className="sub-tag">{sub}</span>
                ))}
              </div>

              <div className="tools-card-footer">
                <span className="view-link">
                  Explore All <IconArrowRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <WebFooter />
    </div>
  );
};

export default AITools;

