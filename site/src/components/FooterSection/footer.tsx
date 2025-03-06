import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-16 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/*Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-3">Contact Us</h3>
          <p>📧 touilmohamedbachar@gmail.com</p>
          <p>📍 Remote / Worldwide</p>
        </div>

        {/*Social & Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Follow Us</h3>
          <p>🔗 <a href="https://github.com/somebodyawesome-dev" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">GitHub</a></p>
          <p>🔵 <a href="https://www.linkedin.com/in/mohamed-bashar-touil/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">LinkedIn</a></p>
        </div>

        {/*About Us */}
        <div>
          <h3 className="text-xl font-bold mb-3">About Us</h3>
          <p className="text-gray-400">
            We are passionate about making data visualization accessible. Our platform leverages cutting-edge technologies to help developers create interactive and dynamic graphs effortlessly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
