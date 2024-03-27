import { TextInputProps } from "react-native";

import { RNITextInputWrapperViewProps } from "../../native_components/RNITextInputWrapperView";
import { TextInputPasteOnPasteEvent } from "./TextInputPasteEvents";


export type TextInputPasteInheritedProps_IOS = Partial<Pick<RNITextInputWrapperViewProps,
  | 'pasteConfiguration'
  | 'editMenuDefaultActions'
>>;

export type TextInputPasteBaseProps =  {
  onPaste: TextInputPasteOnPasteEvent;
};

// prettier-ignore
export type TextInputPasteProps =
  & TextInputPasteInheritedProps_IOS
  & TextInputPasteBaseProps
  & TextInputProps;