import { TextInputProps } from "react-native";
import { RNITextInputWrapperViewProps } from "../../native_components/RNITextInputWrapperView";

export type TextInputPasteInheritedProps = Partial<Pick<RNITextInputWrapperViewProps,
  | 'pasteConfiguration'
  | 'editMenuDefaultActions'
  | 'onPaste'
>>;

export type TextInputPasteBaseProps = {
  // TBA
};

// prettier-ignore
export type TextInputPasteProps =
  & TextInputPasteInheritedProps
  & TextInputPasteBaseProps
  & TextInputProps;
