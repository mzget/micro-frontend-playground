export type AppStateType = {
  router: any;
  settings: any;
  context: { loading: boolean; message: string };
  persist: {};
  auth: AUTHObjectType;
};

export type AUTHObjectType = {
  username: string;
  group: Array<string>;
  auth: Array<string>;
  menu: Array<string>;
  last_sign_on_date: string;
  loading: boolean;
};
