import React, { useEffect, useState } from "react";
import { useCreateTodoMutation } from "../../services/Todo/TodoServices";
import { toast } from "react-toastify";

const PopUpModal = ({
  isOpen,
  closeModal,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  const [
    createTodo,
    {
      isError: isErrorCreateData,
      isSuccess: isSuccessCreateData,
      isLoading: isLoadingCreateData,
      error: errorCreateData,
      data: dataCreateData,
    },
  ] = useCreateTodoMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Both fields are required");
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      // console.log("userData", userData);

      const createdBy = userData?.userInfo?.id;
      if (!createdBy) {
        toast.error("User ID is missing");
        return;
      }
      const data = { title, description, createdBy };
      const todo = await createTodo(data).unwrap();
      // toast.success("Task created successfully");
      setTitle("");
      setDescription("");
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isErrorCreateData) {
      console.log(errorCreateData);
      toast.error(
        errorCreateData?.data?.message || "Error occurred while creating task"
      );
    }
  }, [isErrorCreateData, errorCreateData]);

  useEffect(() => {
    if (isSuccessCreateData) {
      console.log("Data entered into the database is: ", dataCreateData);
      toast.success(dataCreateData?.message || "Task created successfully");
    }
  }, [isSuccessCreateData, dataCreateData]);

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-gray-500/50 z-40 backdrop-blur-sm"></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-96 z-50 max-w-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Create New Task
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

                {/* Button Section */}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-500 font-bold hover:text-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold transition duration-200"
                    disabled={isLoadingCreateData} // disable button while loading
                  >
                    {isLoadingCreateData ? "Saving..." : "Save Task"}
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

export default PopUpModal;
