import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';

interface NotFoundProps {
  domain?: string;
}

/**
 * 404 Not Found Component
 * Displays a user-friendly 404 page following the agent profile design structure
 */
export const NotFound: FC<NotFoundProps> = ({ domain }) => {
  const pageTitle = '404 - Page Not Found';
  const pageDescription = 'The page you are looking for could not be found.';
  const homeUrl = '/';

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="noindex, nofollow" />

        {/* Theme */}
        <meta name="theme-color" content="#3462F4" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" type="text/css" />
        </noscript>
        <Style>{css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: Poppins, sans-serif;
            line-height: 1.5;
            font-weight: 400;
            color: #2c2c2c;
            font-size: 1rem;
            background: white;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          h1, h2, h3, h4, h5, h6, p, span, a, button {
            font-family: Poppins, sans-serif;
          }

          main {
            display: flex;
            flex: 1;
            flex-direction: column;
            background: white;
          }

          .not-found-section {
            background-image: url(/images/agent-profile-hero.webp);
            background-size: cover;
            background-position: center top;
            background-repeat: no-repeat;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            min-height: 60vh;
            background-color: #3462F4;
            padding: 2rem;
          }

          .not-found-content {
            width: 100%;
            max-width: 600px;
            text-align: center;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            padding: 3rem 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }

          .not-found-icon {
            font-size: 6rem;
            color: #3462F4;
            margin-bottom: 1rem;
            line-height: 1;
          }

          .not-found-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2c2c2c;
            margin-bottom: 0.5rem;
          }

          .not-found-subtitle {
            font-size: 1.25rem;
            font-weight: 500;
            color: #666;
            margin-bottom: 1rem;
          }

          .not-found-description {
            font-size: 1rem;
            color: #666;
            margin-bottom: 2rem;
            line-height: 1.6;
          }

          .home-button {
            display: inline-block;
            background: #3462F4;
            color: white;
            padding: 0.875rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
          }

          .home-button:hover {
            background: #2851d8;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(52, 98, 244, 0.3);
          }

          .home-button:active {
            transform: translateY(0);
          }

          @media (max-width: 768px) {
            .not-found-section {
              padding: 1.5rem;
            }

            .not-found-content {
              padding: 2rem 1.5rem;
            }

            .not-found-icon {
              font-size: 4rem;
            }

            .not-found-title {
              font-size: 1.5rem;
            }

            .not-found-subtitle {
              font-size: 1rem;
            }

            .not-found-description {
              font-size: 0.875rem;
            }

            .home-button {
              padding: 0.75rem 1.5rem;
              font-size: 0.875rem;
            }
          }
        `}</Style>
      </head>

      <body>
        <main>
          <div class="not-found-section">
            <div class="not-found-content">
              <div class="not-found-icon">404</div>
              <h1 class="not-found-title">Page Not Found</h1>
              <p class="not-found-subtitle">Oops! We can't find that page.</p>
              <p class="not-found-description">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
              <a href={homeUrl} class="home-button">
                Return to Home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
};
