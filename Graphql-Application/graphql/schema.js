import {buildSchema} from "graphql";

export default buildSchema(
    `
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        role: String!
        createdAt: String!
        updatedAt: String!
        }

    type Cryptocurrency {
        id: ID!
        code: String!
        name: String!
        description: String
        volume: String!
        change: String!
        currentPrice:Float!
        closingPrice:Float!
        createdAt: String!
        updatedAt: String!
        }
    
    type Post {
        id:Int,
        category:String,
        feedback:String
    }

    input UserInputData {
        name: String!
        email: String!
        password: String!
        role: String!
    }

    input LoginData {
        email:String!,
        password:String!
    }

    input InputCryptocurrency {
        id : Int
        code: String
        name: String
        description: String
        volume: String
        change: String
        currentPrice:Float
        closingPrice:Float
        }

    type AuthResponse {
        token:String!,
        email:String!
    }

    type Response {
        response:String!,
        statusCode:Int!
    }

    type RootMutation {
        createUser(user:UserInputData) : User!,
        addCrypto(crypto:InputCryptocurrency) : Response,
        editCrypto(obj:InputCryptocurrency): Response!,
        deleteCrypto(code:String): Response!,
    }

    union Event = Cryptocurrency | Response

    type RootQuery {
        login(loginData:LoginData):AuthResponse!,
        test:Post,
        getCrypto(code:String): Cryptocurrency,
        getCryptos : [Cryptocurrency!]!
        
    }

    schema {
        query : RootQuery,
        mutation : RootMutation,
    }
    
    `
)