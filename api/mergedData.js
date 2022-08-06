import { deleteComment, getVideoComments } from './commentData';
import { deleteSingleVideo } from './videoData';

const deleteVideoComments = (videoFirebaseKey) => new Promise((resolve, reject) => {
  getVideoComments(videoFirebaseKey).then((commentsArray) => {
    console.warn(commentsArray);
    const deleteCommentPromises = commentsArray.map((comment) => deleteComment(comment.commentFirebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleVideo(videoFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

// eslint-disable-next-line import/prefer-default-export
export { deleteVideoComments };
