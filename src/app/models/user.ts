export class User {
  // tslint:disable-next-line:variable-name
    _id: string;
    username: string;
    password: string;
    ofSuperAdminInRole: boolean;
    ofGroupAdminInRole: boolean;
    ofGroupAssistInRole: boolean;
    groupList: [];
    channelList: [];
    adminGroupList: [];
}
