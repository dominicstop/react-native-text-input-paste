import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to RNTextInputPaste.web.ts
// and on native platforms to RNTextInputPaste.ts
import RNTextInputPasteModule from './RNTextInputPasteModule';
import RNTextInputPasteView from './RNTextInputPasteView';
import { ChangeEventPayload, RNTextInputPasteViewProps } from './RNTextInputPaste.types';

// Get the native constant value.
export const PI = RNTextInputPasteModule.PI;

export function hello(): string {
  return RNTextInputPasteModule.hello();
}

export async function setValueAsync(value: string) {
  return await RNTextInputPasteModule.setValueAsync(value);
}

const emitter = new EventEmitter(RNTextInputPasteModule ?? NativeModulesProxy.RNTextInputPaste);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { RNTextInputPasteView, RNTextInputPasteViewProps, ChangeEventPayload };
