const AppHome = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to BharatView 🇮🇳
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-6 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AppHome;
