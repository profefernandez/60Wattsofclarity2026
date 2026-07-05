'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppState } from '../state/useAppState.js';

const STORAGE_KEY = 'a11y-preferences-v1';
const MIN_FONT_SCALE = 0.9;
const MAX_FONT_SCALE = 1.4;
const SCALE_STEP = 0.05;

function clampScale(value) {
  return Math.max(MIN_FONT_SCALE, Math.min(MAX_FONT_SCALE, value));
}

export default function AccessibilityWidget() {
  const dispatch = useAppDispatch();
  const { accessibility } = useAppState();
  const [isOpen, setIsOpen] = useState(false);

  const hasLargeText = accessibility.fontScale > 1;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const prefs = JSON.parse(saved);

      if (typeof prefs.fontScale === 'number') {
        dispatch({ type: 'a11y/fontScaleSet', payload: clampScale(prefs.fontScale) });
      }
      if (typeof prefs.highContrast === 'boolean') {
        dispatch({ type: 'a11y/highContrastSet', payload: prefs.highContrast });
      }
      if (typeof prefs.dyslexiaMode === 'boolean') {
        dispatch({ type: 'a11y/dyslexiaModeSet', payload: prefs.dyslexiaMode });
      }
      if (typeof prefs.keyboardMode === 'boolean') {
        dispatch({ type: 'a11y/keyboardModeSet', payload: prefs.keyboardMode });
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--font-scale', String(accessibility.fontScale));
    root.toggleAttribute('data-high-contrast', accessibility.highContrast);
    root.toggleAttribute('data-dyslexia-mode', accessibility.dyslexiaMode);
    root.toggleAttribute('data-keyboard-mode', accessibility.keyboardMode);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(accessibility));
  }, [accessibility]);

  const liveStatus = useMemo(() => {
    const flags = [];
    if (accessibility.highContrast) flags.push('high contrast on');
    if (accessibility.dyslexiaMode) flags.push('dyslexia mode on');
    if (accessibility.keyboardMode) flags.push('keyboard mode on');
    if (hasLargeText) flags.push(`font scale ${Math.round(accessibility.fontScale * 100)} percent`);
    return flags.length > 0 ? flags.join(', ') : 'default accessibility settings';
  }, [accessibility, hasLargeText]);

  return (
    <aside className="a11y-widget" aria-label="Accessibility preferences">
      <button
        type="button"
        className="a11y-widget__launcher"
        aria-label="Accessibility Widget"
        aria-controls="a11y-widget-panel"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <svg className="a11y-widget__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 6c2.8 0 5.2 1.6 6.3 4h-2.2c-.7-1.3-2-2.2-3.5-2.2H11c-1.6 0-3 1-3.6 2.4L6 18h2.1l1.3-5.7a1.5 1.5 0 0 1 1.5-1.2h.7c.8 0 1.5.5 1.8 1.3l1.7 4.7c.3.8 1.1 1.3 1.9 1.3h2v2h-2c-1.7 0-3.3-1-4-2.6l-.9-2.4-1.4 6h-2.1l1.2-5.2-1.2 5.2H7.4l1.1-4.9C7 16 6 14.4 6 12.6 6 9.5 8.5 8 12 8Zm0 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
          />
        </svg>
      </button>

      <div id="a11y-widget-panel" className="a11y-widget__panel" hidden={!isOpen}>
        <div className="a11y-widget__panel-head">
          <h2 className="a11y-widget__title">Accessibility</h2>
          <button
            type="button"
            className="a11y-widget__close"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
        {/* QA reminder: confirm the live status is announced by screen readers when settings change. */}
        <p className="a11y-widget__status" aria-live="polite">
          {liveStatus}
        </p>
        {/* QA reminder: test keyboard-only focus order, visible focus rings, and toggle state announcements. */}
        <div className="a11y-widget__row" role="group" aria-label="Text size controls">
          <button
            type="button"
            className="a11y-widget__button"
            onClick={() => dispatch({ type: 'a11y/fontScaleSet', payload: clampScale(accessibility.fontScale - SCALE_STEP) })}
          >
            A-
          </button>
          <button
            type="button"
            className="a11y-widget__button"
            onClick={() => dispatch({ type: 'a11y/fontScaleSet', payload: clampScale(accessibility.fontScale + SCALE_STEP) })}
          >
            A+
          </button>
        </div>
        <button
          type="button"
          className="a11y-widget__toggle"
          aria-pressed={accessibility.highContrast}
          onClick={() => dispatch({ type: 'a11y/highContrastToggled' })}
        >
          High contrast
        </button>
        <button
          type="button"
          className="a11y-widget__toggle"
          aria-pressed={accessibility.dyslexiaMode}
          onClick={() => dispatch({ type: 'a11y/dyslexiaModeToggled' })}
        >
          Dyslexia-friendly text
        </button>
        <button
          type="button"
          className="a11y-widget__toggle"
          aria-pressed={accessibility.keyboardMode}
          onClick={() => dispatch({ type: 'a11y/keyboardModeToggled' })}
        >
          Keyboard & screen-reader support
        </button>
      </div>
    </aside>
  );
}
