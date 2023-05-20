export interface IWishlistsServiceCreate {
  user_id: string;
  class_id: string;
}

export interface IWishlistsServiceFindOneByUserId {
  user_id: string;
}

export interface IWishlistsServiceDelete {
  wishlist_id: string;
}
