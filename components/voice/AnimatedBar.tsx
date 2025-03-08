export default function AnimatedBar({ isListening }: { isListening: boolean }) {
  return (
    <div id="bars" className="flex h-10 items-end">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={`bar transition-all ${isListening ? "animate-sound" : ""}`}
          style={{
            height: !isListening && i % 2 === 0 ? "30px" : "60px",
          }}
        />
      ))}
    </div>
  );
}
