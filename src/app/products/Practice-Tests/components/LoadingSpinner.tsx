export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-[#fcba28]/20"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-[#fcba28] border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
