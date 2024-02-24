import { requireNativeViewManager } from "expo-modules-core";

import type { RNTextInputPasteNativeViewProps } from "./RNTextInputPasteNativeViewTypes";

export const RNTextInputPasteNativeView: React.ComponentType<RNTextInputPasteNativeViewProps> =
  requireNativeViewManager("RNTextInputPasteModule");
