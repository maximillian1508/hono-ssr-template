import type { FC } from 'hono/jsx';

/**
 * HeaderCompensation Component
 * Provides spacing compensation for the fixed header
 * Prevents content from being hidden behind the fixed header
 */
export const HeaderCompensation: FC = () => {
  return (
    <div
      style={{
        height: '73px',
        visibility: 'hidden',
      }}
    />
  );
};
