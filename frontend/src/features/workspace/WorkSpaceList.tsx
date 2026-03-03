import { useNavigate } from 'react-router-dom';
import { useGetWorkSpacesQuery } from './workSpaceApi';


// {
//   "status": "success",
//   "data": {
//     "_id": "69a1730a9b4791460c0e490f",
//     "name": "my-first",
//     "owner": {
//       "_id": "699ec22fe88760672f0e4118",
//       "name": "pittu1",
//       "email": "pittu1@gmail.com"
//     },
//     "members": [
//       {
//         "_id": "699ec22fe88760672f0e4118",
//         "name": "pittu1",
//         "email": "pittu1@gmail.com"
//       }
//     ],
//     "createdAt": "2026-02-27T10:33:46.326Z",
//     "updatedAt": "2026-02-27T10:33:46.326Z",
//     "__v": 0
//   }
// }


const WorkSpaceList = () => {
    const { data: response, error, isLoading } = useGetWorkSpacesQuery();
    const navigate = useNavigate();
    if (isLoading) return <div>Loading Workspaces...</div>;
    if (error) return <div>Error fetching workspaces</div>;
    const workspaces = response?.data || [];

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Workspaces</h2>
            {workspaces.length === 0 ? (
                <p>No workspaces found.</p>
            ) : (
                workspaces.map((item: any) => (
                    <div onClick={() => navigate(`/app/workspaces/${item._id}`)} key={item.id} className="border p-2 mb-2 rounded shadow-sm">
                        <p className="font-medium">{item.name}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default WorkSpaceList
