import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    let { page = 1, limit = 10, sortBy, sortType } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const sortField = sortBy || "createdAt";
    const sortOrder = sortType === "asc" ? 1 : -1;

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const totalComments = await Comment.countDocuments({
        video: videoId
    });
    const comments = await Comment.find({
        video: videoId
    })
        .populate("owner", "username avatar") // optional but recommended
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit);

    const totalPages = Math.ceil(totalComments / limit);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                comments,
                page,
                limit,
                totalComments,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            },
            "Comments fetched successfully"
        )
    );
});
const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { videoId } = req.params;
    const { content } = req.body;
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id
    });
    return res.status(201).json(new ApiResponse(201, comment, "Comment added successfully"));
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { commentId } = req.params;
    const { content } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    comment.content = content;
    await comment.save();
    return res.status(200).json(new ApiResponse(200, comment, "Comment updated successfully"));
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json(new ApiResponse(200, {}, "Comment deleted successfully"));
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}
