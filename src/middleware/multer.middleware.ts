import { Request } from "express";
import multer, { diskStorage } from "multer";

const PATH_STORAGE = `${process.cwd()}/uploads`;
const whitelist: string[] = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/pdf'
]

const storage = diskStorage({
  destination(req: Request, file: Express.Multer.File, cb: any) {
    cb(null, PATH_STORAGE);
  },
  filename(req: Request, file: Express.Multer.File, cb: any) {
    const ext = file.originalname.split(".").pop();
    const name = file.originalname.split(".").shift();
    const newFileName = `${name}-${Date.now()}.${ext}`;
    cb(null, newFileName);
  },
});

const multerMiddleware = multer({
  storage, fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    if (whitelist.includes(file.mimetype)) {
      console.log(whitelist.includes(file.mimetype))
      cb(null, true);
    } else {

      console.log(whitelist.includes(file.mimetype))
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg  and .pdf format allowed!'));
    }
  }
});

export default multerMiddleware;