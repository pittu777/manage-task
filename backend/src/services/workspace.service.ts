import WorkspaceModel from "@/models/Workspace.model";
import { AppError } from "@/utils/AppError";







export const createWorkSpace = async (name: string, userId: string) => {
    const existing = await WorkspaceModel.findOne({ name, owner: userId });

    if (existing) {
        throw new AppError("You already have a workspace with this name", 400);
    }

    const newWorkspace = await WorkspaceModel.create({
        name,
        owner: userId,
        members: [userId]
    });

    return {
        id: newWorkspace._id,
        name: newWorkspace.name,
        owner: newWorkspace.owner,
        members: newWorkspace.members,
    };


};