import { useEffect, useMemo } from 'react';
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

  const hasLargeText = accessibility.fontScale > 1;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const prefs = JSON.parse(saved);

      if (typeof prefs.fontScale === 'number') {
        dispatch({ type: 'a11y/fontScaleSet', payload: clampScale(prefs.fontScale) });
      }
      if (prefs.highContrast === true) {
        dispatch({ type: 'a11y/highContrastToggled' });
      }
      if (prefs.dyslexiaMode === true) {
        dispatch({ type: 'a11y/dyslexiaModeToggled' });
      }
      if (prefs.keyboardMode === true) {
        dispatch({ type: 'a11y/keyboardModeToggled' });
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
      <h2 className="a11y-widget__title">Accessibility</h2>
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
    </aside>
  );
}
