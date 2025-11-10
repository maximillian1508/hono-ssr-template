import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';

/**
 * HeaderLeftLinks Component
 * Navigation menu for Buy, Rent, Projects, Resources, Others, Contact Us
 */
export const HeaderLeftLinks: FC = () => {
  const baseUrl = process.env.WEBSITE_URL || 'https://www.propertygenie.com.my';

  return (
    <>
      <Style>{css`
        .nav-list {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 0.5rem;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          padding: 0.6rem 1rem;
          font-weight: 600;
          font-size: 1em;
          color: #2c2c2c;
          text-decoration: none;
          border-radius: 3px;
          transition: all 150ms ease;
        }

        .nav-link:hover,
        .nav-link:focus {
          background: rgba(200, 200, 200, 0.2);
        }

        .nav-link.active {
          color: #6366f1;
        }

        @media (max-width: 1279px) {
          .nav-list {
            display: none;
          }
        }
      `}</Style>

      <nav>
        <ul class="nav-list">
          <li class="nav-item">
            <a href={`${baseUrl}/property-for-sale`} class="nav-link">
              Buy
            </a>
          </li>
          <li class="nav-item">
            <a href={`${baseUrl}/property-for-rent`} class="nav-link">
              Rent
            </a>
          </li>
          <li class="nav-item">
            <a href={`${baseUrl}/project-listing`} class="nav-link">
              Projects
            </a>
          </li>
          <li class="nav-item">
            <a href={`${baseUrl}/insider-guide`} class="nav-link">
              Resources
            </a>
          </li>
          <li class="nav-item">
            <a href={`${baseUrl}/looking-for-agent`} class="nav-link">
              Others
            </a>
          </li>
          <li class="nav-item">
            <a href={`${baseUrl}/contact-us`} class="nav-link">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
