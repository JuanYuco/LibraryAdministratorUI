export interface IBookData {
   id: number,
   title: string,
   author: string,
   gender: string,
   librariesNames: string[]
};

export interface IBookMinified {
  id: number,
  title: string
};

export interface IBookFullInfo {
  id: number,
  title: string,
  author: string,
  gender: string,
  librariesIds: number[]
};

export interface IBookToSave {
  id: number,
  title: string,
  author: string,
  gender: string,
  librariesIds: number[]
};


