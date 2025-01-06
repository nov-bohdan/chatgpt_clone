export default function ChatControlIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center justify-center rounded-lg hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer text-gray-400 w-7 h-7 p-1.5">
      {children}
    </span>
  );
}
