import * as React from "react";
import { TextInput } from 'react-native';

import { TextInputPasteProps } from "./TextInputPasteTypes";
import { MimeTypeString } from "../../types/MimeType";

import * as MimeTypeHelpers from "../../functions/MimeTypeHelpers";
import { ClipboardItemTypeWeb } from "./TextInputPasteEvents";


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

      const clipboardItemsProcessed: Array<ClipboardItemTypeWeb> = [];

      for(const clipboardItem of clipboardItems) {
        
        console.log({clipboardItem});
        
        for(const clipboardItemType of clipboardItem.types) {
          if(clipboardItemType == null) continue;
          const clipboardMimeType: MimeTypeString = clipboardItemType.toString();

          console.log({clipboardMimeType});
          console.log({clipboardItemType});
          
          const blob = await clipboardItem.getType(clipboardItemType);

          let clipboardItemProcessed: ClipboardItemTypeWeb = {
            type: 'unsupported',
            blob: blob,
            mimeType: clipboardMimeType,
          };

          const isImage = MimeTypeHelpers.evaluateMimeTypeString(
            'contains', 
            clipboardMimeType,
            'image'
          );

          if(isImage){
            const image = new Image();
            image.src = URL.createObjectURL(blob);

            clipboardItemProcessed = {
              ...clipboardItemProcessed,
              type: 'image',
              image: image,
            };
          };

          clipboardItemsProcessed.push(clipboardItemProcessed);
          console.log({blob});
        };
      };

      props.onPaste({
        ...event,
        platform: 'web',
        clipboardItems: clipboardItemsProcessed,
      });

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