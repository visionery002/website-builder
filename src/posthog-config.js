import posthog from 'posthog-js';

/**
 * Initialize PostHog analytics
 * This tracks visitor metrics, user interactions, and unique users
 */
export function initPostHog() {
  // Replace YOUR_POSTHOG_API_KEY with your actual PostHog project key
  // Get it from: https://app.posthog.com/settings/project
  const apiKey = import.meta.env.VITE_POSTHOG_API_KEY || 'YOUR_POSTHOG_API_KEY';
  const host = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

  posthog.init(apiKey, {
    api_host: host,
    person_profiles: 'identified_only', // Only identify users who take action
    capture_pageview: true, // Auto-capture page views
    capture_pageleave: true, // Track when users leave pages
    debug: import.meta.env.DEV, // Debug mode in development
    autocapture: true, // Auto-capture clicks and form submissions
    session_recording: {
      recordCanvas: false,
    },
  });
}

/**
 * Track custom events (page navigation, form submissions, etc.)
 */
export function trackEvent(eventName, properties = {}) {
  if (posthog.has_opted_out_capturing()) {
    return;
  }
  posthog.capture(eventName, properties);
}

/**
 * Identify a user (optional - only if you want to track specific users)
 */
export function identifyUser(userId, userProperties = {}) {
  posthog.identify(userId, userProperties);
}

/**
 * Track page views manually (usually auto-captured)
 */
export function trackPageView(pageName, properties = {}) {
  trackEvent('$pageview', {
    page_name: pageName,
    ...properties,
  });
}

export default posthog;
