const POSITION_OF_ID_PARAM = -2;

export const extractIdFromUrl = (url: string) =>
  Number(url.split("/").slice(POSITION_OF_ID_PARAM)[0]);
