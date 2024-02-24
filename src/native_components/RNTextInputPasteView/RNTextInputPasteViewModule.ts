import { requireNativeModule } from "expo-modules-core";

interface RNTextInputPasteViewModuleType {
  // TBA
}

export const RNTextInputPasteViewModule: RNTextInputPasteViewModuleType =
  requireNativeModule("RNTextInputPasteModule");