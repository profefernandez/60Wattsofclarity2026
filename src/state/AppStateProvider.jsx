import { useMemo, useReducer } from 'react';
import { AppDispatchContext, AppStateContext } from './appStateContext.js';

const initialState = {
  contactDraft: null,
  ui: {
    menuOpen: false,
  },
  accessibility: {
    fontScale: 1,
    highContrast: false,
    dyslexiaMode: false,
    keyboardMode: false,
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ui/menuToggled':
      return {
        ...state,
        ui: {
          ...state.ui,
          menuOpen: action.payload,
        },
      };
    case 'contact/draftSaved':
      return {
        ...state,
        contactDraft: action.payload,
      };
    case 'a11y/fontScaleSet':
      return {
        ...state,
        accessibility: {
          ...state.accessibility,
          fontScale: action.payload,
        },
      };
    case 'a11y/highContrastToggled':
      return {
        ...state,
        accessibility: {
          ...state.accessibility,
          highContrast: !state.accessibility.highContrast,
        },
      };
    case 'a11y/dyslexiaModeToggled':
      return {
        ...state,
        accessibility: {
          ...state.accessibility,
          dyslexiaMode: !state.accessibility.dyslexiaMode,
        },
      };
    case 'a11y/keyboardModeToggled':
      return {
        ...state,
        accessibility: {
          ...state.accessibility,
          keyboardMode: !state.accessibility.keyboardMode,
        },
      };
    default:
      return state;
  }
}

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = useMemo(() => state, [state]);

  return (
    <AppStateContext.Provider value={value}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
