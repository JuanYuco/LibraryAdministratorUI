export interface IResponseBase {
  successful: boolean,
  userMessage: string
}

export interface ICollectionResponse<T> extends IResponseBase{
  entityCollection: T[]
}

export interface IEntityResponse<T> extends IResponseBase{
  entity: T
}

export interface IMessageResponse {
  userMessage: string
}
