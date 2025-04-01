import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; Sargam - 2025. All rights reserved.</p>
                {/* <ul className="flex justify-center space-x-4 mt-4">
                    <li><a href="/about" className="hover:underline">About Us</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                    <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                </ul> */}
            </div>
        </footer>
    );
};

export default Footer;
