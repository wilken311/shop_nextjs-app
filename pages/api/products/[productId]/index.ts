import { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "express";
import {
  findProduct,
  deleteProduct,
  updateProduct,
} from "@/api-lib/db/products";
import nc from "next-connect";
import { ncOpts } from "@/api-lib/nc";
import { auths, validateBody} from "@/api-lib/middlewares";
import { ValidateProps } from "@/api-lib/constants";
import { User } from "@/lib/user";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

type NextApiRequestWithFormData = NextApiRequest &
  Request & {
    files: any[];
    file: any;
    user: User;
  };

type NextApiResponseCustom = NextApiResponse & Response;

const handler = nc<NextApiRequestWithFormData, NextApiResponseCustom>(ncOpts);

const upload = multer({ dest: "/tmp" });

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

handler.use(...auths);
handler
  .get(async (req, res) => {
    try {
      
      let _id = req.query.productId;
      const product = await findProduct(JSON.parse(JSON.stringify(_id)));
      return res.status(200).json({
        message: product,
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        message: (<Error>err).message,
        success: false,
      });
    }
  })
  .put(
    upload.single("photo"),
    validateBody({
      type: "object",
      properties: {
        name: ValidateProps.product.name,
        description: ValidateProps.product.description,
        price: ValidateProps.product.price,
        updatedAt: ValidateProps.product.updatedAt,
      },
      required: ["name", "description", "price", "updatedAt"],
      additionalProperties: true,
    }),
    async (req, res) => {
      try {
        if(!req.user) res.status(401).end();
        const regexPattern = /^\d+$/;
        if (!regexPattern.test(req.body.price)) {
          return res.status(404).json({
            error: {
              message: "Price must be a number.",
            },
            success: false,
          });
        }

        let _id = req.query.productId;
        let photo = req.body.photo;

        if (req.file) {
          const image = await cloudinary.uploader.upload(req.file.path, {
            width: 600,
            height: 400,
            crop: "fill",
          });
          photo = image.secure_url;
        }

        let updatedProduct = { ...req.body, photo };

        await updateProduct(
          JSON.parse(JSON.stringify(_id)),
          updatedProduct,
          req.user?._id
        );

        return res.status(200).json({
          message: "Product is successfully updated!",
          success: true,
        });
      } catch (err) {
        return res.status(500).json({
          message: (<Error>err).message,
          success: false,
        });
      }
    }
  )
  .delete(async (req, res) => {
    try {
      if(!req.user) res.status(401).end();
      let _id = req.query.productId;
      await deleteProduct(JSON.parse(JSON.stringify(_id)));
      return res.status(200).json({
        message: "Product is successfully deleted!",
        success: true,
      });
    } catch (err) {
      return res.status(500).json({
        message: (<Error>err).message,
        success: false,
      });
    }
  });

//config for photo functionality
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
