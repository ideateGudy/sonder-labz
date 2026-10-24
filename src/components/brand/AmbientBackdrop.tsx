export function AmbientBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-iris/20 blur-3xl dark:bg-iris/25" />
      <div className="absolute top-[55%] -right-40 h-[32rem] w-[32rem] rounded-full bg-lume/15 blur-3xl dark:bg-lume/10" />
    </div>
  );
}
