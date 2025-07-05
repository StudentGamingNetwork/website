import Bcrypt from "bcryptjs";

export async function generateToken(){
    return await Bcrypt.hash(generatePassword().replaceAll("/","").replaceAll("\\",""), 12);
}


export function generatePassword() { 
    const length = 24;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () => 
        charset
            .charAt(Math.floor(Math.random() * charset.length))
    ).join("");
}
