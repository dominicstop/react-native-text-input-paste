/* eslint-disable @typescript-eslint/no-useless-constructor */

import React from "react";
import { StyleSheet, TextInput } from "react-native";

import type { TextInputPasteProps } from "./TextInputPasteTypes";

import { RNITextInputWrapperView } from "../../native_components/RNITextInputWrapperView";
import { RNATextInputWrapperView } from "../../native_components/RNATextInputWrapperView";

import { IS_PLATFORM_IOS } from "../../constants/LibEnv";

const NATIVE_ID_KEYS = {
  textInput: "textInput",
};

export class TextInputPaste extends React.PureComponent<TextInputPasteProps> {

  nativeRefIOS!: RNITextInputWrapperView;
  nativeRefAndroid!: RNATextInputWrapperView;

  // Lifecycle
  // ---------

  constructor(props: TextInputPasteProps){
    super(props);
  };

  // Internal Functions
  // ------------------

  private getProps = () => {
    const { 
      pasteConfiguration,
      editMenuDefaultActions,
      ...textInputProps 
    } = this.props;

    return {
      // A. Group native props for `RNITextInputWrapperView`...
      nativeProps: {
        pasteConfiguration,
        editMenuDefaultActions,
      },

      // B. Move all the default view-related
      //    props here...
      textInputProps,
    };
  };

  // Render
  // -----

  render() {
    const props = this.getProps();

    if(IS_PLATFORM_IOS){
      return (
        <RNITextInputWrapperView
          {...props.nativeProps}
          ref={(r) => {
            this.nativeRefIOS = r!;
          }}
          style={[styles.nativeView]}
          onPaste={this.props.onPaste}
        >
          <TextInput
            {...props.textInputProps}
            nativeID={NATIVE_ID_KEYS.textInput}
          />
        </RNITextInputWrapperView>
      );
    };

    return (
      <TextInput
        {...props.textInputProps}
      />
    );
  };
};

const styles = StyleSheet.create({
  nativeView: {
    // TBA
  },
});
