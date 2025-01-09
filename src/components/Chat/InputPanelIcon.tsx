export default function InputPanelIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="flex h-8 min-w-8 items-center justify-center rounded-lg p-1 text-xs font-semibold hover:bg-black/10 focus-visible:outline-black dark:focus-visible:outline-white cursor-pointer">
      {children}
    </span>
  );
}
