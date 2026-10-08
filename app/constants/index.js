
const columns = [
    {
      header: "Job Title",
      accessor: "title",
      sortable: true,
    },
    {
      header: "Category",
      accessor: "category",
      sortable: true,
    },
    {
      header: "Salary",
      accessor: "salary",
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <button
          onClick={() => alert(`Editing job ID: ${row._id}`)}
          className="text-blue-600 hover:underline font-medium text-xs"
        >
          Edit
        </button>
      ),
    },
  ];