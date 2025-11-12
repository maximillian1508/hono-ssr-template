import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';

interface ContactModalProps {
  contactNumber: string;
  accountName: string;
  accountSlug: string;
  accountId: string;
}

/**
 * ContactModal Component
 * Modal for collecting user contact information before WhatsApp/Call
 */
export const ContactModal: FC<ContactModalProps> = ({
  contactNumber,
  accountName,
  accountSlug,
  accountId
}) => {
  return (
    <>
      <Style>{css`
        /* Contact Modal Overlay Styles */
        .modal-overlay {
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

        .modal-overlay.active {
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

        .modal-container {
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

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        .close-button {
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

        .close-button:hover {
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
      <div class="modal-overlay" id="contact-modal">
        <div class="modal-container" style="max-width: 410px;">
          <div class="contact-modal-header">
            <h2 class="contact-modal-title">Contact Agent</h2>
            <button class="close-button" id="close-contact-modal">✕</button>
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
                    <button type="button" class="country-code-button" id="country-code-button">
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

              <button type="submit" class="contact-button" id="submit-whatsapp" disabled>
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

            // Country codes data
            const countryCodes = [
              { country: "Malaysia", code: "+60", flag: "🇲🇾" },
              { country: "Singapore", code: "+65", flag: "🇸🇬" },
              { country: "Indonesia", code: "+62", flag: "🇮🇩" },
              { country: "Afghanistan", code: "+93", flag: "🇦🇫" },
              { country: "Aland Islands", code: "+358", flag: "🇦🇽" },
              { country: "Albania", code: "+355", flag: "🇦🇱" },
              { country: "Algeria", code: "+213", flag: "🇩🇿" },
              { country: "AmericanSamoa", code: "+1684", flag: "🇦🇸" },
              { country: "Andorra", code: "+376", flag: "🇦🇩" },
              { country: "Angola", code: "+244", flag: "🇦🇴" },
              { country: "Anguilla", code: "+1264", flag: "🇦🇮" },
              { country: "Antarctica", code: "+672", flag: "🇦🇶" },
              { country: "Antigua and Barbuda", code: "+1268", flag: "🇦🇬" },
              { country: "Argentina", code: "+54", flag: "🇦🇷" },
              { country: "Armenia", code: "+374", flag: "🇦🇲" },
              { country: "Aruba", code: "+297", flag: "🇦🇼" },
              { country: "Australia", code: "+61", flag: "🇦🇺" },
              { country: "Austria", code: "+43", flag: "🇦🇹" },
              { country: "Azerbaijan", code: "+994", flag: "🇦🇿" },
              { country: "Bahamas", code: "+1242", flag: "🇧🇸" },
              { country: "Bahrain", code: "+973", flag: "🇧🇭" },
              { country: "Bangladesh", code: "+880", flag: "🇧🇩" },
              { country: "Barbados", code: "+1246", flag: "🇧🇧" },
              { country: "Belarus", code: "+375", flag: "🇧🇾" },
              { country: "Belgium", code: "+32", flag: "🇧🇪" },
              { country: "Belize", code: "+501", flag: "🇧🇿" },
              { country: "Benin", code: "+229", flag: "🇧🇯" },
              { country: "Bermuda", code: "+1441", flag: "🇧🇲" },
              { country: "Bhutan", code: "+975", flag: "🇧🇹" },
              { country: "Bolivia, Plurinational State of", code: "+591", flag: "🇧🇴" },
              { country: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦" },
              { country: "Botswana", code: "+267", flag: "🇧🇼" },
              { country: "Brazil", code: "+55", flag: "🇧🇷" },
              { country: "British Indian Ocean Territory", code: "+246", flag: "🇮🇴" },
              { country: "Brunei Darussalam", code: "+673", flag: "🇧🇳" },
              { country: "Bulgaria", code: "+359", flag: "🇧🇬" },
              { country: "Burkina Faso", code: "+226", flag: "🇧🇫" },
              { country: "Burundi", code: "+257", flag: "🇧🇮" },
              { country: "Cambodia", code: "+855", flag: "🇰🇭" },
              { country: "Cameroon", code: "+237", flag: "🇨🇲" },
              { country: "Canada", code: "+1", flag: "🇨🇦" },
              { country: "Cape Verde", code: "+238", flag: "🇨🇻" },
              { country: "Cayman Islands", code: "+345", flag: "🇰🇾" },
              { country: "Central African Republic", code: "+236", flag: "🇨🇫" },
              { country: "Chad", code: "+235", flag: "🇹🇩" },
              { country: "Chile", code: "+56", flag: "🇨🇱" },
              { country: "China", code: "+86", flag: "🇨🇳" },
              { country: "Christmas Island", code: "+61", flag: "🇨🇽" },
              { country: "Cocos (Keeling) Islands", code: "+61", flag: "🇨🇨" },
              { country: "Colombia", code: "+57", flag: "🇨🇴" },
              { country: "Comoros", code: "+269", flag: "🇰🇲" },
              { country: "Congo", code: "+242", flag: "🇨🇬" },
              { country: "Congo, The Democratic Republic of the Congo", code: "+243", flag: "🇨🇩" },
              { country: "Cook Islands", code: "+682", flag: "🇨🇰" },
              { country: "Costa Rica", code: "+506", flag: "🇨🇷" },
              { country: "Cote d'Ivoire", code: "+225", flag: "🇨🇮" },
              { country: "Croatia", code: "+385", flag: "🇭🇷" },
              { country: "Cuba", code: "+53", flag: "🇨🇺" },
              { country: "Cyprus", code: "+357", flag: "🇨🇾" },
              { country: "Czech Republic", code: "+420", flag: "🇨🇿" },
              { country: "Denmark", code: "+45", flag: "🇩🇰" },
              { country: "Djibouti", code: "+253", flag: "🇩🇯" },
              { country: "Dominica", code: "+1767", flag: "🇩🇲" },
              { country: "Dominican Republic", code: "+1849", flag: "🇩🇴" },
              { country: "Ecuador", code: "+593", flag: "🇪🇨" },
              { country: "Egypt", code: "+20", flag: "🇪🇬" },
              { country: "El Salvador", code: "+503", flag: "🇸🇻" },
              { country: "Equatorial Guinea", code: "+240", flag: "🇬🇶" },
              { country: "Eritrea", code: "+291", flag: "🇪🇷" },
              { country: "Estonia", code: "+372", flag: "🇪🇪" },
              { country: "Ethiopia", code: "+251", flag: "🇪🇹" },
              { country: "Falkland Islands (Malvinas)", code: "+500", flag: "🇫🇰" },
              { country: "Faroe Islands", code: "+298", flag: "🇫🇴" },
              { country: "Fiji", code: "+679", flag: "🇫🇯" },
              { country: "Finland", code: "+358", flag: "🇫🇮" },
              { country: "France", code: "+33", flag: "🇫🇷" },
              { country: "French Guiana", code: "+594", flag: "🇬🇫" },
              { country: "French Polynesia", code: "+689", flag: "🇵🇫" },
              { country: "Gabon", code: "+241", flag: "🇬🇦" },
              { country: "Gambia", code: "+220", flag: "🇬🇲" },
              { country: "Georgia", code: "+995", flag: "🇬🇪" },
              { country: "Germany", code: "+49", flag: "🇩🇪" },
              { country: "Ghana", code: "+233", flag: "🇬🇭" },
              { country: "Gibraltar", code: "+350", flag: "🇬🇮" },
              { country: "Greece", code: "+30", flag: "🇬🇷" },
              { country: "Greenland", code: "+299", flag: "🇬🇱" },
              { country: "Grenada", code: "+1473", flag: "🇬🇩" },
              { country: "Guadeloupe", code: "+590", flag: "🇬🇵" },
              { country: "Guam", code: "+1671", flag: "🇬🇺" },
              { country: "Guatemala", code: "+502", flag: "🇬🇹" },
              { country: "Guernsey", code: "+44", flag: "🇬🇬" },
              { country: "Guinea", code: "+224", flag: "🇬🇳" },
              { country: "Guinea-Bissau", code: "+245", flag: "🇬🇼" },
              { country: "Guyana", code: "+595", flag: "🇬🇾" },
              { country: "Haiti", code: "+509", flag: "🇭🇹" },
              { country: "Holy See (Vatican City State)", code: "+379", flag: "🇻🇦" },
              { country: "Honduras", code: "+504", flag: "🇭🇳" },
              { country: "Hong Kong", code: "+852", flag: "🇭🇰" },
              { country: "Hungary", code: "+36", flag: "🇭🇺" },
              { country: "Iceland", code: "+354", flag: "🇮🇸" },
              { country: "India", code: "+91", flag: "🇮🇳" },
              { country: "Iran, Islamic Republic of Persian Gulf", code: "+98", flag: "🇮🇷" },
              { country: "Iraq", code: "+964", flag: "🇮🇷" },
              { country: "Ireland", code: "+353", flag: "🇮🇪" },
              { country: "Isle of Man", code: "+44", flag: "🇮🇲" },
              { country: "Israel", code: "+972", flag: "🇮🇱" },
              { country: "Italy", code: "+39", flag: "🇮🇹" },
              { country: "Jamaica", code: "+1876", flag: "🇯🇲" },
              { country: "Japan", code: "+81", flag: "🇯🇵" },
              { country: "Jersey", code: "+44", flag: "🇯🇪" },
              { country: "Jordan", code: "+962", flag: "🇯🇴" },
              { country: "Kazakhstan", code: "+77", flag: "🇰🇿" },
              { country: "Kenya", code: "+254", flag: "🇰🇪" },
              { country: "Kiribati", code: "+686", flag: "🇰🇮" },
              { country: "Korea, Democratic People's Republic of Korea", code: "+850", flag: "🇰🇵" },
              { country: "Korea, Republic of South Korea", code: "+82", flag: "🇰🇷" },
              { country: "Kuwait", code: "+965", flag: "🇰🇼" },
              { country: "Kyrgyzstan", code: "+996", flag: "🇰🇬" },
              { country: "Laos", code: "+856", flag: "🇱🇦" },
              { country: "Latvia", code: "+371", flag: "🇱🇻" },
              { country: "Lebanon", code: "+961", flag: "🇱🇧" },
              { country: "Lesotho", code: "+266", flag: "🇱🇸" },
              { country: "Liberia", code: "+231", flag: "🇱🇷" },
              { country: "Libyan Arab Jamahiriya", code: "+218", flag: "🇱🇾" },
              { country: "Liechtenstein", code: "+423", flag: "🇱🇮" },
              { country: "Lithuania", code: "+370", flag: "🇱🇹" },
              { country: "Luxembourg", code: "+352", flag: "🇱🇺" },
              { country: "Macao", code: "+853", flag: "🇲🇴" },
              { country: "Macedonia", code: "+389", flag: "🇲🇰" },
              { country: "Madagascar", code: "+261", flag: "🇲🇬" },
              { country: "Malawi", code: "+265", flag: "🇲🇼" },
              { country: "Maldives", code: "+960", flag: "🇲🇻" },
              { country: "Mali", code: "+223", flag: "🇲🇱" },
              { country: "Malta", code: "+356", flag: "🇲🇹" },
              { country: "Marshall Islands", code: "+692", flag: "🇲🇭" },
              { country: "Martinique", code: "+596", flag: "🇲🇶" },
              { country: "Mauritania", code: "+222", flag: "🇲🇷" },
              { country: "Mauritius", code: "+230", flag: "🇲🇺" },
              { country: "Mayotte", code: "+262", flag: "🇾🇹" },
              { country: "Mexico", code: "+52", flag: "🇲🇽" },
              { country: "Micronesia, Federated States of Micronesia", code: "+691", flag: "🇫🇲" },
              { country: "Moldova", code: "+373", flag: "🇲🇩" },
              { country: "Monaco", code: "+377", flag: "🇲🇨" },
              { country: "Mongolia", code: "+976", flag: "🇲🇳" },
              { country: "Montenegro", code: "+382", flag: "🇲🇪" },
              { country: "Montserrat", code: "+1664", flag: "🇲🇸" },
              { country: "Morocco", code: "+212", flag: "🇲🇦" },
              { country: "Mozambique", code: "+258", flag: "🇲🇿" },
              { country: "Myanmar", code: "+95", flag: "🇲🇲" },
              { country: "Namibia", flag: "🇳🇦", code: "+264" },
              { country: "Nauru", code: "+674", flag: "🇳🇷" },
              { country: "Nepal", code: "+977", flag: "🇳🇵" },
              { country: "Netherlands", code: "+31", flag: "🇳🇱" },
              { country: "Netherlands Antilles", code: "+599", flag: "🇧🇶" },
              { country: "New Caledonia", code: "+687", flag: "🇳🇨" },
              { country: "New Zealand", code: "+64", flag: "🇳🇿" },
              { country: "Nicaragua", code: "+505", flag: "🇳🇮" },
              { country: "Niger", code: "+227", flag: "🇳🇪" },
              { country: "Nigeria", code: "+234", flag: "🇳🇬" },
              { country: "Niue", code: "+683", flag: "🇳🇺" },
              { country: "Norfolk Island", code: "+672", flag: "🇳🇫" },
              { country: "Northern Mariana Islands", code: "+1670", flag: "🇲🇵" },
              { country: "Norway", code: "+47", flag: "🇳🇴" },
              { country: "Oman", code: "+968", flag: "🇴🇲" },
              { country: "Pakistan", code: "+92", flag: "🇵🇰" },
              { country: "Palau", code: "+680", flag: "🇵🇼" },
              { country: "Palestinian Territory, Occupied", code: "+970", flag: "🇵🇸" },
              { country: "Panama", code: "+507", flag: "🇵🇦" },
              { country: "Papua New Guinea", code: "+675", flag: "🇵🇬" },
              { country: "Paraguay", code: "+595", flag: "🇵🇾" },
              { country: "Peru", code: "+51", flag: "🇵🇪" },
              { country: "Philippines", code: "+63", flag: "🇵🇭" },
              { country: "Pitcairn", code: "+872", flag: "🇵🇳" },
              { country: "Poland", code: "+48", flag: "🇵🇱" },
              { country: "Portugal", code: "+351", flag: "🇵🇹" },
              { country: "Puerto Rico", code: "+1939", flag: "🇵🇷" },
              { country: "Qatar", code: "+974", flag: "🇶🇦" },
              { country: "Romania", code: "+40", flag: "🇷🇴" },
              { country: "Russia", code: "+7", flag: "🇷🇺" },
              { country: "Rwanda", code: "+250", flag: "🇷🇼" },
              { country: "Reunion", code: "+262", flag: "🇷🇪" },
              { country: "Saint Barthelemy", code: "+590", flag: "🇧🇱" },
              { country: "Saint Helena, Ascension and Tristan Da Cunha", code: "+290", flag: "🇸🇭" },
              { country: "Saint Kitts and Nevis", code: "+1869", flag: "🇰🇳" },
              { country: "Saint Lucia", code: "+1758", flag: "🇱🇨" },
              { country: "Saint Martin", code: "+590", flag: "🇲🇫" },
              { country: "Saint Pierre and Miquelon", code: "+508", flag: "🇵🇲" },
              { country: "Saint Vincent and the Grenadines", code: "+1784", flag: "🇻🇨" },
              { country: "Samoa", code: "+685", flag: "🇼🇸" },
              { country: "San Marino", code: "+378", flag: "🇸🇲" },
              { country: "Sao Tome and Principe", code: "+239", flag: "🇸🇹" },
              { country: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
              { country: "Senegal", code: "+221", flag: "🇸🇳" },
              { country: "Serbia", code: "+381", flag: "🇷🇸" },
              { country: "Seychelles", code: "+248", flag: "🇸🇨" },
              { country: "Sierra Leone", code: "+232", flag: "🇸🇱" },
              { country: "Slovakia", code: "+421", flag: "🇸🇰" },
              { country: "Slovenia", code: "+386", flag: "🇸🇮" },
              { country: "Solomon Islands", code: "+677", flag: "🇸🇧" },
              { country: "Somalia", code: "+252", flag: "🇸🇴" },
              { country: "South Africa", code: "+27", flag: "🇿🇦" },
              { country: "South Sudan", code: "+211", flag: "🇸🇸" },
              { country: "South Georgia and the South Sandwich Islands", code: "+500", flag: "🇬🇸" },
              { country: "Spain", code: "+34", flag: "🇪🇸" },
              { country: "Sri Lanka", code: "+94", flag: "🇱🇰" },
              { country: "Sudan", code: "+249", flag: "🇸🇩" },
              { country: "Suriname", code: "+597", flag: "🇸🇷" },
              { country: "Svalbard and Jan Mayen", code: "+47", flag: "🇸🇯" },
              { country: "Swaziland", code: "+268", flag: "🇸🇿" },
              { country: "Sweden", code: "+46", flag: "🇸🇪" },
              { country: "Switzerland", code: "+41", flag: "🇨🇭" },
              { country: "Syrian Arab Republic", code: "+963", flag: "🇸🇾" },
              { country: "Taiwan", code: "+886", flag: "🇹🇼" },
              { country: "Tajikistan", code: "+992", flag: "🇹🇯" },
              { country: "Tanzania, United Republic of Tanzania", code: "+255", flag: "🇹🇿" },
              { country: "Thailand", code: "+66", flag: "🇹🇭" },
              { country: "Timor-Leste", code: "+670", flag: "🇹🇱" },
              { country: "Togo", code: "+228", flag: "🇹🇬" },
              { country: "Tokelau", code: "+690", flag: "🇹🇰" },
              { country: "Tonga", code: "+676", flag: "🇹🇴" },
              { country: "Trinidad and Tobago", code: "+1868", flag: "🇹🇹" },
              { country: "Tunisia", code: "+216", flag: "🇹🇳" },
              { country: "Turkey", code: "+90", flag: "🇹🇷" },
              { country: "Turkmenistan", code: "+993", flag: "🇹🇲" },
              { country: "Turks and Caicos Islands", code: "+1649", flag: "🇹🇨" },
              { country: "Tuvalu", code: "+688", flag: "🇹🇻" },
              { country: "Uganda", code: "+256", flag: "🇺🇬" },
              { country: "Ukraine", code: "+380", flag: "🇺🇦" },
              { country: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
              { country: "United Kingdom", code: "+44", flag: "🇬🇧" },
              { country: "United States", code: "+1", flag: "🇺🇸" },
              { country: "Uruguay", code: "+598", flag: "🇺🇾" },
              { country: "Uzbekistan", code: "+998", flag: "🇺🇿" },
              { country: "Vanuatu", code: "+678", flag: "🇻🇺" },
              { country: "Venezuela, Bolivarian Republic of Venezuela", code: "+58", flag: "🇻🇪" },
              { country: "Vietnam", code: "+84", flag: "🇻🇳" },
              { country: "Virgin Islands, British", code: "+1284", flag: "🇻🇬" },
              { country: "Virgin Islands, U.S.", code: "+1340", flag: "🇻🇮" },
              { country: "Wallis and Futuna", code: "+681", flag: "🇼🇫" },
              { country: "Yemen", code: "+967", flag: "🇾🇪" },
              { country: "Zambia", code: "+260", flag: "🇿🇲" },
              { country: "Zimbabwe", code: "+263", flag: "🇿🇼" }
            ];

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
                \`<button type="button" class="country-item\${index === highlightedIndex ? ' highlighted' : ''}" data-index="\${index}">
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
                const apiBaseUrl = window.location.hostname === 'localhost'
                  ? 'http://localhost:22080'
                  : 'https://api.propertygenie.com.my';

                const source = \`https://propertygenie.com.my/agent-profile/${accountSlug}\`;

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
                  throw new Error('Failed to log interest');
                }
              } catch (error) {
                console.error('Error logging interest:', error);
              }

              // Redirect based on contact type
              const contactNumber = '${contactNumber}';
              const agentName = '${accountName.replace(/'/g, "\\'")}';

              if (contactType === 'call') {
                window.location.href = \`tel:\${contactNumber}\`;
              } else {
                const text = \`Hi \${agentName}, I am looking for property. I'm eager to explore the available options and would appreciate it if you could share details about any properties you have. Thank you!\`;
                window.location.href = \`https://wa.me/\${contactNumber}/?text=\${encodeURIComponent(text)}\`;
              }

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
