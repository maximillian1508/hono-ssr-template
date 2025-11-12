import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';

interface ShareModalProps {
  url: string;
  title: string;
}

/**
 * ShareModal Component
 * A reusable modal for sharing content on social media platforms
 */
export const ShareModal: FC<ShareModalProps> = ({ url, title }) => {
  return (
    <>
      <Style>{css`
        /* Share Modal Overlay Styles */
        .share-modal-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 9999;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }

        .share-modal-overlay.active {
          display: flex;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .share-modal-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s ease-out;
        }

        .share-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .share-modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        .share-modal-close-button {
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          color: #6b7280;
          font-size: 1.5rem;
          line-height: 1;
          transition: all 0.2s;
        }

        .share-modal-close-button:hover {
          background: #f3f4f6;
          color: #000;
        }

        /* Share Modal Specific Styles */
        .share-modal-content {
          padding: 1.5rem;
        }

        .share-button-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          margin: 1.5rem 0;
        }

        .share-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: transform 0.2s;
          background: none;
          border: none;
          padding: 0;
        }

        .share-button:hover {
          transform: scale(1.1);
        }

        .share-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .share-icon svg {
          width: 24px;
          height: 24px;
          fill: white;
        }

        .share-label {
          font-size: 0.75rem;
          color: #666;
        }

        .share-divider {
          margin: 1.5rem 0;
          opacity: 1;
          border-color: #dddddd;
          position: relative;
          text-align: center;
        }

        .share-divider::before {
          content: 'OR';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 0 1rem;
          font-size: 0.875rem;
          color: #666;
        }

        .copy-link-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .copy-link-text {
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .copy-link-box {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid #2c2c2c;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .copy-link-box:hover {
          background-color: #f9fafb;
        }

        .copy-link-url {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.875rem;
          color: #333;
        }

        .copy-icon {
          margin-left: 0.5rem;
          color: #3462F4;
          font-size: 1.25rem;
        }

        .toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background-color: #10b981;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 10001;
          animation: slideUp 0.3s ease-out;
          display: none;
        }

        .toast.show {
          display: block;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</Style>

      {/* Share Modal */}
      <div class="share-modal-overlay" id="share-modal">
        <div class="share-modal-container" style="max-width: 500px;">
          <div class="share-modal-header">
            <h2 class="share-modal-title">Share Social</h2>
            <button class="share-modal-close-button" id="close-share-modal">✕</button>
          </div>

          <div class="share-modal-content">
            <div class="share-button-container">
              {/* Facebook */}
              <button class="share-button" data-platform="facebook">
                <div class="share-icon" style="background-color: #1877F2;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span class="share-label">Facebook</span>
              </button>

              {/* WhatsApp */}
              <button class="share-button" data-platform="whatsapp">
                <div class="share-icon" style="background-color: #25D366;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span class="share-label">WhatsApp</span>
              </button>

              {/* Telegram */}
              <button class="share-button" data-platform="telegram">
                <div class="share-icon" style="background-color: #0088cc;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <span class="share-label">Telegram</span>
              </button>

              {/* LinkedIn */}
              <button class="share-button" data-platform="linkedin">
                <div class="share-icon" style="background-color: #0077B5;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span class="share-label">LinkedIn</span>
              </button>

              {/* Line */}
              <button class="share-button" data-platform="line">
                <div class="share-icon" style="background-color: #00B900;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                </div>
                <span class="share-label">Line</span>
              </button>

              {/* Pinterest */}
              <button class="share-button" data-platform="pinterest">
                <div class="share-icon" style="background-color: #E60023;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                  </svg>
                </div>
                <span class="share-label">Pinterest</span>
              </button>

              {/* Facebook Messenger */}
              <button class="share-button" data-platform="messenger">
                <div class="share-icon" style="background-color: #0084FF;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
                  </svg>
                </div>
                <span class="share-label">Messenger</span>
              </button>
            </div>

            <hr class="share-divider" />

            <div class="copy-link-container">
              <div style="width: 100%;">
                <p class="copy-link-text">Click Below To Copy Link</p>
                <div class="copy-link-box" id="copy-link-btn">
                  <span class="copy-link-url" id="share-url"></span>
                  <span class="copy-icon">📋</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div class="toast" id="toast"></div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const shareModal = document.getElementById('share-modal');
            const shareButton = document.getElementById('share-button');
            const closeShareModalBtn = document.getElementById('close-share-modal');
            const shareUrlElement = document.getElementById('share-url');
            const copyLinkBtn = document.getElementById('copy-link-btn');
            const toast = document.getElementById('toast');

            // Share modal data - use current page URL
            const shareUrl = window.location.href;
            const shareTitle = '${title.replace(/'/g, "\\'")}';

            // Set the share URL
            if (shareUrlElement) {
              shareUrlElement.textContent = shareUrl;
            }

            // Show toast notification
            function showToast(message) {
              if (toast) {
                toast.textContent = message;
                toast.classList.add('show');
                setTimeout(() => {
                  toast.classList.remove('show');
                }, 3000);
              }
            }

            // Open share modal
            if (shareButton) {
              shareButton.addEventListener('click', () => {
                shareModal.classList.add('active');
                document.body.style.overflow = 'hidden';
              });
            }

            // Close share modal
            function closeShareModal() {
              shareModal.classList.remove('active');
              document.body.style.overflow = '';
            }

            if (closeShareModalBtn) {
              closeShareModalBtn.addEventListener('click', closeShareModal);
            }

            // Close on overlay click
            if (shareModal) {
              shareModal.addEventListener('click', (e) => {
                if (e.target === shareModal) {
                  closeShareModal();
                }
              });
            }

            // Copy link functionality
            if (copyLinkBtn) {
              copyLinkBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(shareUrl).then(() => {
                  showToast('Successfully Copy!');
                }).catch(err => {
                  console.error('Could not copy text:', err);
                  showToast('Failed to copy!');
                });
              });
            }

            // Share platform handlers
            const shareButtons = document.querySelectorAll('.share-button[data-platform]');

            shareButtons.forEach(button => {
              button.addEventListener('click', () => {
                const platform = button.dataset.platform;
                let platformShareUrl = '';

                switch (platform) {
                  case 'facebook':
                    platformShareUrl = \`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(shareUrl)}\`;
                    break;
                  case 'whatsapp':
                    platformShareUrl = \`https://wa.me/?text=\${encodeURIComponent(shareTitle + ' - ' + shareUrl)}\`;
                    break;
                  case 'telegram':
                    platformShareUrl = \`https://t.me/share/url?url=\${encodeURIComponent(shareUrl)}&text=\${encodeURIComponent(shareTitle)}\`;
                    break;
                  case 'linkedin':
                    platformShareUrl = \`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(shareUrl)}\`;
                    break;
                  case 'line':
                    platformShareUrl = \`https://social-plugins.line.me/lineit/share?url=\${encodeURIComponent(shareUrl)}\`;
                    break;
                  case 'pinterest':
                    platformShareUrl = \`https://pinterest.com/pin/create/button/?url=\${encodeURIComponent(shareUrl)}&description=\${encodeURIComponent(shareTitle)}\`;
                    break;
                  case 'messenger':
                    platformShareUrl = \`fb-messenger://share/?link=\${encodeURIComponent(shareUrl)}\`;
                    break;
                  default:
                    return;
                }

                // Close modal before opening share window
                closeShareModal();

                // Open share window
                window.open(platformShareUrl, '_blank', 'width=600,height=400');
              });
            });
          })();
        `
      }} />
    </>
  );
};
