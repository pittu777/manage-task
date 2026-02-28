import { Schema, model, Document, Types } from "mongoose";

export interface IWorkspace extends Document {
    name: string;
    owner: Types.ObjectId;
    members: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    }

},
    { timestamps: true }
);

export default model<IWorkspace>("Workspace", workspaceSchema);

