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
    if(event.clipboardData == null) return;

    event.stopPropagation();

    console.log({clipboardData: event.clipboardData});


    // get elements from clipboard
    var clipboardItems = event.clipboardData.items;
    if(clipboardItems == null) return;
    if(clipboardItems.length == 0) return;


    console.log({clipboardItems});

    for(const clipboardItem in clipboardItems){
      console.log({clipboardItem});
    };

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