import React, { useEffect, useState } from "react";
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from "../../services/Todo/TodoServices";
import { toast } from "react-toastify";

const UpdatePopUpModal = ({ setIsEditModalOpen, isOpenEdit, task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const taskId = task.id;

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [
    updateTodo,
    {
      isError: isErrorUpdateData,
      isSuccess: isSuccessUpdateData,
      isLoading: isLoadingUpdateData,
      error: errorUpdateData,
      data: dataUpdateData,
    },
  ] = useUpdateTodoMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Both fields are required");
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      const createdBy = userData?.userInfo?.id;
      if (!createdBy) {
        toast.error("User ID is missing");
        return;
      }

      const data = {
        title,
        description,
        isCompleted,
      };
      //   console.log("data from user", data);
      const todo = await updateTodo({ id: taskId, body: data }).unwrap();
      // toast.success("Task created successfully");
      setTitle("");
      setDescription("");
      closeEditModal();
    } catch (error) {
      console.log("Error message from block: ", error);
    }
  };

  useEffect(() => {
    if (isErrorUpdateData) {
      console.log(errorUpdateData);
      toast.error(
        errorUpdateData?.data?.message || "Error occurred while creating task"
      );
    }
  }, [isErrorUpdateData, errorUpdateData]);

  useEffect(() => {
    if (isSuccessUpdateData) {
      console.log("Data entered into the database is: ", dataUpdateData);
      toast.success(dataUpdateData?.message || "Task updated successfully");
    }
  }, [isSuccessUpdateData, dataUpdateData]);

  return (
    <>
      {isOpenEdit && (
        <>
          <div className="fixed inset-0 bg-gray-500/50 z-40 backdrop-blur-sm"></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-96 z-50 max-w-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Update Task
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Task Title */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Task Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Task Completed or not */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Status
                  </label>
                  <select
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    value={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.value === "true")}
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    <option value="false">In Progress</option>
                    <option value="true">Completed</option>
                  </select>
                </div>

                {/* Button Section */}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="text-gray-500 font-bold hover:text-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold transition duration-200"
                    disabled={isLoadingUpdateData}
                  >
                    {isLoadingUpdateData ? "Updating..." : "Update Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePopUpModal;
