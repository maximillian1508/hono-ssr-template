import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';

interface AgentFooterProps {
  publisherName: string;
}

/**
 * Agent Footer Component
 * Displays copyright and powered by information
 */
export const AgentFooter: FC<AgentFooterProps> = ({ publisherName }) => {
  return (
    <>
      <Style>{css`
        /* Footer Styles */
        .footer {
          margin-top: 4rem;
          background-color: #1f2937;
          color: white;
          padding: 2rem 0;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-content {
          text-align: center;
        }

        .footer-content p {
          margin: 0.5rem 0;
          font-size: 0.9rem;
          color: #d1d5db;
        }
      `}</Style>

      <footer class="footer">
        <div class="footer-container">
          <div class="footer-content">
            <p>&copy; {new Date().getFullYear()} {publisherName}. All rights reserved.</p>
            <p>Powered by PropertyGenie</p>
          </div>
        </div>
      </footer>
    </>
  );
};
