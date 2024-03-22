import React from "react";
import { TextInput, TextInputProps } from 'react-native-web';

export function TextInputPaste(props: TextInputProps) {
  React.useEffect(() => {
    window.addEventListener('paste', handleOnPaste);

    return () => {
      window.removeEventListener('paste', handleOnPaste);
    };
  }, []);

  const handleOnPaste = (event: ClipboardEvent) => {
    console.log("handleOnPaste", event);
    
    if(event.clipboardData == null) return;

    // get elements from clipboard
    var items = event.clipboardData.items;

    if(items == null) return;

    console.log("handleOnPaste - items", items);
  };

  return(
    <TextInput
      {...props}
    />
  );
};