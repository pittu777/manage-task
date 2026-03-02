import { useGetWorkSpacesQuery } from './workSpaceApi'

const WorkSpaceList = () => {
    const { data: response, error, isLoading } = useGetWorkSpacesQuery();
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
                    <div key={item._id} className="border p-2 mb-2 rounded shadow-sm">
                        <p className="font-medium">{item.name}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default WorkSpaceList