import { useEffect, useState } from 'react';

export interface DeviceInfo {
  userAgent: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
  osVersion: string;
  screenResolution: string;
  timezone: string;
  language: string;
  referrer: string;
  source: string; // direct, google, facebook, etc
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  timestamp: string;
  ipInfo?: string; // Will be fetched from client IP API if available
}

export function useDeviceTracking(): DeviceInfo | null {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    // Get device type based on screen size
    const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    };

    // Parse browser and OS from User Agent
    const parseUserAgent = (): { browser: string; os: string; osVersion: string } => {
      const ua = navigator.userAgent;
      let browser = 'Unknown';
      let os = 'Unknown';
      let osVersion = 'Unknown';

      // Detect browser
      if (ua.includes('Chrome') && !ua.includes('Chromium')) {
        browser = 'Chrome';
      } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser = 'Safari';
      } else if (ua.includes('Firefox')) {
        browser = 'Firefox';
      } else if (ua.includes('Edge')) {
        browser = 'Edge';
      } else if (ua.includes('Opera') || ua.includes('OPR')) {
        browser = 'Opera';
      }

      // Detect OS
      if (ua.includes('Windows')) {
        os = 'Windows';
        const match = ua.match(/Windows NT ([\d.]+)/);
        if (match) osVersion = match[1];
      } else if (ua.includes('Mac')) {
        os = 'macOS';
        const match = ua.match(/Mac OS X ([\d_]+)/);
        if (match) osVersion = match[1].replace(/_/g, '.');
      } else if (ua.includes('Linux')) {
        os = 'Linux';
      } else if (ua.includes('Android')) {
        os = 'Android';
        const match = ua.match(/Android ([\d.]+)/);
        if (match) osVersion = match[1];
      } else if (ua.includes('iPhone') || ua.includes('iPad')) {
        os = 'iOS';
        const match = ua.match(/OS ([\d_]+)/);
        if (match) osVersion = match[1].replace(/_/g, '.');
      }

      return { browser, os, osVersion };
    };

    // Extract UTM parameters from URL
    const getUtmParams = (): Record<string, string> => {
      const params: Record<string, string> = {};
      const searchParams = new URLSearchParams(window.location.search);

      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
      utmKeys.forEach((key) => {
        const value = searchParams.get(key);
        if (value) params[key] = value;
      });

      return params;
    };

    // Detect traffic source from referrer
    const detectSource = (): string => {
      const referrer = document.referrer;

      if (!referrer) return 'direct';

      const referrerUrl = new URL(referrer);
      const hostname = referrerUrl.hostname;

      if (hostname.includes('google')) return 'google';
      if (hostname.includes('facebook')) return 'facebook';
      if (hostname.includes('instagram')) return 'instagram';
      if (hostname.includes('linkedin')) return 'linkedin';
      if (hostname.includes('twitter') || hostname.includes('x.com')) return 'twitter';
      if (hostname.includes('youtube')) return 'youtube';
      if (hostname.includes('whatsapp')) return 'whatsapp';
      if (hostname.includes('telegram')) return 'telegram';

      return hostname;
    };

    const { browser, os, osVersion } = parseUserAgent();
    const utmParams = getUtmParams();
    const source = detectSource();

    const info: DeviceInfo = {
      userAgent: navigator.userAgent,
      deviceType: getDeviceType(),
      browser,
      os,
      osVersion,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      referrer: document.referrer || 'direct',
      source,
      utmSource: utmParams.utm_source,
      utmMedium: utmParams.utm_medium,
      utmCampaign: utmParams.utm_campaign,
      utmContent: utmParams.utm_content,
      utmTerm: utmParams.utm_term,
      timestamp: new Date().toISOString(),
    };

    setDeviceInfo(info);
  }, []);

  return deviceInfo;
}
