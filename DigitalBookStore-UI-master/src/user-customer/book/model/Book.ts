export class Book{
    bookID!:string;
    authorID!:number;
    title!:string;
    price!:number;
    categoryID!:number;
    coverImage!:string;
    coverImageBytes!:Uint8Array
    base64img!:string
    authorName!:string;
    categoryName!:string;
    description!:string;
}