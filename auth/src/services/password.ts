import {scrypt, randomBytes} from 'crypto';
import {promisify} from 'node:util'

const scryptAsync = promisify(scrypt);
export class Password{
    static toHash  =async (password: string) => {
        const salt = randomBytes(8).toString('hex');
        const buff =  (await scryptAsync(salt, password, 64)) as Buffer;
        return `${buff.toString('hex')}.${salt}`;
    }

    static compare = async (storedPassword : string, suppliedPassword : string) =>{

        const [hashedPassword, salt] = storedPassword.split(".");
        const buff =  (await scryptAsync(salt, suppliedPassword, 64)) as Buffer;
        return buff.toString("hex") == hashedPassword;

    }
}