import { RNITextInputWrapperOnPasteEventObject } from "../../native_components/RNITextInputWrapperView/RNITextInputWrapperNativeViewEvents";


export type TextInputPasteOnPasteEventObject_IOS = 
    RNITextInputWrapperOnPasteEventObject
  & { platform: "ios" };

export type TextInputPasteOnPasteEventPayload_Web = {
  // TBA
};

export type TextInputPasteOnPasteEventObject_Web =  
    TextInputPasteOnPasteEventPayload_Web
  & ClipboardEvent
  & { platform: "web" };

export type TextInputPasteOnPasteEventObject =
    TextInputPasteOnPasteEventObject_IOS
  | TextInputPasteOnPasteEventObject_Web

export type TextInputPasteOnPasteEvent = (
  event: TextInputPasteOnPasteEventObject
) => void;