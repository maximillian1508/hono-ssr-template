import type { FC } from 'hono/jsx';
import type { AgentApiResponse } from '../types/agent';
import { getLicenseLabel, formatContactNumber } from '../types/agent';

interface AgentProfileProps {
  agent: AgentApiResponse;
  domain: string;
  accountId: string;
}

/**
 * Agent Profile Component - Premium Version
 * Displays agent information without authentication
 */
export const AgentProfile: FC<AgentProfileProps> = ({ agent, domain, accountId }) => {
  // Extract agent data
  const name = agent.name;
  const description = agent.description || '';

  // Get mobile phone contact
  const mobileContact = agent.contact?.items?.find(
    item => item.type?.code === 'mobile-phone'
  );
  const contactNumber = mobileContact?.value || '';
  const maskedContact = formatContactNumber(contactNumber);

  const licenseNumber = agent.licenseNumber || '';
  const publisherName = agent.publisher?.name || '';
  const publisherRegistrationNumber = agent.publisher?.registrationNumber || '';

  const avatarUrl = agent.image?.medium?.src || '/amenties-placeholder.png';

  const isRenVerified = agent._metadata?.isRenVerified || false;
  const isMobileVerified = agent._metadata?.isMobileVerified || false;

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{name} from {publisherName} | Property Genie</title>
        <meta
          name="description"
          content={`${name} from ${publisherName}. ${description.substring(0, 150)}...`}
        />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
          }

          .hero-section {
            background-image: url(/images/agent-profile-hero.webp);
            background-size: cover;
            background-position: center top;
            background-repeat: no-repeat;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 45vh;
            max-height: 400px;
            background-color: #6366f1;
          }

          .hero-section p {
            color: white;
            font-size: 2.5rem;
            font-weight: bold;
            border-bottom: 2px solid white;
            padding: 0 3rem 0.5rem 3rem;
          }

          .agent-detail-section {
            max-width: 1280px;
            margin: 0 auto;
            width: 100%;
            padding: 0 2rem;
            position: relative;
          }

          .image-container {
            background-color: white;
            padding: 5px;
            border: solid 1px #e0e0e0;
            position: absolute;
            top: -100px;
            left: 30px;
            width: 250px;
            height: 250px;
          }

          .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: 2px solid white;
          }

          .info-container {
            padding: 25px 25px 0 0;
            margin-left: 300px;
            position: relative;
            min-height: 200px;
          }

          .info-container h1 {
            margin: 0 0 5px 0;
            font-weight: 600;
            font-size: 2rem;
          }

          .info-container h3 {
            color: #666;
            font-weight: 500;
            font-size: 1.3rem;
            margin: 0;
          }

          .contact-section {
            position: absolute;
            top: 30px;
            right: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .contact-btn {
            background-color: white;
            border-radius: 25px;
            padding: 8px 20px;
            border: 1px solid #6366f1;
            font-size: 1rem;
            cursor: pointer;
            text-decoration: none;
            color: #333;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }

          .contact-btn:hover {
            background-color: #f3f4f6;
          }

          .icon-whatsapp {
            display: inline-block;
            width: 24px;
            height: 24px;
            background-color: #25D366;
            border-radius: 50%;
            color: white;
            text-align: center;
            line-height: 24px;
            font-size: 14px;
          }

          .icon-phone {
            display: inline-block;
            width: 24px;
            height: 24px;
            background-color: #6366f1;
            border-radius: 50%;
            color: white;
            text-align: center;
            line-height: 24px;
            font-size: 14px;
          }

          .details-container {
            margin-top: 2rem;
            margin-left: 300px;
          }

          .details-container p {
            color: #666;
            margin: 5px 0;
            font-size: 1.05rem;
          }

          .details-container strong {
            color: #6366f1;
          }

          .description-container {
            margin-top: 2rem;
            margin-left: 300px;
          }

          .description-container p {
            line-height: 1.8;
            color: #333;
          }

          .meta-info {
            margin-top: 3rem;
            padding: 1rem;
            background: #f9fafb;
            border-radius: 8px;
            margin-left: 300px;
          }

          .meta-info p {
            color: #999;
            font-size: 0.9rem;
            margin: 0.5rem 0;
          }

          @media (max-width: 768px) {
            .hero-section p {
              font-size: 1.5rem;
            }

            .hero-section {
              height: 35vh;
            }

            .image-container {
              width: 200px;
              height: 200px;
              left: 20px;
            }

            .info-container,
            .details-container,
            .description-container,
            .meta-info {
              margin-left: 0;
              margin-top: 120px;
            }

            .details-container {
              margin-top: 2rem;
            }

            .contact-section {
              position: static;
              margin-top: 1rem;
              justify-content: flex-start;
            }
          }
        `}</style>
      </head>
      <body>
        <div class="hero-section">
          <p>PROPERTY AGENT</p>
        </div>

        <div class="agent-detail-section">
          <div class="image-container">
            <img src={avatarUrl} alt={name} />
          </div>

          <div class="info-container">
            <h1>{name}</h1>
            <h3>{publisherName}</h3>

            <div class="contact-section">
              <a
                href={`https://wa.me/${contactNumber}/?text=Hi ${name}, I am looking for property. I'm eager to explore the available options and would appreciate it if you could share details about any properties you have. Thank you!`}
                class="contact-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="icon-whatsapp">💬</span>
              </a>
              <button class="contact-btn" onclick="alert('Please login to view contact details')">
                <span class="icon-phone">📞</span>
              </button>
              <button class="contact-btn">Share</button>
            </div>
          </div>

          <div class="details-container">
            <p>
              {maskedContact}
              {isMobileVerified && <span style="color: #2563eb; margin-left: 5px;">✓</span>}
            </p>
            <p>
              {getLicenseLabel(licenseNumber)} <strong>{licenseNumber}</strong>
              {isRenVerified && <span style="color: #2563eb; margin-left: 5px;">✓</span>}
            </p>
            <p>
              Agency Reg. no. <strong>{publisherRegistrationNumber}</strong>
            </p>
          </div>

          {description && (
            <div class="description-container">
              <p>{description}</p>
            </div>
          )}

          <div class="meta-info">
            <p>Domain: {domain}</p>
            <p>Account ID: {accountId}</p>
          </div>
        </div>
      </body>
    </html>
  );
};
