import { Image } from "react-native";
import { RNITextInputWrapperOnPasteEventObject } from "../../native_components/RNITextInputWrapperView/RNITextInputWrapperNativeViewEvents";
import { MimeTypeString } from "../../types/MimeType";


export type TextInputPasteOnPasteEventObject_IOS = 
    RNITextInputWrapperOnPasteEventObject
  & { platform: "ios" };

export type ClipboardItemTypeWeb = ({
  type: 'image',
  image: HTMLImageElement;
} | {
  type: 'unsupported';
}) & {
  mimeType: MimeTypeString;
  blob: Blob;
};

export type TextInputPasteOnPasteEventPayload_Web = {
  clipboardItems: Array<ClipboardItemTypeWeb>;
};

export type TextInputPasteOnPasteEventObject_Web =  
    ClipboardEvent
  & TextInputPasteOnPasteEventPayload_Web
  & { platform: "web" };

export type TextInputPasteOnPasteEventObject =
    TextInputPasteOnPasteEventObject_IOS
  | TextInputPasteOnPasteEventObject_Web

export type TextInputPasteOnPasteEvent = (
  event: TextInputPasteOnPasteEventObject
) => void;