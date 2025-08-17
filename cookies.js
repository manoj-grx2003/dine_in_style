// Cookie consent banner logic for Namaste Restaurant
// Add this script to show a cookie consent banner and set a cookie

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cookie-consent-banner')) return; // Prevent duplicate banners

    // Check if consent already given
    if (document.cookie.split(';').some((item) => item.trim().startsWith('cookieConsent='))) {
        return;
    }

    // Create banner
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.style.position = 'fixed';
    banner.style.bottom = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.background = 'rgba(0,0,0,0.9)';
    banner.style.color = '#fff';
    banner.style.padding = '16px';
    banner.style.display = 'flex';
    banner.style.justifyContent = 'center';
    banner.style.alignItems = 'center';
    banner.style.zIndex = '9999';
    banner.innerHTML = `
        <span style="margin-right: 16px;">This website uses cookies to ensure you get the best experience. <a href="#" style="color:#ffd700;text-decoration:underline;">Learn more</a></span>
        <button id="accept-cookies" style="background:#ffd700;color:#222;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;font-weight:bold;">Accept</button>
    `;
    document.body.appendChild(banner);

    document.getElementById('accept-cookies').onclick = function() {
        // Set cookie for 1 year
        document.cookie = "cookieConsent=true; path=/; max-age=" + 60*60*24*365;
        banner.remove();
    };
});
