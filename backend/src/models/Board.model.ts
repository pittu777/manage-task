

import { Schema, model, Document, Types } from "mongoose";

export interface IBoard extends Document {
    name: string;
    createdBy: Types.ObjectId;
    workspace: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const boardSchema = new Schema<IBoard>({

    name: {
        type: String,
        required: true,
    },
    workspace: {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

},
    {
        timestamps: true,
    }
)

export default model<IBoard>("Board", boardSchema);