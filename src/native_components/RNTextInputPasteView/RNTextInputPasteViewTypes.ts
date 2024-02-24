import { ViewProps } from "react-native";
// import { RNTextInputPasteNativeViewBaseProps } from './RNTextInputPasteNativeViewTypes';

// export type RNTextInputPasteViewInheritedProps = Pick<RNTextInputPasteNativeViewBaseProps,
//  | 'TBA'
// >;

export type RNTextInputPasteViewBaseProps = {
  // TBA
};

// prettier-ignore
export type RNTextInputPasteViewProps =
  // & RNTextInputPasteViewInheritedProps
  & RNTextInputPasteViewBaseProps
  & ViewProps;
