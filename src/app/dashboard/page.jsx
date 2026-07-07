// 'use client';
// import React, { useState, useEffect, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { authClient } from '@/lib/auth-client';
// import { taskApi, paymentApi } from '@/utils/api';
// import toast from 'react-hot-toast';
// import {
//   Crown, Unlock, Loader2, Sparkles, LayoutDashboard,
//   TrendingUp, Calendar, CheckCircle2, Plus
// } from 'lucide-react';
// import AddTaskModal from '@/components/tasks/AddTaskModal';
// import KanbanBoard from '@/components/tasks/kanbanBoard';

// const DashboardContent = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get('session_id');

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [tasks, setTasks] = useState([]);
//   const [isLoadingTasks, setIsLoadingTasks] = useState(false);
//   const [isUpgrading, setIsUpgrading] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   useEffect(() => {
//     if (sessionId && user && !user.isPremium) {
//       verifyPayment(sessionId);
//     }
//   }, [sessionId, user]);

//   const verifyPayment = async (sid) => {
//     if (isVerifying) return;
//     setIsVerifying(true);
//     try {
//       const data = await paymentApi.verifyPayment(sid);
//       if (data.success) {
//         localStorage.setItem('isPremiumUser', 'true');
//         setUser(prev => ({ ...prev, isPremium: true }));
//         toast.success('🎉 Premium activated successfully!');
//         router.replace('/dashboard');
//       }
//     } catch (error) {
//       console.error('Payment verify error:', error);
//       toast.error('Failed to verify payment');
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const checkAuth = async () => {
//     try {
//       setLoading(true);
//       const { data } = await authClient.getSession();

//       if (data?.user) {
//         const isPremiumFromStorage = localStorage.getItem('isPremiumUser') === 'true';
//         setUser({
//           ...data.user,
//           isPremium: data.user.isPremium || isPremiumFromStorage
//         });
//         await fetchTasks();
//       } else {
//         router.push('/login');
//       }
//     } catch (error) {
//       console.error('Auth error:', error);
//       router.push('/login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       setIsLoadingTasks(true);
//       const data = await taskApi.getAll();
//       setTasks(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Fetch tasks error:', error);
//       toast.error('Failed to load tasks');
//       setTasks([]);
//     } finally {
//       setIsLoadingTasks(false);
//     }
//   };

//   const handleAddTask = async (newTaskData) => {
//     try {
//       const created = await taskApi.create(newTaskData);
//       setTasks((prev) => [created, ...prev]);
//       toast.success('✨ Task created successfully!');
//       setIsModalOpen(false);
//     } catch (error) {
//       if (error.status === 403 || error.code === 'TASK_LIMIT_REACHED') {
//         toast.error('Free users can only have 3 tasks! Upgrade to premium.');
//       } else {
//         toast.error(error.message || 'Failed to create task');
//       }
//       throw error;
//     }
//   };

//   const handleDeleteTask = async (taskId) => {
//     try {
//       await taskApi.delete(taskId);
//       setTasks((prev) => prev.filter((task) => task._id !== taskId));
//       toast.success('Task deleted');
//     } catch (error) {
//       toast.error(error.message || 'Failed to delete task');
//     }
//   };

//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       const updated = await taskApi.update(taskId, { status: newStatus });
//       setTasks((prev) =>
//         prev.map((task) => (task._id === taskId ? updated : task))
//       );
//     } catch (error) {
//       toast.error(error.message || 'Failed to update task status');
//       throw error;
//     }
//   };

//   const handleUpgrade = async () => {
//     if (isUpgrading) return;
//     setIsUpgrading(true);
//     try {
//       const data = await paymentApi.createCheckoutSession();
//       if (data.url) {
//         window.location.href = data.url;
//       }
//     } catch (error) {
//       toast.error(error.message || 'Failed to start upgrade');
//       setIsUpgrading(false);
//     }
//   };

//   // Calculate stats
//   const totalTasks = tasks?.length || 0;
//   const doneTasks = tasks?.filter(t => t.status === 'Done').length || 0;
//   const inProgressTasks = tasks?.filter(t => t.status === 'In Progress').length || 0;
//   const todoTasks = tasks?.filter(t => t.status === 'To Do').length || 0;
//   const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

//   if (loading || isVerifying) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600" />
//             <Sparkles size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500" />
//           </div>
//           <p className="text-gray-500 text-sm mt-3 font-medium">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) return null;

//   const isPremium = user?.isPremium === true;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
//           <div>
//             <div className="flex items-center gap-3">
//               <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-200/50">
//                 <LayoutDashboard size={22} className="text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
//                   Welcome back, {user?.name?.split(' ')[0] || 'User'}!
//                 </h1>
//                 <p className="text-sm text-gray-500 flex items-center gap-2">
//                   <span>Here's your task overview</span>
//                   <span className="w-1 h-1 bg-gray-300 rounded-full" />
//                   <span>{totalTasks} task{totalTasks !== 1 ? 's' : ''} total</span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 w-full sm:w-auto">
//             {isPremium ? (
//               <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-xl border border-yellow-200/50 shadow-sm">
//                 <Crown size={18} className="text-yellow-500" />
//                 <span className="text-sm font-bold text-yellow-700">Premium</span>
//               </div>
//             ) : (
//               <button
//                 onClick={handleUpgrade}
//                 disabled={isUpgrading}
//                 className="group w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg shadow-emerald-200/50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
//               >
//                 {isUpgrading ? (
//                   <Loader2 size={16} className="animate-spin" />
//                 ) : (
//                   <Unlock size={16} className="group-hover:scale-110 transition-transform" />
//                 )}
//                 <span>Unlock Unlimited ($5)</span>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
//           {[
//             {
//               label: "Total Tasks",
//               value: totalTasks,
//               gradient: "from-blue-500 to-indigo-500",
//               icon: LayoutDashboard,
//             },
//             {
//               label: "To Do",
//               value: todoTasks,
//               gradient: "from-amber-500 to-orange-500",
//               icon: Calendar,
//             },
//             {
//               label: "In Progress",
//               value: inProgressTasks,
//               gradient: "from-blue-500 to-cyan-500",
//               icon: TrendingUp,
//             },
//             {
//               label: "Done",
//               value: doneTasks,
//               gradient: "from-emerald-500 to-green-500",
//               icon: CheckCircle2,
//             },
//           ].map((stat) => (
//             <div
//               key={stat.label}
//               className="relative bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
//             >
//               <div className="relative flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
//                   <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
//                 </div>
//                 <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md`}>
//                   <stat.icon size={18} className="text-white" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Progress Bar & Add Task Button */}
//         <div className="bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm mb-6">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//             <div className="flex-1 w-full">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-2">
//                   <Sparkles size={16} className="text-blue-500" />
//                   <span className="text-sm font-medium text-gray-700">Completion Progress</span>
//                 </div>
//                 <span className="text-sm font-bold text-blue-600">{completionRate}%</span>
//               </div>
//               <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-1000"
//                   style={{ width: `${completionRate}%` }}
//                 />
//               </div>
//             </div>

//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg shadow-blue-200/50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
//             >
//               <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
//               <span>New Task</span>
//             </button>
//           </div>
//         </div>

//         {/* Kanban Board */}
//         {isLoadingTasks ? (
//           <div className="flex justify-center py-16">
//             <div className="text-center">
//               <Loader2 size={36} className="animate-spin text-blue-500 mx-auto mb-3" />
//               <p className="text-gray-400 text-sm">Loading tasks...</p>
//             </div>
//           </div>
//         ) : (
//           <KanbanBoard
//             tasks={tasks}
//             onDeleteTask={handleDeleteTask}
//             onStatusChange={handleStatusChange}
//           />
//         )}
//       </div>

//       {/* Add Task Modal */}
//       <AddTaskModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onTaskAdded={handleAddTask}
//       />
//     </div>
//   );
// };

// const DashboardPage = () => {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600" />
//             <Sparkles size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500" />
//           </div>
//           <p className="text-gray-500 text-sm mt-3 font-medium">Loading...</p>
//         </div>
//       </div>
//     }>
//       <DashboardContent />
//     </Suspense>
//   );
// };

// export default DashboardPage;













'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { taskApi, paymentApi } from '@/utils/api';
import toast from 'react-hot-toast';
import {
  Crown, Unlock, Loader2, Sparkles, LayoutDashboard,
  TrendingUp, Calendar, CheckCircle2, Plus
} from 'lucide-react';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import KanbanBoard from '@/components/tasks/kanbanBoard';

const DashboardContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (sessionId && user && !user.isPremium) {
      verifyPayment(sessionId);
    }
  }, [sessionId, user]);

  const verifyPayment = async (sid) => {
    if (isVerifying) return;
    setIsVerifying(true);
    try {
      const data = await paymentApi.verifyPayment(sid);
      if (data.success) {
        localStorage.setItem('isPremiumUser', 'true');
        setUser(prev => ({ ...prev, isPremium: true }));
        toast.success('🎉 Premium activated successfully!');
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Payment verify error:', error);
      toast.error('Failed to verify payment');
    } finally {
      setIsVerifying(false);
    }
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      const { data } = await authClient.getSession();

      if (data?.user) {
        // ✅ DATABASE ONLY - ignore localStorage completely
        const isPremium = data.user.isPremium === true;

        // ✅ Clean up localStorage if database says false
        if (!isPremium) {
          localStorage.removeItem('isPremiumUser');
        }

        console.log('User from DB:', data.user);
        console.log('Is Premium from DB:', isPremium);

        setUser({
          ...data.user,
          isPremium: isPremium
        });

        await fetchTasks();
      } else {
        console.log('No session found, redirecting to login');
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setIsLoadingTasks(true);
      const data = await taskApi.getAll();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Fetch tasks error:', error);
      toast.error('Failed to load tasks');
      setTasks([]);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const handleAddTask = async (newTaskData) => {
    try {
      const created = await taskApi.create(newTaskData);
      setTasks((prev) => [created, ...prev]);
      toast.success('✨ Task created successfully!');
      setIsModalOpen(false);
    } catch (error) {
      if (error.status === 403 || error.code === 'TASK_LIMIT_REACHED') {
        toast.error('Free users can only have 3 tasks! Upgrade to premium.');
      } else {
        toast.error(error.message || 'Failed to create task');
      }
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskApi.delete(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success('Task deleted');
    } catch (error) {
      toast.error(error.message || 'Failed to delete task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updated = await taskApi.update(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updated : task))
      );
    } catch (error) {
      toast.error(error.message || 'Failed to update task status');
      throw error;
    }
  };

  const handleUpgrade = async () => {
    if (isUpgrading) return;
    setIsUpgrading(true);
    try {
      const data = await paymentApi.createCheckoutSession();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(error.message || 'Failed to start upgrade');
      setIsUpgrading(false);
    }
  };

  // Calculate stats
  const totalTasks = tasks?.length || 0;
  const doneTasks = tasks?.filter(t => t.status === 'Done').length || 0;
  const inProgressTasks = tasks?.filter(t => t.status === 'In Progress').length || 0;
  const todoTasks = tasks?.filter(t => t.status === 'To Do').length || 0;
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  if (loading || isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600" />
            <Sparkles size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500" />
          </div>
          <p className="text-gray-500 text-sm mt-3 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isPremium = user?.isPremium === true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-200/50">
                <LayoutDashboard size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Welcome back, {user?.name?.split(' ')[0] || 'User'}!
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span>Here's your task overview</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{totalTasks} task{totalTasks !== 1 ? 's' : ''} total</span>
                  {!isPremium && (
                    <>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-amber-600 font-medium">
                        {totalTasks >= 3 ? 'Limit reached!' : `${3 - totalTasks} of 3 tasks remaining`}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Premium/Upgrade Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isPremium ? (
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-xl border border-yellow-200/50 shadow-sm">
                <Crown size={18} className="text-yellow-500" />
                <span className="text-sm font-bold text-yellow-700">Premium</span>
                <span className="text-xs text-yellow-600 bg-yellow-200/50 px-2 py-0.5 rounded-full">Unlimited</span>
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={isUpgrading}
                className="group w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg shadow-emerald-200/50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isUpgrading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Unlock size={16} className="group-hover:scale-110 transition-transform" />
                )}
                <span>Upgrade to Premium ($5)</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            {
              label: "Total Tasks",
              value: totalTasks,
              gradient: "from-blue-500 to-indigo-500",
              icon: LayoutDashboard,
            },
            {
              label: "To Do",
              value: todoTasks,
              gradient: "from-amber-500 to-orange-500",
              icon: Calendar,
            },
            {
              label: "In Progress",
              value: inProgressTasks,
              gradient: "from-blue-500 to-cyan-500",
              icon: TrendingUp,
            },
            {
              label: "Done",
              value: doneTasks,
              gradient: "from-emerald-500 to-green-500",
              icon: CheckCircle2,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="relative bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
                </div>
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                  <stat.icon size={18} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar & Add Task Button */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Completion Progress</span>
                </div>
                <span className="text-sm font-bold text-blue-600">{completionRate}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-1000"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg shadow-blue-200/50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Create New Task</span>
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        {isLoadingTasks ? (
          <div className="flex justify-center py-16">
            <div className="text-center">
              <Loader2 size={36} className="animate-spin text-blue-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Loading tasks...</p>
            </div>
          </div>
        ) : (
          <KanbanBoard
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={handleAddTask}
      />
    </div>
  );
};

const DashboardPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600" />
            <Sparkles size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500" />
          </div>
          <p className="text-gray-500 text-sm mt-3 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
};

export default DashboardPage;