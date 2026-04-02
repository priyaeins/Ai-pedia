import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import WebFooter from "../../Components/Footer/Footer";
import AIImagecards from "../../Components/AIImagecards/AIImagecards";
import AlertModal from "../../Components/AlertModal/AlertModal";
import { tools } from "../../data/tools";
import "./SavedTools.css";

export default function SavedTools() {
    const [savedTools, setSavedTools] = useState([]);
    const [alertConfig, setAlertConfig] = useState({ visible: false, message: "", id: null });

    const loadBookmarks = () => {
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        const bookmarkedTools = tools
            .filter(t => savedBookmarks.includes(t.id))
            .map(t => ({ ...t, Bookmarked: true }));
        setSavedTools(bookmarkedTools);
    };

    useEffect(() => {
        loadBookmarks();

        // Listen to cross-tab or component updates
        const handleStorageChange = () => loadBookmarks();
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleBookmarkClick = (id) => {
        const tool = savedTools.find(t => t.id === id);
        if (tool) {
            setAlertConfig({ visible: true, message: `Remove ${tool.name} from your saved tools?`, id });
        }
    };

    const removeBookmark = (id) => {
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        const newBookmarks = savedBookmarks.filter(bid => bid !== id);
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));

        // Dispatch storage event to trigger update in Header
        window.dispatchEvent(new Event("storage"));

        loadBookmarks(); // Reload immediate list
    };

    return (
        <div className="saved-tools-wrapper">
            <Header />

            <section className="saved-hero">
                <div className="container">
                    <h1 className="saved-title">Your <span className="gradient-text">Saved Tools</span></h1>
                    <p className="saved-subtitle">Manage and access all the AI tools you've bookmarked for later.</p>
                </div>
            </section>

            <main className="container saved-main">
                {savedTools.length === 0 ? (
                    <div className="empty-state">
                        <h3>No saved tools yet!</h3>
                        <p>Go explore the directory and bookmark tools you find interesting.</p>
                    </div>
                ) : (
                    <div className="tools-grid">
                        {savedTools.map(tool => (
                            <AIImagecards
                                key={tool.id}
                                item={tool}
                                handleBookmarkClick={handleBookmarkClick}
                            />
                        ))}
                    </div>
                )}
            </main>

            <WebFooter />

            {alertConfig.visible && (
                <AlertModal
                    description={alertConfig.message}
                    buttonok="Unsave"
                    onClose={(confirmed) => {
                        if (confirmed) removeBookmark(alertConfig.id);
                        setAlertConfig({ visible: false, message: "", id: null });
                    }}
                />
            )}
        </div>
    );
}
