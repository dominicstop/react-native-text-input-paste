/* eslint-disable @typescript-eslint/no-useless-constructor */

import React from "react";
import { StyleSheet, TextInputProps } from "react-native";

import type { TextInputWrapperViewProps } from "./TextInputWrapperViewTypes";
import { RNTextInputPasteView } from "../../native_components/RNTextInputPasteView";

const NATIVE_ID_KEYS = {
  textInput: "textInput",
};

export class TextInputWrapperView extends React.PureComponent<TextInputWrapperViewProps> {

  nativeRef!: RNTextInputPasteView;

  // Lifecycle
  // ---------

  constructor(props: TextInputWrapperViewProps){
    super(props);
  }

  componentWillUnmount(): void {
    this.nativeRef.notifyOnComponentWillUnmount();
  }

  // Internal Functions
  // ------------------

  private getProps = () => {
    const {  ...viewProps } = this.props;

    return {
      // A. Group native props for `RNTextInputPasteView`...
      nativeProps: {
        // TBA
      },

      // B. pass down regular props
      // TBA

      // C. Move all the default view-related
      //    props here...
      viewProps,
    };
  };

  // Render
  // -----

  render() {
    const props = this.getProps();

    return (
      <RNTextInputPasteView
        {...props.viewProps}
        {...props.nativeProps}
        ref={(r) => {
          this.nativeRef = r!;
        }}
        style={[styles.nativeView, props.viewProps.style]}
      />
    );
  }
}

const styles = StyleSheet.create({
  nativeView: {
    // TBA
  },
});
