import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import { getLicenseLabel } from '../types/agent';

interface AgentFooterProps {
  publisherName: string;
  agentName?: string;
  licenseNumber?: string;
  agencyRegistrationNumber?: string;
  phoneNumber?: string;
  email?: string;
  isRenVerified?: boolean;
}

/**
 * Agent Footer Component
 * Displays licensing information, contact details, and copyright
 */
export const AgentFooter: FC<AgentFooterProps> = ({
  publisherName,
  agentName,
  licenseNumber,
  agencyRegistrationNumber,
  phoneNumber,
  email,
  isRenVerified
}) => {
  return (
    <>
      <Style>{css`
        /* Footer Styles */
        .footer {
          margin-top: 4rem;
          background-color: #fafaff;
          color: #1f2937;
          padding: 2rem 0;
          position: relative;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e5e7eb;
        }

        @media (max-width: 768px) {
          .footer-two-column {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .footer-column {
          position: relative;
        }

        .footer-column h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .footer-column p {
          margin: 0.5rem 0;
          font-size: 0.9rem;
          color: #4b5563;
          line-height: 1.6;
        }

        .footer-column strong {
          color: #1f2937;
        }

        .footer-column a {
          color: #3462F4;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-column a:hover {
          color: #2451d9;
          text-decoration: underline;
        }

        .footer-phone-link {
          color: #3462F4;
          text-decoration: none;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
        }

        .footer-phone-link:hover {
          color: #2451d9;
          text-decoration: underline;
        }

        .footer-contact-buttons {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .footer-contact-buttons {
            bottom: 1rem;
            right: 1rem;
            gap: 0.5rem;
          }
        }

        .footer-contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s;
          padding: 0;
        }

        .footer-contact-btn:hover {
          transform: scale(1.1);
        }

        .footer-contact-btn svg {
          width: 50px;
          height: 50px;
        }

        @media (max-width: 768px) {
          .footer-contact-btn svg {
            width: 44px;
            height: 44px;
          }
        }

        .footer-contact-btn#footer-share-button {
          background-color: #3462F4;
          color: white;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .footer-contact-btn#footer-share-button:hover {
          background-color: #2451d9;
          transform: scale(1.05);
        }

        .footer-content {
          text-align: center;
        }

        .footer-content p {
          margin: 0.5rem 0;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .verified-icon {
          width: 20px;
          height: 20px;
          fill: #2563eb;
          margin-left: 5px;
          vertical-align: middle;
        }
      `}</Style>

      <footer class="footer">
        <div class="footer-container">
          <div class="footer-two-column">
            {/* Left Column - Licensing & Registration */}
            <div class="footer-column">
              <h3>Licensing & Registration</h3>
              <p><strong>{publisherName}</strong></p>
              {licenseNumber && (
                <p>
                  {getLicenseLabel(licenseNumber)} <strong>{licenseNumber}</strong>
                  {isRenVerified && (
                    <svg class="verified-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedIcon">
                      <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48z"></path>
                    </svg>
                  )}
                </p>
              )}
              {agencyRegistrationNumber && (
                <p>Agency Reg. no. <strong>{agencyRegistrationNumber}</strong></p>
              )}
            </div>

            {/* Right Column - Contact */}
            <div class="footer-column">
              <h3>Contact</h3>
              {phoneNumber && (
                <p>Phone: <button class="footer-phone-link" id="footer-phone-link">{phoneNumber}</button></p>
              )}
              {email && (
                <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
              )}
              <div class="footer-contact-buttons">
                <button class="footer-contact-btn" id="footer-whatsapp-button">
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="WhatsAppIcon" style="fill:white;background-color:#25d366;border-radius:50%;padding:8px;width:40px;height:40px">
                    <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"></path>
                  </svg>
                </button>
                <button class="footer-contact-btn" id="footer-call-button">
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CallIcon" style="fill:white;background-color:#3462F4;border-radius:50%;padding:8px;width:40px;height:40px">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99"></path>
                  </svg>
                </button>
                <button class="footer-contact-btn" id="footer-share-button">Share</button>
              </div>
            </div>
          </div>

          <div class="footer-content">
            <p>&copy; {new Date().getFullYear()} {agentName || publisherName}. All rights reserved.</p>
            <p>Powered by PropertyGenie</p>
          </div>
        </div>
      </footer>
    </>
  );
};
