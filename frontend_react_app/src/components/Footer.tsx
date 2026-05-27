
import React from 'react';
import '../styles/Footer.css';


const Footer: React.FC = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; 2024 Aerolínea XYZ. Todos los derechos reservados.</p>
                <p>Contacto: info@aerolineaxyz.com</p>
            </div>
        </footer>
    );
};

export default Footer;