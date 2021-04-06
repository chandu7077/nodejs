
import {signUp, login} from "../controllers/auth.js";
import {addCrypto, deleteCryptoByCode, getCryptoByCode, editCrypto, getCryptoCurrencies} from "../controllers/cryptocurrency.js";

const test = () => {
    return {
        id:1,
        category:"deposit",
        feedback:"Poor deposit methods"
    }
}

export const ResolveType = {
    Query: {
        
    },
    Event: {
    __resolveType(obj, context, info) {
        if (obj.id) {
          return 'Worksheet';
        }
  
        if (obj.code) {
          return 'ApiError';
        }
  
        return null;
      }
    }
  }

const createUser = signUp;
const getCrypto = getCryptoByCode;
const getCryptos = getCryptoCurrencies;
const deleteCrypto = deleteCryptoByCode;


export default {test, deleteCrypto, createUser, signUp, login, addCrypto, getCrypto, getCryptos, editCrypto};