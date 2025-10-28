import React from "react";
import Footer from "rc-footer";
import "rc-footer/assets/index.css"; // Ensure this path is correct based on your project structure

import "./Footer.css";

export default function WebFooter() {
  return (
    <div className="footer-container">
      <Footer
        columns={[
          {
            icon: (
              <img
                src="/Assets/logo.png"
                alt="Logo"
                style={{ width: 180, height: 80 }} // Adjust size as needed
              />
            ),
            url: "/",
            openExternal: true,
          },

          {
            style: { textAlign: "left" },
            title: "Company",
            items: [
              {
                title: "About Us",
                url: "https://example.com/about",
                openExternal: true,
              },
              {
                title: "AITools",
                url: "https://example.com/careers",
                openExternal: true,
              },
              {
                title: "AIAgents",
                url: "https://example.com/contact",
                openExternal: true,
              },
            ],
          },
        ]}
        bottom="Made with ❤️ "
        backgroundColor="#04102c"
        theme="dark"
        maxColumnsPerRow={3}
      />
    </div>
  );
}
