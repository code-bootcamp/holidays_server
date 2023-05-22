export interface IWishlistsServiceCreate {
  user_id: string;
  class_id: string;
}

export interface IWishlistsServiceFindOneByUserId {
  user_id: string;
}

export interface IWishlistsServiceDelete {
  class_id: string;
  user_id: string;
}
