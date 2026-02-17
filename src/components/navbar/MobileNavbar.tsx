"use client";
import Link from "next/link";

interface MobileNavbarProps {
    isOpen: boolean;
    onToggle: () => void;
    onLogoClick: () => void;
}

export function MobileNavbar({ isOpen, onToggle, onLogoClick }: MobileNavbarProps) {
    return (
        <div className="mobile-nav">
            <Link href="/" className="mobile-logo" onClick={onLogoClick}>HJ.</Link>
            <button className="mobile-menu-btn" onClick={onToggle}>
                {isOpen ? "Close" : "Menu"}
            </button>

            <style jsx>{`
        .mobile-nav {
          display: none;
        }

        @media (max-width: 1024px) {
          .mobile-nav {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 64px;
            background: #000;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            z-index: 1000;
            align-items: center;
            justify-content: space-between;
            padding: 0 1.5rem;
          }

          .mobile-logo { 
            color: #fff; 
            font-weight: 900; 
            text-decoration: none; 
            font-size: 1.2rem; 
          }

          .mobile-menu-btn { 
            background: none; 
            border: 1px solid rgba(255,255,255,0.1); 
            color: #fff; 
            padding: 6px 16px; 
            border-radius: 10px; 
            font-size: 0.85rem; 
            font-weight: 600; 
            cursor: pointer;
          }
        }
      `}</style>
        </div>
    );
}
