import { useState, type FormEvent } from 'react'
import { useCreateWorkSpaceMutation } from './workSpaceApi';

const WorkSpaceForm = () => {
    const [name, setName] = useState("");
    const [createWorkSPace, { isLoading, error }] = useCreateWorkSpaceMutation();
    const handleSubmit = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const result = await createWorkSPace({ name }).unwrap();

            console.log(result);

        } catch {

        }
    }
    const errorMessage =
        (error as { data?: { message?: string } } | undefined)?.data?.message ??
        "failed to create workspace";
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>

                    <label className="text-sm">create workspace</label>
                    <input
                        type="name"
                        placeholder='workspace name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
                    >
                        {isLoading ? "creating..." : "create workspace"}
                    </button>
                </form>
            </div>
            {error && <p className="text-sm text-red-600">{errorMessage}</p>}
        </>
    )
}

export default WorkSpaceForm