import React from "react";
import "./AITools.css";
import Header from "../../Components/Header/Header";
import WebFooter from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const AITools = () => {
  const navigate = useNavigate();
  const categories = [
    {
      title: "AI Productivity Tools",
      image: "../assets/11.webp",
      subcategories: ["research (306)", "spreadsheets (48)", "translator (31)"],
      onclick: () => navigate("/AIAgent"), // Corrected syntax for navigate
    },
    {
      title: "AI Video Tools",
      image: "../assets/11.webp",
      subcategories: ["personal assistant", "spreadsheets", "translator"],
      onclick: () => navigate("/AIAgent"), // Corrected syntax for navigate
    },
    {
      title: "AI Text Generators",
      image: "../assets/11.webp",
      subcategories: [
        "prompt generators (72)",
        "writing generators (220)",
        "paraphrasing (17)",
      ],
      onclick: () => navigate("/AIAgent"), // Corrected syntax for navigate
    },
    {
      title: "AI Business Tools",
      image: "../assets/11.webp",
      subcategories: [
        "website builders (54)",
        "marketing (326)",
        "finance (150)",
      ],
      onclick: () => navigate("/AIAgent"), // Corrected syntax for navigate
    },
    // Add more categories as needed
  ];

  return (
    <>
      <Header />
      <div>
        <div id="header-container"></div>
        <div className="ai-tools-body-container">
          <main>
            <section className="ai-tools-hero">
              <center>
                <h2>All AI Tool Categories</h2>
                <p>Find Most Popular and Featured Tools by Category</p>
              </center>
            </section>

            <section className="ai-tools-categories">
              {categories.map((category, index) => (
                <div
                  className="ai-tools-card"
                  style={{ width: "40rem" }}
                  key={index}
                >
                  <div
                    className="ai-tools-card-body"
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      gap: "40px",
                    }}
                  >
                    <div>
                      <img
                        src={category.image}
                        className="ai-tools-card-img-top"
                        alt={category.title}
                        style={{ width: "300px", height: "350px" }}
                      />
                    </div>
                    <div>
                      <div>
                        <h4
                          className="ai-tools-card-title"
                          style={{ marginBottom: "30px", marginTop: "20px" }}
                        >
                          <b>{category.title}</b>
                        </h4>
                        {category.subcategories.map((subcat, subIndex) => (
                          <h6
                            className="ai-tools-card-subtitle mb-2 text-body-secondary"
                            style={{ marginBottom: "20px" }}
                            key={subIndex}
                          >
                            {subcat}
                          </h6>
                        ))}
                      </div>
                      <div
                        onClick={() => navigate("/AIAgent")}
                        className="ai-tools-card-link"
                      >
                        Show all {category.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>
      <WebFooter />
    </>
  );
};

export default AITools;
