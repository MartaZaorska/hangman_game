export type DrawElement = {
  type: string;
  start?: [number, number];
  end?: [number, number];
  radius?: number;
  center?: [number, number];
};

export type Letter = {
  key: number;
  find: boolean;
};
