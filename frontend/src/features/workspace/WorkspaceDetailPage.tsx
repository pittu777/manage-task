import { useParams } from "react-router-dom";
import { useGetSingleWorkSPaceQuery } from "./workSpaceApi";


type SingleMemeber = {
    name: string
}

interface SingleWorkSpaceProps {
    name: string;
    ownerName: string;
    members: SingleMemeber[]
}


const SingleWorkSpace = ({ name, ownerName, members }: SingleWorkSpaceProps) => {
    return (
        <>
            <h1>name:{name}</h1>
            <h3>owner name {ownerName}</h3>
            {members.map((member: SingleMemeber) => {
                return (
                    <ul>
                        <li>members {member.name}</li>
                    </ul>
                )
            })}
        </>
    )
}


export const WorkSpaceDetailPage = () => {
    const { id } = useParams();

    if (!id) return <div>Invalid workspace ID</div>;

    const { data, isLoading, error } =
        useGetSingleWorkSPaceQuery(id);
    console.log(data);
    const workspace = data?.data;

    if (!workspace) return null;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return <SingleWorkSpace name={workspace.name} ownerName={workspace.owner.name} members={workspace.members} />;
}