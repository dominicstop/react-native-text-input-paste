import { TextInputProps as TextInputProps_IOS } from "react-native";
// import { TextInputProps as TextInputProps_Web } from 'react-native-web';

import { RNITextInputWrapperViewProps } from "../../native_components/RNITextInputWrapperView";
import { TextInputPasteOnPasteEvent } from "./TextInputPasteEvents";


export type TextInputPasteInheritedProps_IOS = Partial<Pick<RNITextInputWrapperViewProps,
  | 'pasteConfiguration'
  | 'editMenuDefaultActions'
>>;

export type TextInputPasteBaseProps_IOS =  {
  // TBA
};

// prettier-ignore
export type TextInputPasteProps_IOS =
  & TextInputPasteInheritedProps_IOS
  & TextInputPasteBaseProps_IOS
  & TextInputProps_IOS;

export type TextInputPasteBaseProps_Web = {
  // TBA
};

export type TextInputPasteProps_Web = 
  & TextInputPasteBaseProps_Web
  // & TextInputProps_Web;

export type TextInputPasteProps_Shared = {
  onPaste: TextInputPasteOnPasteEvent;
};

export type TextInputPasteProps = 
  & TextInputPasteProps_IOS
  & TextInputPasteProps_Web
  & TextInputPasteProps_Shared;