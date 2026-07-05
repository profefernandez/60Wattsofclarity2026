'use client';

import { AppStateProvider } from '../src/state/AppStateProvider.jsx';

export default function Providers({ children }) {
  return <AppStateProvider>{children}</AppStateProvider>;
}
