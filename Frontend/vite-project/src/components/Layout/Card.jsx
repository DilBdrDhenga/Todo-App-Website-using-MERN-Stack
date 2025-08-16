import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DateFormat from "../../utils/DateFormat";
import { useDeleteTodoMutation } from "../../services/Todo/TodoServices";
import { toast } from "react-toastify";
import UpdatePopUpModal from "./UpdatePopUpModal";

const Card = ({ readAllTask }) => {
  const [isOpenEditModal, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteId, setDeleteId] = useState("");

  const [
    deleteTodo,
    {
      isError: isErrorDeleteData,
      isSuccess: isSuccessDeleteData,
      isLoading: isLoadingDeleteData,
      error: errorDeleteData,
      data: dataDeleteData,
    },
  ] = useDeleteTodoMutation();

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    if (isErrorDeleteData) {
      console.log("Error Deleting Data: ", errorDeleteData);
    }
  }, [isErrorDeleteData, errorDeleteData]);

  useEffect(() => {
    if (isSuccessDeleteData) {
      console.log(dataDeleteData.message);
      toast.success(dataDeleteData.message);
    }
  }, [isSuccessDeleteData, dataDeleteData]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
        {readAllTask?.map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl"
          >
            {/* Card Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {item.title}
              </h2>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                  item.isCompleted
                    ? "bg-green-300 text-green-800 border-green-200 dark:bg-green-800 dark:text-green-100"
                    : "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-700 dark:text-yellow-100"
                }`}
              >
                {item.isCompleted ? "Completed" : "Incomplete"}
              </span>
            </div>

            {/* Card Body */}
            <div className="space-y-3 mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-700 dark:text-gray-100">
                  Description:
                </span>{" "}
                {item?.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Created At: {DateFormat(item.createdAt)}
              </p>
            </div>

            {/* Card Footer */}
            <div className="flex justify-end gap-10">
              <button
                className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-700 transition cursor-pointer"
                title="Edit Task"
                onClick={() => handleEditClick(item)}
              >
                <FaEdit className="text-lg" />
                Edit
              </button>
              <button
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 dark:text-red-500 dark:hover:text-red-700 transition cursor-pointer"
                title="Delete Task"
                onClick={() => {
                  setDeleteId(item.id);
                  deleteTodo(item.id);
                }}
              >
                <MdDeleteForever className="text-xl " />
                {isLoadingDeleteData && deleteId === item.id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <UpdatePopUpModal
          setIsEditModalOpen={setIsEditModalOpen}
          isOpenEdit={isOpenEditModal}
          task={selectedTask}
        />
      )}
    </>
  );
};

export default Card;
