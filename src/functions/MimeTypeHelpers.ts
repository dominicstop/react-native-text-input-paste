import { MimeTypeString } from "../types/MimeType";
import { MimeTypeConfig, MimeTypeQueryString } from "../types/MimeTypeConfig";


export function evaluateMimeTypeConfig(
  config: MimeTypeConfig,
  mimeTypeString: MimeTypeString
): boolean {

  const comparisonMode = config.comparisonMode ?? 'contains';

  switch(config.mode){
    case "config":
      const stringQueries: Array<string> = [];

      if(config.type != null){
        stringQueries.push(config.type);
      };

      if(config.subtype != null){
        stringQueries.push(config.subtype);
      };

      if(config.parameter != null){
        stringQueries.push(config.parameter);
      };

      for(const stringQuery of stringQueries){
        const result = evaluateMimeTypeString(
          comparisonMode,
          stringQuery,
          mimeTypeString
        );

        if(result === true){
          return result;
        };
      };

      return false;

    case "string":
      return evaluateMimeTypeString(
        comparisonMode,
        config.mimeString,
        mimeTypeString
      );
  };
};

export function evaluateMimeTypeString(
  comparisonMode: MimeTypeConfig['comparisonMode'],
  mimeTypeString1: MimeTypeQueryString,
  mimeTypeString2: MimeTypeQueryString,
){
  switch(comparisonMode) {
    case "contains":
      return mimeTypeString1.includes(mimeTypeString2);

    case "equals":
      return mimeTypeString1 === mimeTypeString2;

    default:
      return false;
  };
};