import express from "express";
import {
  //  brainTreePaymentController,


  getPostsController,
  getSinglePostController,
  getSearchPostsController,
  postCategoryController,
  getCategoryPostsController,
  postFiltersController,
  postListController,
  postPhotoController,
  realtedPostController,
  likePostController,
  commentPostController,
  getpostCommentaryController
} from "../controllers/postController.js";
import {
  deletePostsController,
  createVideoControler,
  createPhotoControler,
  updatePhotoController,
  updateVideoController ,
  getPostsCategoryController
}  from "../controllers/adminPostsController.js"
import  uploadVideo from "../uploads/uploadVideo.js";
import uploadPhoto from "../uploads/uploadPhoto.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";



const router = express.Router();
//api/v1/post/create-post
//routes


//Admin
router.delete("/delete-posts", deletePostsController)

// createvideoPost ;
router.post(
  "/create-videopost",  uploadVideo.fields([
    {
      name: "video",
      maxCount: 5,
    },
  ]),
  createVideoControler
);

//createphotopost
router.post(
  "/create-photopost",  uploadPhoto.fields([
    {
      name: "photo",
      maxCount: 5,
    },
  ]),
  createPhotoControler
);

//updatePostController
router.put(
  "/update-photo/:pid",
  requireSignIn,
  isAdmin,
  uploadPhoto.fields([
    {
      name: "photo",
      maxCount: 5,
    },
  ]),
  updatePhotoController
);

//updatePostController
router.put(
  "/update-video/:pid",
  requireSignIn,
  isAdmin,
  uploadVideo.fields([
    {
      name: "video",
      maxCount: 5,
    },]),

    updateVideoController 
);
//deletePostController
// return this.http.delete(`${this.api}/posts/delete-posts`, {
router.delete(
  "/delete-postsg",
  //requireSignIn,
  //isAdmin,
  formidable(),
  deletePostsController
);

router.put(
  "/create-comment",
 // requireSignIn,
 // isAdmin,
 formidable(),
  commentPostController
);

//api/v1/posts/like-post/id
router.put(
  "/like-post/:postId",
  
  likePostController
);

//getPostsController
router.get("/get-posts", getPostsController);

//single product
router.get("/get-post/:pid", getSinglePostController);

router.get("/getcategory-posts", getCategoryPostsController); 

router.get("/getcategory-posts/:category", getPostsCategoryController);
//
router.get("/getsearch-posts", getSearchPostsController);


//get photo
router.get("/post-photo/:pid", postPhotoController);


//filter product
router.post("/post-filters", postFiltersController);


//product per page
router.get("/post-list/:page", postListController);


//similar product
router.get("/related-post/:pid/:cid", realtedPostController);

//category wise product
router.get("/post-category/:name", postCategoryController);

router.get("/get-comments/:postId", getpostCommentaryController);


export default router;
