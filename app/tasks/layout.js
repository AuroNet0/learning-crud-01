export default function TasksLayout({ children, modal }) {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {children}
      {modal}
    </div>
  );
}
