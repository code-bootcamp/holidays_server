export interface IBoardPostsServiceCreate {
  user_id: string;
  board_id: string;
}

export interface IBoardPostsServiceFindOneByUserId {
  user_id: string;
}

export interface IBoardPostsServiceDelete {
  board_id: string;
  user_id: string;
}
