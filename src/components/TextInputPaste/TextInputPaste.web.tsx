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

  const handleOnPaste = async (event: ClipboardEvent) => {
    if(props.onPaste == null) return;
    event.stopPropagation();

    try {
      const clipboardItems = await navigator.clipboard.read();

      console.log({clipboardItems});

      for(const clipboardItem of clipboardItems) {
        console.log({clipboardItem});
        
        for(const clipboardItemType of clipboardItem.types) {
          console.log({clipboardItemType});
          
          const blob = await clipboardItem.getType(clipboardItemType);
          // Do something with the image blob.

          console.log({blob});
        };
      };

    } catch (err) {
      console.error(err.name, err.message);
    };
  };

  return(
    <TextInput
      {...props}
    />
  );
};