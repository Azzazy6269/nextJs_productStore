import React, { useActionState } from "react";
import { mutate } from "swr";

interface UserFormProps {
  editingUser?: { _id: string; firstName: string } | null;
  clearEdit?: () => void;
}

const UserForm = ({ editingUser, clearEdit }: UserFormProps) => {
  async function submitAction(prevState: any, formData: FormData) {
    const firstName = formData.get("firstName") as string;
    
    if (!firstName.trim()) return { error: "name is required" };

    try {
      const isEdit = !!editingUser;
      const url = "http://localhost:3000/api/users";
      const method = isEdit ? "PATCH" : "POST";
      const body = isEdit 
        ? { firstName, id: editingUser?._id } 
        : { firstName };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("failed");
      mutate("users"); 
      
      if (clearEdit) clearEdit();

      return { success: true, message: "success process"};
    } catch (err: any) {
      return { error: err.message || "failed" };
    }
  }
  const [state, formAction, isPending] = useActionState(submitAction, null);

  return (
    <div className="card w-full bg-base-100 shadow-xl border border-base-200 mb-8 overflow-visible">
      <div className="card-body p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-title text-xl font-bold capitalize text-neutral">
            {editingUser ? "Edit User Details" : "Create New User"}
          </h3>
          <span className={`badge p-3 font-medium text-xs uppercase ${editingUser ? "badge-warning text-warning-content" : "badge-primary"}`}>
            {editingUser ? "Mode: Edit" : "Mode: Create"}
          </span>
        </div>
        
        <form action={formAction} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-base-content/80">First Name</span>
            </label>
            <input
              key={editingUser ? editingUser._id : "create"}
              type="text"
              name="firstName"
              defaultValue={editingUser ? editingUser.firstName : ""}
              placeholder="e.g. John"
              className="input input-bordered w-full focus:input-primary transition-all duration-200 text-base"
              required
            />
          </div>
          
          <div className="flex items-center justify-end gap-3 pt-2">
            {editingUser && (
              <button 
                type="button" 
                onClick={clearEdit} 
                className="btn btn-ghost btn-sm sm:btn-md capitalize text-error"
              >
                Cancel
              </button>
            )}
            
            <button 
              type="submit" 
              disabled={isPending} 
              className={`btn btn-sm sm:btn-md min-w-[100px] capitalize ${editingUser ? "btn-warning text-warning-content" : "btn-primary"}`}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Saving...
                </>
              ) : editingUser ? (
                "Update User"
              ) : (
                "Add User"
              )}
            </button>
          </div>
        </form>

        {state?.error && (
          <div className="alert alert-error mt-4 shadow-sm py-2 px-4 text-sm rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{state.error}</span>
          </div>
        )}
        
        {state?.success && (
          <div className="alert alert-success mt-4 shadow-sm py-2 px-4 text-sm rounded-lg text-success-content">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{state.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
