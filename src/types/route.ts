import { ReactNode } from "react";

export type TRoute = {
  children?: TRoute[];
  path: string;
  element: ReactNode;
};

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};
