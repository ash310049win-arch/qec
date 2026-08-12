(function() {
  // A host SPA (e.g. the marketing site) sets window.__agentive_widget_active =
  // false on route-change/unmount, so a late-loading embed never initialises on
  // the wrong page. Undefined for normal third-party embeds -> always runs.
  if (window.__agentive_widget_active === false) return;
  if (window.__agentive_widget_cmocb0anf000404lb38ollfsf) return;
  window.__agentive_widget_cmocb0anf000404lb38ollfsf = true;

  var CHATBOT_ID = 'cmocb0anf000404lb38ollfsf';
  var BASE_URL = 'https://app.agentive.co.in';
  var COLOR = '#f43f5e';
  var POSITION = 'right';
  var GREETING = "Welcome to Quilon Educational Consultancy! We help students pursue quality education abroad and within India with expert guidance and visa support.";
  var NAME = "Admissions for Abroad & India";
  var BOTTOM = 20;
  var SIDE = 20;
  var PROACTIVE_ENABLED = false;
  var PROACTIVE_DELAY = 10;
  var PROACTIVE_MSG = "";
  var BTN_EFFECT = 'heartbeat';

  // ── Styles ──────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#agentive-widget-btn {',
    '  position: fixed;',
    '  ' + POSITION + ': ' + SIDE + 'px;',
    '  bottom: ' + BOTTOM + 'px;',
    '  width: 60px;',
    '  height: 60px;',
    '  border-radius: 50%;',
    '  background: ' + COLOR + ';',
    '  border: none;',
    '  cursor: pointer;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  box-shadow: 0 4px 20px rgba(0,0,0,0.15);',
    '  z-index: 2147483646;',
    '  transition: transform 0.2s ease, box-shadow 0.2s ease;',
    '  touch-action: manipulation;',
    '  -webkit-tap-highlight-color: transparent;',
    '}',
    (BTN_EFFECT !== 'none' ? '#agentive-widget-btn:not(.agentive-open) { animation: agentive-fx-' + BTN_EFFECT + ' ' + (BTN_EFFECT === 'wiggle' ? '0.5s ease-in-out 3s infinite' : BTN_EFFECT === 'bounce' ? '1.5s ease-in-out infinite' : BTN_EFFECT === 'heartbeat' ? '1.5s ease-in-out infinite' : '2s ease-in-out infinite') + '; }' : ''),
    '#agentive-widget-btn:hover {',
    '  transform: scale(1.08);',
    '  box-shadow: 0 6px 28px rgba(0,0,0,0.2);',
    '}',
    '#agentive-widget-frame {',
    '  position: fixed;',
    '  ' + POSITION + ': ' + SIDE + 'px;',
    '  bottom: ' + (BOTTOM + 72) + 'px;',
    '  box-sizing: border-box;',
    '  width: 400px;',
    '  height: 600px;',
    '  max-height: calc(100vh - 120px);',
    '  max-height: calc(100dvh - 120px);',
    '  max-width: calc(100vw - 40px);',
    '  border: none;',
    '  border-radius: 16px;',
    '  box-shadow: 0 10px 40px rgba(0,0,0,0.15);',
    '  z-index: 2147483647;',
    '  display: none;',
    '  overflow: hidden;',
    '  background: #fff;',
    '}',
    '#agentive-proactive-bubble {',
    '  position: fixed;',
    '  ' + POSITION + ': ' + SIDE + 'px;',
    '  bottom: ' + (BOTTOM + 72) + 'px;',
    '  max-width: 250px;',
    '  background: #fff;',
    '  border-radius: 12px;',
    '  box-shadow: 0 4px 24px rgba(0,0,0,0.15);',
    '  padding: 12px 36px 12px 16px;',
    '  font-size: 14px;',
    '  line-height: 1.4;',
    '  color: #1f2937;',
    '  z-index: 2147483646;',
    '  animation: agentive-bubble-in 0.3s ease;',
    '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
    '}',
    '#agentive-proactive-bubble-close {',
    '  position: absolute;',
    '  top: 6px;',
    '  right: 8px;',
    '  width: 20px;',
    '  height: 20px;',
    '  border: none;',
    '  background: transparent;',
    '  cursor: pointer;',
    '  font-size: 16px;',
    '  color: #9ca3af;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 0;',
    '  line-height: 1;',
    '}',
    '#agentive-proactive-bubble-close:hover { color: #374151; }',
    '@keyframes agentive-bubble-in {',
    '  from { opacity: 0; transform: translateY(8px); }',
    '  to { opacity: 1; transform: translateY(0); }',
    '}',
    '@keyframes agentive-fx-pulse {',
    '  0%, 100% { transform: scale(1); }',
    '  50% { transform: scale(1.1); }',
    '}',
    '@keyframes agentive-fx-bounce {',
    '  0%, 100% { transform: translateY(0); }',
    '  50% { transform: translateY(-8px); }',
    '}',
    '@keyframes agentive-fx-wiggle {',
    '  0%, 100% { transform: rotate(0deg); }',
    '  25% { transform: rotate(-5deg); }',
    '  75% { transform: rotate(5deg); }',
    '}',
    '@keyframes agentive-fx-glow {',
    '  0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 0 0 ' + COLOR + '66; }',
    '  50% { box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 0 10px ' + COLOR + '00; }',
    '}',
    '@keyframes agentive-fx-heartbeat {',
    '  0%, 100% { transform: scale(1); }',
    '  14% { transform: scale(1.15); }',
    '  28% { transform: scale(1); }',
    '  42% { transform: scale(1.1); }',
    '  56% { transform: scale(1); }',
    '}',
    '@media (max-width: 480px) {',
    '  #agentive-widget-frame {',
    '    width: min(420px, calc(100vw - 16px));',
    '    height: 65vh;',
    '    height: min(680px, calc(100dvh - ' + (Math.max(BOTTOM, 16) + 76) + 'px));',
    '    max-height: calc(100vh - ' + (Math.max(BOTTOM, 16) + 76) + 'px);',
    '    max-height: calc(100dvh - ' + (Math.max(BOTTOM, 16) + 76) + 'px);',
    '    bottom: ' + (Math.max(BOTTOM, 16) + 60) + 'px;',
    '    ' + POSITION + ': ' + Math.max(Math.min(SIDE, 8), 8) + 'px;',
    '    border-radius: 16px;',
    '  }',
    '  #agentive-widget-btn {',
    '    width: 52px;',
    '    height: 52px;',
    '    ' + POSITION + ': ' + Math.max(SIDE, 16) + 'px;',
    '    bottom: ' + Math.max(BOTTOM, 16) + 'px;',
    '  }',
    '  #agentive-widget-btn.agentive-open {',
    '    z-index: 2147483647;',
    '  }',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  // ── Button ──────────────────────────────────────────────────
  var btn = document.createElement('button');
  btn.id = 'agentive-widget-btn';
  btn.setAttribute('aria-label', 'Open ' + NAME + ' chat');
  btn.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIxIDE1YTIgMiAwIDAgMS0yIDJIN2wtNCA0VjVhMiAyIDAgMCAxIDItMmgxNGEyIDIgMCAwIDEgMiAyeiIvPjwvc3ZnPg==" width="28" height="28" style="border-radius:50%;object-fit:cover;" alt="" />';
  document.body.appendChild(btn);

  // ── Iframe ──────────────────────────────────────────────────
  var iframe = document.createElement('iframe');
  iframe.id = 'agentive-widget-frame';
  iframe.src = BASE_URL + '/chat/' + CHATBOT_ID + '?widget=true';
  iframe.setAttribute('title', NAME + ' Chat');
  iframe.setAttribute('allow', 'clipboard-write');
  document.body.appendChild(iframe);

  // ── Toggle ──────────────────────────────────────────────────
  var isOpen = false;
  var iconHtmlClosed = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIxIDE1YTIgMiAwIDAgMS0yIDJIN2wtNCA0VjVhMiAyIDAgMCAxIDItMmgxNGEyIDIgMCAwIDEgMiAyeiIvPjwvc3ZnPg==" width="28" height="28" style="border-radius:50%;object-fit:cover;" alt="" />';
  var iconHtmlOpen = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

  function closeWidget() {
    if (!isOpen) return;
    isOpen = false;
    iframe.style.display = 'none';
    btn.innerHTML = iconHtmlClosed;
    btn.classList.remove('agentive-open');
  }

  function openWidget() {
    if (isOpen) return;
    isOpen = true;
    iframe.style.display = 'block';
    btn.classList.add('agentive-open');
    btn.innerHTML = iconHtmlOpen;
    var existingBubble = document.getElementById('agentive-proactive-bubble');
    if (existingBubble) existingBubble.remove();
  }

  function toggleWidget(e) {
    e.stopPropagation();
    e.preventDefault();
    isOpen ? closeWidget() : openWidget();
  }
  btn.addEventListener('click', toggleWidget);
  btn.addEventListener('touchend', toggleWidget);

  // ── Click outside to close ─────────────────────────────────
  document.addEventListener('click', function(e) {
    if (!isOpen) return;
    var target = e.target;
    if (target === btn || btn.contains(target)) return;
    if (target === iframe) return;
    closeWidget();
  });

  // ── Proactive Message ────────────────────────────────────────
  if (PROACTIVE_ENABLED && PROACTIVE_MSG) {
    setTimeout(function() {
      if (isOpen) return;
      // Don't nudge if the host deactivated the widget (SPA navigated away) or
      // the launcher is gone — otherwise the bubble orphans on the new page.
      if (window.__agentive_widget_active === false) return;
      if (!document.getElementById('agentive-widget-btn')) return;
      if (document.getElementById('agentive-proactive-bubble')) return;

      var bubble = document.createElement('div');
      bubble.id = 'agentive-proactive-bubble';
      bubble.textContent = PROACTIVE_MSG;

      var closeBtn = document.createElement('button');
      closeBtn.id = 'agentive-proactive-bubble-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.setAttribute('aria-label', 'Dismiss');
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        bubble.remove();
      });

      bubble.appendChild(closeBtn);

      // Clicking the bubble itself opens the chat
      bubble.style.cursor = 'pointer';
      bubble.addEventListener('click', function(e) {
        e.stopPropagation();
        bubble.remove();
        openWidget();
      });

      document.body.appendChild(bubble);
    }, PROACTIVE_DELAY * 1000);
  }
})();