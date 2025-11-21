import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import countryCodes from '../utils/countryCodes';

interface ContactModalProps {
  contactNumber: string;
  accountName: string;
  accountSlug: string;
  accountId: string;
  domain: string;
  apiBaseUrl: string;
}

/**
 * ContactModal Component
 * Modal for collecting user contact information before WhatsApp/Call
 */
export const ContactModal: FC<ContactModalProps> = ({
  contactNumber,
  accountName,
  accountSlug,
  accountId,
  domain,
  apiBaseUrl
}) => {
  return (
    <>
      <Style>{css`
        /* Contact Modal Overlay Styles */
        .contact-modal-overlay {
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

        .contact-modal-overlay.active {
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

        .contact-modal-container {
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

        .contact-modal-header-base {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .contact-modal-title-base {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        .contact-modal-close-button {
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

        .contact-modal-close-button:hover {
          background: #f3f4f6;
          color: #000;
        }

        /* Contact Modal Specific Styles */
        .contact-modal-content {
          max-height: 80vh;
          overflow-y: auto;
        }

        .contact-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #C3C3C3;
        }

        .contact-modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #3462F4;
          margin: 0;
        }

        .contact-modal-body {
          padding: 1.5rem;
        }

        .contact-form-group {
          margin-bottom: 1.5rem;
        }

        .contact-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          color: #2c2c2c;
          font-weight: 500;
        }

        .contact-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .contact-input:focus {
          outline: none;
          border-color: #3462F4;
        }

        .contact-input::placeholder {
          color: #999;
        }

        .phone-input-wrapper {
          display: flex;
          gap: 0.5rem;
        }

        .country-code-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .country-code-button {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem 0.5rem;
          background: transparent;
          border: 1px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          color: #2c2c2c;
          transition: background-color 0.2s;
        }

        .country-code-button:hover {
          background-color: #f5f5f5;
        }

        .country-code-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-height: 250px;
          width: 280px;
          overflow: hidden;
          margin-top: 0.25rem;
          display: none;
        }

        .country-code-dropdown.open {
          display: block;
        }

        .country-search-container {
          padding: 0.5rem;
          border-bottom: 1px solid #eee;
          position: relative;
        }

        .country-search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
        }

        .country-search-input {
          width: 100%;
          padding: 0.5rem 0.75rem 0.5rem 2rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .country-search-input:focus {
          outline: none;
          border-color: #3462F4;
        }

        .countries-list {
          max-height: 200px;
          overflow-y: auto;
        }

        .country-item {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: none;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          text-align: left;
          transition: background-color 0.2s;
        }

        .country-item:hover,
        .country-item.highlighted {
          background-color: #f0f8ff;
        }

        .country-flag {
          font-size: 1rem;
        }

        .country-code {
          font-weight: 600;
          min-width: 45px;
        }

        .country-name {
          color: #666;
        }

        .no-results {
          padding: 1rem;
          text-align: center;
          color: #666;
          font-size: 0.875rem;
        }

        .phone-input {
          flex: 1;
        }

        .contact-button {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: #3462F4;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background-color 0.2s;
          margin-top: 1rem;
        }

        .contact-button:hover:not(:disabled) {
          background-color: #5558eb;
        }

        .contact-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .contact-modal-footer {
          padding: 1rem 1.5rem;
          border-top: 2px solid #3462F4;
          text-align: center;
        }

        .contact-footer-text {
          font-size: 0.875rem;
          color: #666;
          margin: 0;
        }

        .contact-footer-link {
          color: #3462F4;
          text-decoration: none;
        }

        .contact-footer-link:hover {
          text-decoration: underline;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: none;
        }

        .error-message.show {
          display: block;
        }
      `}</Style>

      {/* Contact Modal */}
      <div class="contact-modal-overlay" id="contact-modal">
        <div class="contact-modal-container" style="max-width: 410px;">
          <div class="contact-modal-header">
            <h2 class="contact-modal-title">Contact Agent</h2>
            <button class="contact-modal-close-button" id="close-contact-modal" aria-label="Close Contact Modal">✕</button>
          </div>

          <form id="contact-form">
            <div class="contact-modal-body">
              <div class="contact-form-group">
                <input
                  type="text"
                  class="contact-input"
                  id="contact-name"
                  placeholder="Name"
                  required
                />
                <div class="error-message" id="name-error">Please fill up your name.</div>
              </div>

              <div class="contact-form-group">
                <label class="contact-label">Phone Number</label>
                <div class="phone-input-wrapper">
                  <div class="country-code-wrapper">
                    <button type="button" class="country-code-button" id="country-code-button" aria-label="Select Country Code">
                      <span id="selected-flag">🇲🇾</span>
                      <span id="selected-code">+60</span>
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor; transition: transform 0.2s;" id="dropdown-arrow">
                        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
                      </svg>
                    </button>
                    <div class="country-code-dropdown" id="country-code-dropdown">
                      <div class="country-search-container">
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" class="country-search-icon" style="width: 16px; height: 16px;">
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path>
                        </svg>
                        <input
                          type="text"
                          class="country-search-input"
                          id="country-search"
                          placeholder="Search country or code..."
                        />
                      </div>
                      <div class="countries-list" id="countries-list">
                        {/* Countries will be populated by JavaScript */}
                      </div>
                    </div>
                  </div>
                  <input
                    type="tel"
                    class="contact-input phone-input"
                    id="contact-phone"
                    placeholder="Enter Phone Number"
                    required
                  />
                </div>
                <div class="error-message" id="phone-error">Please enter a valid phone number.</div>
              </div>

              <div class="contact-form-group">
                <input
                  type="email"
                  class="contact-input"
                  id="contact-email"
                  placeholder="Email"
                  required
                />
                <div class="error-message" id="email-error">Please enter a valid email.</div>
              </div>

              <button type="submit" class="contact-button" id="submit-whatsapp" aria-label="Submit WhatsApp Agent" disabled>
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" style="width: 1.5em; height: 1.5em; fill: white;">
                  <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"></path>
                </svg>
                <span id="button-text">WhatsApp Agent</span>
              </button>
            </div>

            <div class="contact-modal-footer">
              <p class="contact-footer-text">
                By clicking, I agree to Property Genie's{' '}
                <a href="https://propertygenie.com.my/term-of-use" class="contact-footer-link" target="_blank" rel="noopener">Terms of Service</a>
                {' '}and{' '}
                <a href="https://propertygenie.com.my/privacy-policy" class="contact-footer-link" target="_blank" rel="noopener">Privacy Policy</a>
                {' '}including the collection, use and disclosure of my personal information.
              </p>
            </div>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const contactModal = document.getElementById('contact-modal');
            const closeContactModalBtn = document.getElementById('close-contact-modal');
            const contactForm = document.getElementById('contact-form');
            const nameInput = document.getElementById('contact-name');
            const phoneInput = document.getElementById('contact-phone');
            const emailInput = document.getElementById('contact-email');
            const submitButton = document.getElementById('submit-whatsapp');
            const buttonText = document.getElementById('button-text');

            // Country code elements
            const countryCodeButton = document.getElementById('country-code-button');
            const countryCodeDropdown = document.getElementById('country-code-dropdown');
            const countrySearch = document.getElementById('country-search');
            const countriesList = document.getElementById('countries-list');
            const selectedFlag = document.getElementById('selected-flag');
            const selectedCode = document.getElementById('selected-code');
            const dropdownArrow = document.getElementById('dropdown-arrow');

            // Error message elements
            const nameError = document.getElementById('name-error');
            const phoneError = document.getElementById('phone-error');
            const emailError = document.getElementById('email-error');

            // Modal state
            let contactType = 'whatsapp'; // 'whatsapp' or 'call'
            let selectedCountry = { code: '+60', flag: '🇲🇾', country: 'Malaysia' };
            let highlightedIndex = 0;
            let filteredCountries = [];

            // Country codes data (imported from server)
            const countryCodes = ${JSON.stringify(countryCodes)};

            // Filter and sort countries based on search term
            function getFilteredAndSortedCountries(searchTerm) {
              if (!searchTerm.trim()) {
                return countryCodes;
              }

              const lowerSearchTerm = searchTerm.toLowerCase().trim();
              const searchTermWithoutPlus = searchTerm.replace('+', '').trim();

              const matched = countryCodes.filter(country => {
                const countryLower = country.country.toLowerCase();
                const code = country.code.toLowerCase();
                const codeWithoutPlus = country.code.replace('+', '');

                return countryLower.includes(lowerSearchTerm) ||
                       code.includes(lowerSearchTerm) ||
                       codeWithoutPlus.includes(searchTermWithoutPlus);
              });

              return matched.sort((a, b) => {
                const aCountryLower = a.country.toLowerCase();
                const bCountryLower = b.country.toLowerCase();
                const aCode = a.code.toLowerCase();
                const bCode = b.code.toLowerCase();
                const aCodeWithoutPlus = a.code.replace('+', '');
                const bCodeWithoutPlus = b.code.replace('+', '');

                if (aCountryLower === lowerSearchTerm) return -1;
                if (bCountryLower === lowerSearchTerm) return 1;
                if (aCode === lowerSearchTerm || aCodeWithoutPlus === searchTermWithoutPlus) return -1;
                if (bCode === lowerSearchTerm || bCodeWithoutPlus === searchTermWithoutPlus) return 1;
                if (aCountryLower.startsWith(lowerSearchTerm) && !bCountryLower.startsWith(lowerSearchTerm)) return -1;
                if (bCountryLower.startsWith(lowerSearchTerm) && !aCountryLower.startsWith(lowerSearchTerm)) return 1;

                return aCountryLower.localeCompare(bCountryLower);
              });
            }

            // Render countries list
            function renderCountriesList(searchTerm = '') {
              filteredCountries = getFilteredAndSortedCountries(searchTerm);
              highlightedIndex = 0;

              if (filteredCountries.length === 0) {
                countriesList.innerHTML = '<div class="no-results">No countries found</div>';
                return;
              }

              countriesList.innerHTML = filteredCountries.map((country, index) =>
                \`<button type="button" aria-label="Select Country" class="country-item\${index === highlightedIndex ? ' highlighted' : ''}" data-index="\${index}">
                  <span class="country-flag">\${country.flag}</span>
                  <span class="country-code">\${country.code}</span>
                  <span class="country-name">\${country.country}</span>
                </button>\`
              ).join('');

              // Add click handlers
              countriesList.querySelectorAll('.country-item').forEach((item, index) => {
                item.addEventListener('click', () => selectCountry(filteredCountries[index]));
                item.addEventListener('mouseenter', () => {
                  highlightedIndex = index;
                  updateHighlight();
                });
              });
            }

            // Update highlighted item
            function updateHighlight() {
              countriesList.querySelectorAll('.country-item').forEach((item, index) => {
                if (index === highlightedIndex) {
                  item.classList.add('highlighted');
                  item.scrollIntoView({ block: 'nearest' });
                } else {
                  item.classList.remove('highlighted');
                }
              });
            }

            // Select country
            function selectCountry(country) {
              selectedCountry = country;
              selectedFlag.textContent = country.flag;
              selectedCode.textContent = country.code;
              countryCodeDropdown.classList.remove('open');
              countrySearch.value = '';
              dropdownArrow.style.transform = 'rotate(0deg)';
              validateForm();
            }

            // Validate phone number
            function validatePhoneNumber(phoneNumber, prefixValue) {
              let regex;

              switch (prefixValue) {
                case '+65': // Singapore
                  regex = /^[89]\\d{7}$/;
                  break;
                case '+60': // Malaysia
                  regex = /^1\\d{8,9}$/;
                  break;
                default:
                  regex = /^\\d{7,16}$/;
                  break;
              }

              return regex ? regex.test(phoneNumber) : phoneNumber.length >= 7;
            }

            // Validate email
            function validateEmail(email) {
              const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
              return emailRegex.test(email);
            }

            // Validate form and enable/disable submit button
            function validateForm() {
              const isNameValid = nameInput.value.trim() !== '';
              const isPhoneValid = validatePhoneNumber(phoneInput.value, selectedCountry.code);
              const isEmailValid = validateEmail(emailInput.value);

              submitButton.disabled = !(isNameValid && isPhoneValid && isEmailValid);
            }

            // Show error message
            function showError(errorElement, message) {
              errorElement.textContent = message;
              errorElement.classList.add('show');
            }

            // Hide error message
            function hideError(errorElement) {
              errorElement.classList.remove('show');
            }

            // Open modal
            window.openContactModal = function(type) {
              contactType = type;

              if (type === 'call') {
                buttonText.innerHTML = 'Call Agent';
                submitButton.innerHTML = \`
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" style="width: 1.5em; height: 1.5em; fill: white;">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99"></path>
                  </svg>
                  <span id="button-text">Call Agent</span>
                \`;
              } else {
                buttonText.innerHTML = 'WhatsApp Agent';
                submitButton.innerHTML = \`
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" style="width: 1.5em; height: 1.5em; fill: white;">
                    <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"></path>
                  </svg>
                  <span id="button-text">WhatsApp Agent</span>
                \`;
              }

              contactModal.classList.add('active');
              document.body.style.overflow = 'hidden';
            };

            // Close modal
            function closeContactModal() {
              contactModal.classList.remove('active');
              document.body.style.overflow = '';
              contactForm.reset();
              submitButton.disabled = true;
              hideError(nameError);
              hideError(phoneError);
              hideError(emailError);
              countryCodeDropdown.classList.remove('open');
            }

            if (closeContactModalBtn) {
              closeContactModalBtn.addEventListener('click', closeContactModal);
            }

            // Close on overlay click
            if (contactModal) {
              contactModal.addEventListener('click', (e) => {
                if (e.target === contactModal) {
                  closeContactModal();
                }
              });
            }

            // Country code dropdown
            if (countryCodeButton) {
              countryCodeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = countryCodeDropdown.classList.contains('open');

                if (isOpen) {
                  countryCodeDropdown.classList.remove('open');
                  dropdownArrow.style.transform = 'rotate(0deg)';
                } else {
                  countryCodeDropdown.classList.add('open');
                  dropdownArrow.style.transform = 'rotate(180deg)';
                  renderCountriesList();
                  setTimeout(() => countrySearch.focus(), 100);
                }
              });
            }

            // Country search
            if (countrySearch) {
              countrySearch.addEventListener('input', (e) => {
                renderCountriesList(e.target.value);
              });

              countrySearch.addEventListener('keydown', (e) => {
                if (!countryCodeDropdown.classList.contains('open')) return;

                switch (e.key) {
                  case 'ArrowDown':
                    e.preventDefault();
                    highlightedIndex = (highlightedIndex + 1) % filteredCountries.length;
                    updateHighlight();
                    break;
                  case 'ArrowUp':
                    e.preventDefault();
                    highlightedIndex = highlightedIndex > 0 ? highlightedIndex - 1 : filteredCountries.length - 1;
                    updateHighlight();
                    break;
                  case 'Enter':
                    e.preventDefault();
                    if (filteredCountries[highlightedIndex]) {
                      selectCountry(filteredCountries[highlightedIndex]);
                    }
                    break;
                  case 'Escape':
                    countryCodeDropdown.classList.remove('open');
                    countrySearch.value = '';
                    dropdownArrow.style.transform = 'rotate(0deg)';
                    break;
                }
              });
            }

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
              if (!countryCodeButton.contains(e.target) && !countryCodeDropdown.contains(e.target)) {
                countryCodeDropdown.classList.remove('open');
                countrySearch.value = '';
                dropdownArrow.style.transform = 'rotate(0deg)';
              }
            });

            // Form validation
            nameInput.addEventListener('input', () => {
              hideError(nameError);
              validateForm();
            });

            phoneInput.addEventListener('input', () => {
              hideError(phoneError);
              validateForm();
            });

            emailInput.addEventListener('input', () => {
              hideError(emailError);
              validateForm();
            });

            // Form submission
            contactForm.addEventListener('submit', async (e) => {
              e.preventDefault();

              const name = nameInput.value.trim();
              const phone = phoneInput.value.trim();
              const email = emailInput.value.trim();

              // Validate fields
              let hasError = false;

              if (!name) {
                showError(nameError, 'Please fill up your name.');
                hasError = true;
              }

              if (!phone) {
                showError(phoneError, 'Please fill up your contact number.');
                hasError = true;
              } else if (!validatePhoneNumber(phone, selectedCountry.code)) {
                showError(phoneError, 'Please enter a valid phone number.');
                hasError = true;
              }

              if (!email) {
                showError(emailError, 'Please fill up your email.');
                hasError = true;
              } else if (!validateEmail(email)) {
                showError(emailError, 'Please enter a valid email.');
                hasError = true;
              }

              if (hasError) return;

              // Post logging interest
              try {
                const apiBaseUrl = '${apiBaseUrl}';

                const source = '${domain}';

                const response = await fetch(\`\${apiBaseUrl}/v1/logging/interest\`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    name: name,
                    prefix: selectedCountry.code,
                    number: phone,
                    email: email,
                    accountId: '${accountId}',
                    type: 'agent-profile',
                    source: source
                  })
                });

                if (!response.ok) {
                  const errorText = await response.text();
                  console.error('Logging API error response:', errorText);
                  throw new Error(\`Failed to log interest: \${response.status} \${errorText}\`);
                }

                const responseData = await response.json();
              } catch (error) {
                console.error('Error logging interest:', error);
                console.error('Error details:', {
                  message: error.message,
                  stack: error.stack,
                  name: error.name
                });
                // Continue with redirect even if logging fails
              }

              // Redirect based on contact type
              const contactNumber = '${contactNumber}';
              const agentName = '${accountName.replace(/'/g, "\\'")}';

              // if (contactType === 'call') {
              //   window.location.href = \`tel:\${contactNumber}\`;
              // } else {
              //   const text = \`Hi \${agentName}, I am looking for property. I'm eager to explore the available options and would appreciate it if you could share details about any properties you have. Thank you!\`;
              //   window.location.href = \`https://wa.me/\${contactNumber}/?text=\${encodeURIComponent(text)}\`;
              // }

              closeContactModal();
            });

            // Initialize countries list
            renderCountriesList();
          })();
        `
      }} />
    </>
  );
};
