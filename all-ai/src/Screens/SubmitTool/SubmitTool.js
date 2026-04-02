import React, { useState } from "react";
import { IconUpload, IconCheck } from "@tabler/icons-react";
import Header from "../../Components/Header/Header";
import WebFooter from "../../Components/Footer/Footer";
import { categories, pricingModels } from "../../data/tools";
import "./SubmitTool.css";

export default function SubmitTool() {
    const [formData, setFormData] = useState({
        name: "",
        tagline: "",
        description: "",
        website: "",
        category: "Chatbots",
        pricing: "Free"
    });

    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send an API request
        setTimeout(() => {
            setSubmitted(true);
            window.scrollTo(0, 0);
        }, 500);
    };

    return (
        <div className="submit-page-wrapper">
            <Header />

            <section className="submit-hero">
                <div className="container">
                    <h1 className="submit-title">Submit a <span className="gradient-text">New Tool</span></h1>
                    <p className="submit-subtitle">Join the largest AI directory and share your creation with millions of professionals.</p>
                </div>
            </section>

            <main className="container submit-main">
                {submitted ? (
                    <div className="success-state">
                        <div className="success-icon-circle">
                            <IconCheck size={48} />
                        </div>
                        <h2>Tool Submitted Successfully!</h2>
                        <p>Thank you for submitting <strong>{formData.name}</strong>. Our team will review your submission shortly.</p>
                        <button className="btn-primary" onClick={() => {
                            setSubmitted(false);
                            setFormData({ name: "", tagline: "", description: "", website: "", category: "Chatbots", pricing: "Free" });
                        }}>
                            Submit Another Tool
                        </button>
                    </div>
                ) : (
                    <form className="submit-form" onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h3>Basic Information</h3>

                            <div className="form-group">
                                <label>Tool Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. ChatGPT"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Catchy Tagline *</label>
                                <input
                                    type="text"
                                    name="tagline"
                                    placeholder="Short description under 60 characters..."
                                    maxLength={60}
                                    required
                                    value={formData.tagline}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Full Description *</label>
                                <textarea
                                    name="description"
                                    placeholder="What does your tool do? Who is it for? Be descriptive..."
                                    rows={4}
                                    required
                                    value={formData.description}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Website URL *</label>
                                <input
                                    type="url"
                                    name="website"
                                    placeholder="https://..."
                                    required
                                    value={formData.website}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Categorization</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Primary Category *</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange}>
                                        {categories.filter(c => c !== "All").map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Pricing Model *</label>
                                    <select name="pricing" value={formData.pricing} onChange={handleInputChange}>
                                        {pricingModels.map(price => (
                                            <option key={price} value={price}>{price}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-primary submit-btn">
                                <IconUpload size={20} />
                                Submit Tool for Review
                            </button>
                        </div>
                    </form>
                )}
            </main>

            <WebFooter />
        </div>
    );
}
