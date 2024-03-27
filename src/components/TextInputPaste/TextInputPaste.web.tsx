import * as React from "react";
import { TextInput } from 'react-native';

import { TextInputPasteProps } from "./TextInputPasteTypes";


export function TextInputPaste(props: TextInputPasteProps) {
  React.useEffect(() => {
    window.addEventListener('paste', handleOnPaste);

    return () => {
      window.removeEventListener('paste', handleOnPaste);
    };
  }, []);

  const handleOnPaste = (event: ClipboardEvent) => {
    event.stopPropagation();

    if(props.onPaste == null) return;
    if(event.clipboardData == null) return;

    // get elements from clipboard
    var items = event.clipboardData.items;
    if(items == null) return;   

    console.log("handleOnPaste - items", items);

    props.onPaste({
      platform: 'web',
      ...event,
    });
  };

  return(
    <TextInput
      {...props}
    />
  );
};