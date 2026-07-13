const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          Uber Clone
        </h1>
        <p className="text-slate-600 dark:text-slate-300 font-medium">
          Welcome to the Uber clone application. Tailwind CSS v4 is successfully installed!
        </p>
      </div>
    </div>
  );
};

export default App;