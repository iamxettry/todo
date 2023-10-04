import { ID, storage } from "../../../appwrite";

const uploadImage=async (file)=>{
    if(!file) return
    const fileUploaded= await storage.createFile(
        "6511730656e48027dc0c",
        ID.unique(),
        file
    )
    return fileUploaded
}

export default uploadImage;