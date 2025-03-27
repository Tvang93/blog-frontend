export interface IBlogItems {
    id: number
    userId: number
    publisherName: string
    date: string
    title: string
    image: string
    description: string
    category: string
    isPublished: boolean
    isDeleted: boolean
}


//This will be used for our login and crete account fetch
export interface IUSerInfo {
    Username: string
    password: string
}


//This will be used to fetch our user data id & name
export interface IUserData {
    id: number
    username: string
}

//Interface for getting our Token
export interface IToken {
    token: string
}