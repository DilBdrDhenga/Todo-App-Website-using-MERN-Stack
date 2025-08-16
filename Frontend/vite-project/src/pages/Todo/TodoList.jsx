import { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import { useReadTodoQuery } from "../../services/Todo/TodoServices";
import DateFormat from "../../utils/DateFormat";

const TodoList = () => {
  const [status, setStatus] = useState("");

  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userData?.userInfo?.id;
  let {
    isError: isErrorReadData,
    isSuccess: isSuccessReadData,
    isLoading: isLoadingReadData,
    error: errorReadData,
    data: dataReadData,
  } = useReadTodoQuery(userId);

  const todos = dataReadData?.data?.todo_tasks || [];
  const filteredTodos =
    status === ""
      ? todos
      : todos.filter((todo) =>
          status === "completed" ? todo.isCompleted : !todo.isCompleted
        );

  useEffect(() => {
    if (isErrorReadData) {
      console.log(errorReadData);
    }
  }, [isErrorReadData, errorReadData]);

  useEffect(() => {
    if (isSuccessReadData) {
      console.log("fetched data:", dataReadData);
    }
  }, [isSuccessReadData, dataReadData]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 ">
      <Navbar />
      <div className="w-full px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          📝 Todo Task Lists
        </h1>

        {/* Filter Section */}
        <div className=" max-w-6xl mx-auto bg-white rounded-lg shadow-2xl p-6 mb-8 ">
          <h2 className="text-xl font-semibold mb-4">Filter Todos By:</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All</option>
              <option value="in-progress">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Todo Cards */}
        {isLoadingReadData ? (
          <div className="text-center text-xl font-medium text-blue-600">
            Loading tasks...
          </div>
        ) : filteredTodos.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredTodos.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-all pb-6"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      item.isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.isCompleted ? "Completed" : "Incomplete"}
                  </span>
                </div>

                {/* Body */}
                <div className="flex-1 text-base leading-relaxed text-gray-700 ">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Description:</span>{" "}
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Created At: {DateFormat(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-16">
            🚫 No tasks available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
