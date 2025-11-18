import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import type { AgentApiResponse } from '../types/agent';
import { AgentProfile as AgentProfileTemplate1 } from './AgentProfileTemplate1';
import { AgentProfileTemplate2 } from './AgentProfileTemplate2';
import { AgentProfileTemplate3 } from './AgentProfileTemplate3';

interface AgentProfileProps {
  agent: AgentApiResponse;
  domain: string;
  accountId: string;
  commonData: any;
  template?: string;
}

/**
 * Agent Profile Template Switcher
 * Allows switching between different profile templates for comparison
 *
 * Usage:
 * - Default (Template 1): https://yourdomain.com
 * - Template 2: https://yourdomain.com?template=2
 * - Template 3: https://yourdomain.com?template=3
 */
export const AgentProfile: FC<AgentProfileProps> = ({ agent, domain, accountId, commonData, template = '1' }) => {
  // Normalize template value
  const templateId = template || '1';

  // Template selector component (appears as fixed UI)
  const TemplateSelector = () => (
    <>
      <Style>{css`
        .template-selector {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          padding: 16px;
          z-index: 9999;
          min-width: 200px;
        }

        .template-selector-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .template-selector-close {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          color: #999;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .template-selector-close:hover {
          color: #333;
        }

        .template-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .template-option {
          padding: 10px 14px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          font-size: 13px;
          display: block;
          text-align: center;
        }

        .template-option:hover {
          border-color: #3b82f6;
          background: #f0f9ff;
        }

        .template-option.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }

        .template-toggle-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          z-index: 9998;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .template-toggle-btn:hover {
          background: #2563eb;
          transform: scale(1.05);
        }

        .template-selector.hidden {
          display: none;
        }

        .template-description {
          font-size: 11px;
          color: #666;
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .template-selector {
            bottom: 10px;
            right: 10px;
            left: 10px;
            min-width: auto;
          }

          .template-toggle-btn {
            bottom: 10px;
            right: 10px;
            width: 48px;
            height: 48px;
            font-size: 20px;
          }
        }
      `}</Style>

      <button class="template-toggle-btn" onclick="document.querySelector('.template-selector').classList.toggle('hidden')" title="Switch Template">
        ⚡
      </button>

      <div class="template-selector hidden">
        <div class="template-selector-title">
          <span>Choose Template</span>
          <button class="template-selector-close" onclick="document.querySelector('.template-selector').classList.add('hidden')">×</button>
        </div>
        <div class="template-options">
          <a href="?template=1" class={`template-option ${templateId === '1' ? 'active' : ''}`}>
            <div>Template 1: Premium</div>
            <div class="template-description">Feature-rich with hero section</div>
          </a>
          <a href="?template=2" class={`template-option ${templateId === '2' ? 'active' : ''}`}>
            <div>Template 2: Modern</div>
            <div class="template-description">Clean, minimalist design</div>
          </a>
          <a href="?template=3" class={`template-option ${templateId === '3' ? 'active' : ''}`}>
            <div>Template 3: Classic</div>
            <div class="template-description">Traditional, text-focused</div>
          </a>
        </div>
      </div>
    </>
  );

  // Render the appropriate template with selector overlay
  const renderTemplate = () => {
    const props = { agent, domain, accountId, commonData };

    switch (templateId) {
      case '2':
        return (
          <>
            <AgentProfileTemplate2 {...props} />
            <TemplateSelector />
          </>
        );
      case '3':
        return (
          <>
            <AgentProfileTemplate3 {...props} />
            <TemplateSelector />
          </>
        );
      case '1':
      default:
        return (
          <>
            <AgentProfileTemplate1 {...props} />
            <TemplateSelector />
          </>
        );
    }
  };

  return renderTemplate();
};
