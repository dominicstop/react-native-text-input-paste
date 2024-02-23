import * as React from 'react';

import { RNTextInputPasteViewProps } from './RNTextInputPaste.types';

export default function RNTextInputPasteView(props: RNTextInputPasteViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
