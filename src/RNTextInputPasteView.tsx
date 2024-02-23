import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { RNTextInputPasteViewProps } from './RNTextInputPaste.types';

const NativeView: React.ComponentType<RNTextInputPasteViewProps> =
  requireNativeViewManager('RNTextInputPaste');

export default function RNTextInputPasteView(props: RNTextInputPasteViewProps) {
  return <NativeView {...props} />;
}
