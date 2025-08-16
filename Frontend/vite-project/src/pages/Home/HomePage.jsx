import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import { TiPlus } from "react-icons/ti";
import PopUpModal from "../../components/Layout/PopUpModal";
import { useReadTodoQuery } from "../../services/Todo/TodoServices";
import Card from "../../components/Layout/Card";
import TodoList from "../Todo/TodoList";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [readAllTask, setReadAllTask] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [searchTask, setSearchTask] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userInfo"));
  // console.log("userData", userData);
  const userId = userData?.userInfo?.id;

  let {
    isError: isErrorReadData,
    isSuccess: isSuccessReadData,
    isLoading: isLoadingReadData,
    error: errorReadData,
    data: dataReadData,
  } = useReadTodoQuery(userId);

  let todoData = dataReadData?.data;
  // console.log("todoData", todoData);
  let todoTasks = todoData?.todo_tasks;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    const task = e.target.value;
    const filteredTask = allTasks.filter((item) =>
      item.title.toLowerCase().includes(task.toLowerCase())
    );
    // console.log(filteredTask);
    setSearchTask(task);
    if (task && filteredTask.length > 0) {
      setReadAllTask(filteredTask);
    } else {
      setReadAllTask(allTasks);
    }
  };

  useEffect(() => {
    if (isErrorReadData) {
      console.log(errorReadData);
    }
  }, [isErrorReadData, errorReadData]);

  useEffect(() => {
    if (isSuccessReadData) {
      console.log("fetched data:", dataReadData);
      setReadAllTask(todoTasks);
      setAllTasks(todoTasks);
    }
  }, [isSuccessReadData, dataReadData]);

  return (
    <div className="min-h-screen bg-gray-100">
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Your Todo Tasks
          </h1>
          <div className=" max-w-6xl mx-auto add-task bg-white p-6 rounded-lg shadow-2xl ">
            <div className="mb-4">
              <input
                type="search"
                value={searchTask}
                onChange={handleSearch}
                placeholder="Search your task"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={openModal}
              className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-backgroundColor-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Create Task <TiPlus className="ml-2 text-lg" />
            </button>
          </div>
        </div>

        {isLoadingReadData ? (
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Loading Tasks.....
            </h1>
          </div>
        ) : (
          <Card readAllTask={readAllTask} />
        )}

        <PopUpModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
      </>
    </div>
  );
};

export default HomePage;
