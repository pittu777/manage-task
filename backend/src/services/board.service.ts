import BoardModel from "@/models/Board.model"
import WorkspaceModel from "@/models/Workspace.model";
import { AppError } from "@/utils/AppError";
import { Types } from "mongoose";


export type CreateBoardParams = {
    workSpaceId: string, name: string, userId: string
}


export const createBoard = async (workSpaceId: string, name: string, userId: string) => {

    const workSpace = await WorkspaceModel.findById(workSpaceId);


    if (!workSpace) {
        throw new AppError("Workspace not found", 404);
    }

    const isMember = workSpace.members.some(
        (memberId) => memberId.toString() === userId
    );
    if (!isMember) {
        throw new AppError("User is not a memeber of this workspace", 403);
    }


    const exisitingBoardName = await BoardModel.findOne({ workspace: workSpaceId, name: name.trim(), });
    if (exisitingBoardName) {

        throw new AppError("Board with this name already exists", 400);

    }
    const board = await BoardModel.create({
        workspace: new Types.ObjectId(workSpaceId),
        createdBy: new Types.ObjectId(userId),
        name: name.trim(),
    })
    return board;



}

export const getBoards = async (workSpaceId: string, userId: string) => {
    const workspace = await WorkspaceModel.findOne({
        _id: workSpaceId,
        members: userId
    });
    if (!workspace) {
        throw new AppError("Workspace not found or access denied", 404);
    }
    const boards = await BoardModel.find({ workspace: workSpaceId }).populate("createdBy", "name email");

    return boards;
}